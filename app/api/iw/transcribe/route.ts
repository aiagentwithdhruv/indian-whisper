// POST /api/iw/transcribe — licence-gated Groq transcription.
//
// Why this exists: today a ₹499/mo customer is asked for their own Groq API key
// (SettingsView.swift:166). This route takes that job off the user entirely —
// the app sends audio + its licence key, we spend our Groq credit. Nobody ever
// sees an API key.
//
// Request:  multipart/form-data — file=<wav>, language=<"hi"|"en"|omitted>
// Headers:  X-IW-License (optional), X-IW-Instance (optional), X-IW-Device (required)
// Response: 200 { text, tier, license, secondsLeft? }
//           400 BAD_REQUEST · 401 LICENSE_INVALID · 429 LIMIT_REACHED/RATE_LIMITED
//           502 UPSTREAM

import {
  MAX_AUDIO_SECONDS,
  MAX_BODY_BYTES,
  errorResponse,
  rateLimited,
  readDeviceId,
} from "../_lib/limits";
import { readLicenseKey, resolveLicense } from "../_lib/license";
import { consumeFreeTier, refundFreeTier } from "../_lib/usage";
import { transcribeWithGroq } from "../_lib/groq";
import { biasPrompt } from "../_lib/prompts";
import { estimateSeconds } from "../_lib/audio";

export const runtime = "nodejs";
export const maxDuration = 30;

// Whisper's own set; anything else is a typo that would make Groq 400 on us.
const ALLOWED_LANGUAGES = new Set(["hi", "en"]);

export async function POST(req: Request) {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return errorResponse("BAD_REQUEST", "Audio payload too large (25 MB max).", 413);
  }

  const deviceId = readDeviceId(req);
  const hasLicenseHeader = readLicenseKey(req) !== null;

  // A licence we can't fall back from: no device id means no free-tier counter,
  // so an unverifiable key has nowhere to land.
  if (!deviceId && !hasLicenseHeader) {
    return errorResponse("BAD_REQUEST", "Missing X-IW-Device header.", 400);
  }
  if (deviceId && rateLimited(deviceId)) {
    return errorResponse("RATE_LIMITED", "Too many requests. Slow down.", 429);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return errorResponse("BAD_REQUEST", "Expected multipart/form-data.", 400);
  }

  const file = form.get("file");
  if (!(file instanceof Blob) || file.size === 0) {
    return errorResponse("BAD_REQUEST", "Missing audio file.", 400);
  }
  if (file.size > MAX_BODY_BYTES) {
    return errorResponse("BAD_REQUEST", "Audio payload too large (25 MB max).", 413);
  }

  const rawLanguage = form.get("language");
  const language =
    typeof rawLanguage === "string" && ALLOWED_LANGUAGES.has(rawLanguage)
      ? rawLanguage
      : null;

  const bytes = new Uint8Array(await file.arrayBuffer());
  const seconds = estimateSeconds(bytes);
  if (seconds > MAX_AUDIO_SECONDS) {
    return errorResponse(
      "BAD_REQUEST",
      `Clip is ${Math.round(seconds)}s — ${MAX_AUDIO_SECONDS}s is the maximum per request.`,
      400
    );
  }

  const license = await resolveLicense(req);
  let secondsLeft: number | undefined;

  if (license !== "pro") {
    if (!deviceId) {
      return errorResponse("LICENSE_INVALID", "Licence key could not be verified.", 401);
    }
    // Charge before calling Groq: a request we can't meter is a request we don't make.
    const usage = await consumeFreeTier(deviceId, "seconds", Math.ceil(seconds));
    if (!usage.ok) {
      return errorResponse("UPSTREAM", "Usage service unavailable. Try again.", 503, {
        license,
      });
    }
    if (!usage.allowed) {
      return errorResponse(
        "LIMIT_REACHED",
        "Daily free minutes used up. Resets at midnight UTC.",
        429,
        { license, secondsLeft: usage.secondsLeft }
      );
    }
    secondsLeft = usage.secondsLeft;
  }

  const result = await transcribeWithGroq(
    new Blob([bytes as BlobPart], { type: file.type || "audio/wav" }),
    "dictation.wav",
    language,
    biasPrompt(language)
  );

  if (!result.ok) {
    // Never surface `detail` to the client — a Groq 401 body can echo key context.
    console.error("[iw/transcribe] upstream failed:", result.detail);
    if (license !== "pro" && deviceId) {
      await refundFreeTier(deviceId, "seconds", Math.ceil(seconds));
    }
    return errorResponse("UPSTREAM", "Transcription service failed.", 502, { license });
  }

  return Response.json({
    text: result.value,
    tier: license === "pro" ? "pro" : "free",
    license,
    ...(secondsLeft !== undefined ? { secondsLeft } : {}),
  });
}
