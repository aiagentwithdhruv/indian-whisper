// Shared constants + error shape for the IW proxy routes (`/api/iw/*`).
//
// These routes exist so no IndianWhisper user ever needs a Groq API key: the
// app sends us its licence key, we spend OUR Groq credit. The key lives only in
// the Vercel environment and must never appear in a response body or a log line.

/// Mirrors `FreeTierLimits` in the Mac app (Sources/Models/AppState.swift:66).
/// If you change one, change the other — a client that thinks it has 5 cleanups
/// left while the server says 3 produces a confusing mid-dictation failure.
export const FREE_CLEANUPS_PER_DAY = 3;
export const FREE_SECONDS_PER_DAY = 10 * 60; // 10 minutes/day

/// Abuse guards. 25 MB is ~13 min of 16 kHz mono 16-bit WAV, so the duration cap
/// below is the one that actually bites; the byte cap just stops us buffering
/// something absurd into a lambda.
export const MAX_BODY_BYTES = 25 * 1024 * 1024;
export const MAX_AUDIO_SECONDS = 60;
export const MAX_CLEANUP_CHARS = 8000;

/// Best-effort per-device burst limit. Serverless instances don't share memory,
/// so this only throttles a device that keeps hitting the same warm instance.
/// The durable per-day limit is the Supabase counter — this is just a cheap
/// first line against a hot loop.
export const RATE_LIMIT_REQUESTS = 20;
export const RATE_LIMIT_WINDOW_MS = 60_000;

/// The only codes the client is expected to branch on. Everything else that can
/// go wrong upstream collapses into UPSTREAM so the app has one fallback path.
export type ErrorCode =
  | "LIMIT_REACHED"
  | "LICENSE_INVALID"
  | "UPSTREAM"
  | "BAD_REQUEST"
  | "RATE_LIMITED";

export type LicenseStatus = "pro" | "invalid" | "none";

export function errorResponse(
  code: ErrorCode,
  message: string,
  status: number,
  extra: Record<string, unknown> = {}
): Response {
  return Response.json({ error: code, code, message, ...extra }, { status });
}

/// Device identity for free-tier accounting. Anything longer than 128 chars or
/// non-printable is rejected rather than truncated — a truncated id would silently
/// merge two devices into one counter.
export function readDeviceId(req: Request): string | null {
  const raw = req.headers.get("x-iw-device")?.trim();
  if (!raw || raw.length > 128 || !/^[\w.:@-]+$/.test(raw)) return null;
  return raw;
}

const rateBuckets = new Map<string, number[]>();

export function rateLimited(deviceId: string): boolean {
  const now = Date.now();
  const hits = (rateBuckets.get(deviceId) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  hits.push(now);
  rateBuckets.set(deviceId, hits);

  // Keep the map from growing without bound on a long-lived instance.
  if (rateBuckets.size > 5000) {
    for (const [key, times] of rateBuckets) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) rateBuckets.delete(key);
    }
  }
  return hits.length > RATE_LIMIT_REQUESTS;
}
