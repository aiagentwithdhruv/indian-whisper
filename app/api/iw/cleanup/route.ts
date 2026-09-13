// POST /api/iw/cleanup — licence-gated Groq text cleanup.
//
// Same deal as /transcribe: the seven-provider menu in Settings
// (LLMCleanupService.swift) becomes one call to us. Prompts are the clients'
// prompts verbatim (see _lib/prompts.ts) so output doesn't change when a user
// stops using their own key.
//
// Request:  { text, mode?: "clean"|"summarize", formatLists?: bool,
//             vocabulary?: string[], customInstructions?: string, language?: string }
// Headers:  X-IW-License (optional), X-IW-Instance (optional), X-IW-Device (required)
// Response: 200 { text, tier, license, cleanupsLeft? }
//           400 BAD_REQUEST · 401 LICENSE_INVALID · 429 LIMIT_REACHED/RATE_LIMITED
//           502 UPSTREAM

import {
  MAX_CLEANUP_CHARS,
  errorResponse,
  rateLimited,
  readDeviceId,
} from "../_lib/limits";
import { readLicenseKey, resolveLicense } from "../_lib/license";
import { consumeFreeTier, refundFreeTier } from "../_lib/usage";
import { chatWithGroq } from "../_lib/groq";
import { cleanupSystemPrompt, summarizeSystemPrompt } from "../_lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 30;

type Body = {
  text?: unknown;
  mode?: unknown;
  formatLists?: unknown;
  vocabulary?: unknown;
  customInstructions?: unknown;
  language?: unknown;
};

export async function POST(req: Request) {
  const deviceId = readDeviceId(req);
  const hasLicenseHeader = readLicenseKey(req) !== null;

  if (!deviceId && !hasLicenseHeader) {
    return errorResponse("BAD_REQUEST", "Missing X-IW-Device header.", 400);
  }
  if (deviceId && rateLimited(deviceId)) {
    return errorResponse("RATE_LIMITED", "Too many requests. Slow down.", 429);
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return errorResponse("BAD_REQUEST", "Expected a JSON body.", 400);
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (text.length === 0) {
    return errorResponse("BAD_REQUEST", "Missing text.", 400);
  }
  if (text.length > MAX_CLEANUP_CHARS) {
    return errorResponse(
      "BAD_REQUEST",
      `Text is ${text.length} characters — ${MAX_CLEANUP_CHARS} is the maximum.`,
      413
    );
  }

  const mode = body.mode === "summarize" ? "summarize" : "clean";
  const formatLists = body.formatLists === true;
  const language = typeof body.language === "string" ? body.language : null;
  const customInstructions =
    typeof body.customInstructions === "string" ? body.customInstructions : "";

  // Cap the vocabulary: it is concatenated into the system prompt, and Whisper-
  // adjacent bias lists stop helping long before 100 terms anyway.
  const vocabulary = Array.isArray(body.vocabulary)
    ? body.vocabulary
        .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
        .map((v) => v.trim())
        .slice(0, 100)
    : [];

  const license = await resolveLicense(req);
  let cleanupsLeft: number | undefined;

  if (license !== "pro") {
    if (!deviceId) {
      return errorResponse("LICENSE_INVALID", "Licence key could not be verified.", 401);
    }
    const usage = await consumeFreeTier(deviceId, "cleanup", 1);
    if (!usage.ok) {
      return errorResponse("UPSTREAM", "Usage service unavailable. Try again.", 503, {
        license,
      });
    }
    if (!usage.allowed) {
      return errorResponse(
        "LIMIT_REACHED",
        "Daily free AI cleanups used up. Resets at midnight UTC.",
        429,
        { license, cleanupsLeft: usage.cleanupsLeft }
      );
    }
    cleanupsLeft = usage.cleanupsLeft;
  }

  const systemPrompt =
    mode === "summarize"
      ? summarizeSystemPrompt(language, customInstructions)
      : cleanupSystemPrompt(customInstructions, formatLists, vocabulary);

  const result = await chatWithGroq(
    systemPrompt,
    `<text>${text}</text>`,
    mode === "summarize" ? 512 : 256
  );

  if (!result.ok) {
    console.error("[iw/cleanup] upstream failed:", result.detail);
    if (license !== "pro" && deviceId) {
      await refundFreeTier(deviceId, "cleanup", 1);
    }
    return errorResponse("UPSTREAM", "Cleanup service failed.", 502, { license });
  }

  return Response.json({
    text: postProcess(result.value, text, mode),
    tier: license === "pro" ? "pro" : "free",
    license,
    ...(cleanupsLeft !== undefined ? { cleanupsLeft } : {}),
  });
}

/// Ports the tail of `callProvider` in the Windows client (llm-cleanup.js:274),
/// which is the mode-aware version: `[SKIP]` becomes an empty string, a model
/// that starts chatting is thrown away in favour of the raw text, and summarize
/// mode skips the chatbot markers (compression legitimately rephrases) in favour
/// of a "didn't actually compress" check.
///
/// The heavier `validate()` chain stays on the client — it is the last check
/// before text lands in the user's document and should keep running there even
/// if this proxy is ever bypassed.
function postProcess(output: string, input: string, mode: "clean" | "summarize"): string {
  if (output === "[SKIP]" || output.length === 0) return "";
  if (mode === "summarize") {
    return output.length > input.length ? input : output;
  }
  return isChatbotResponse(output, input) ? input : output;
}

const CHATBOT_MARKERS = [
  "i'd be happy to", "i can help", "here's the", "here is the",
  "sure,", "certainly", "of course", "let me", "i'll ",
  "please provide", "you'd like", "you want me to",
  "as an ai", "i'm an ai", "i cannot", "i don't have",
  "to confirm", "to clarify", "based on", "in summary",
  "feel free", "don't hesitate", "hope this helps",
  "1.", "2.", "3.",
];

function isChatbotResponse(output: string, input: string): boolean {
  const lower = output.toLowerCase();
  const lowerInput = input.toLowerCase();
  if (output.length > input.length * 3 && output.length > 100) return true;
  return CHATBOT_MARKERS.some(
    (marker) => lower.includes(marker) && !lowerInput.includes(marker)
  );
}
