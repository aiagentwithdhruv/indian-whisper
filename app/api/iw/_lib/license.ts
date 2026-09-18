// Licence validation against Dodo Payments' public License API.
//
// Mirrors `LicenseService.validateOnline` in the Mac app
// (Sources/Services/LicenseService.swift:133) — same endpoint, same body shape,
// same `valid` boolean. The app already activates the instance and stores the
// instance id; it forwards that to us as `X-IW-Instance` so Dodo can enforce the
// per-licence device cap on its side.

import type { LicenseStatus } from "./limits";

const DODO_VALIDATE_URL = "https://live.dodopayments.com/licenses/validate";
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes, per the brief
const VALIDATE_TIMEOUT_MS = 10_000;

type CacheEntry = { valid: boolean; at: number };

// Module-level cache. Per-instance, not global — a cold lambda revalidates. That
// is fine: worst case is one extra Dodo call, and it means a revoked licence dies
// within 10 minutes on every warm instance instead of living until redeploy.
const cache = new Map<string, CacheEntry>();

export function readLicenseKey(req: Request): string | null {
  const raw = req.headers.get("x-iw-license")?.trim();
  return raw && raw.length > 0 && raw.length <= 256 ? raw : null;
}

/// `"pro"` only when Dodo says the key is valid. A key we can't verify is NOT
/// pro — we never fail open on a paid entitlement.
export async function resolveLicense(req: Request): Promise<LicenseStatus> {
  const key = readLicenseKey(req);
  if (!key) return "none";

  // Dev-only escape hatch. Angelina holds the live Dodo key; an agent testing
  // locally does not, so IW_DEV_FAKE_LICENSE lets the pro path be exercised
  // without one.
  //
  // Gated on VERCEL_ENV rather than NODE_ENV on purpose: `next start` forces
  // NODE_ENV=production, so a NODE_ENV guard would be untestable locally AND
  // would still be live on a Vercel preview. VERCEL_ENV === "production" is set
  // by Vercel itself and cannot be spoofed by an env var we forget to unset, so
  // this can never open on the real domain. Do not set this in Vercel at all.
  const fake = process.env.IW_DEV_FAKE_LICENSE;
  if (fake && process.env.VERCEL_ENV !== "production" && key === fake) return "pro";

  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.valid ? "pro" : "invalid";
  }

  const valid = await validateWithDodo(key, req.headers.get("x-iw-instance"));
  if (valid === null) {
    // Dodo unreachable. Serve the last known answer if we have one rather than
    // downgrading a paying customer mid-sentence because of someone else's outage.
    if (cached) return cached.valid ? "pro" : "invalid";
    return "invalid";
  }

  cache.set(key, { valid, at: Date.now() });
  return valid ? "pro" : "invalid";
}

/// `null` means "we could not reach Dodo", which is different from "Dodo said no".
async function validateWithDodo(
  key: string,
  instanceId: string | null
): Promise<boolean | null> {
  const body: Record<string, string> = { license_key: key };
  if (instanceId && instanceId.trim().length > 0) {
    body.license_key_instance_id = instanceId.trim();
  }

  try {
    const res = await fetch(DODO_VALIDATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(VALIDATE_TIMEOUT_MS),
    });

    // Dodo answers 4xx for an unknown/expired key — that is a definitive "no",
    // not an outage.
    if (res.status >= 400 && res.status < 500) return false;
    if (!res.ok) return null;

    const json = (await res.json()) as { valid?: boolean };
    return json.valid === true;
  } catch {
    return null;
  }
}
