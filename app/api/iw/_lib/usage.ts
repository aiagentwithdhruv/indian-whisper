// Free-tier metering, stored in Supabase (`public.iw_usage`, one row per device
// per UTC day). Pro licences never touch this file.
//
// Counting happens in a single Postgres function (`iw_usage_consume`) rather than
// read-then-write here, so two concurrent dictations from the same device can't
// both see "2 cleanups used" and both be allowed. Migration lives in
// supabase/migrations/ — it is NOT applied by this code.

import { FREE_CLEANUPS_PER_DAY, FREE_SECONDS_PER_DAY } from "./limits";

export type UsageKind = "cleanup" | "seconds";

export type ConsumeResult =
  | { ok: true; allowed: boolean; cleanupsLeft: number; secondsLeft: number }
  | { ok: false };

/// Charge `amount` of `kind` against today's free allowance.
/// `allowed: false` means the caller must return LIMIT_REACHED and NOT call Groq.
/// `ok: false` means Supabase is unreachable or unconfigured — the caller fails
/// closed, because failing open hands out our Groq credit for free.
export async function consumeFreeTier(
  deviceId: string,
  kind: UsageKind,
  amount: number
): Promise<ConsumeResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("[iw] free tier unavailable: Supabase env not configured");
    return { ok: false };
  }

  try {
    const res = await fetch(`${url}/rest/v1/rpc/iw_usage_consume`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        p_device: deviceId,
        p_kind: kind,
        p_amount: Math.ceil(amount), // negative = refund (see migration)
        p_max_cleanups: FREE_CLEANUPS_PER_DAY,
        p_max_seconds: FREE_SECONDS_PER_DAY,
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.error(`[iw] iw_usage_consume HTTP ${res.status}`);
      return { ok: false };
    }

    // PostgREST returns the composite row directly, or wrapped in an array
    // depending on the function's RETURNS clause — accept both.
    const raw = await res.json();
    const row = Array.isArray(raw) ? raw[0] : raw;
    if (!row || typeof row.allowed !== "boolean") {
      console.error("[iw] iw_usage_consume: unexpected payload shape");
      return { ok: false };
    }

    return {
      ok: true,
      allowed: row.allowed,
      cleanupsLeft: Math.max(0, Number(row.cleanups_left ?? 0)),
      secondsLeft: Math.max(0, Number(row.seconds_left ?? 0)),
    };
  } catch (err) {
    console.error("[iw] iw_usage_consume failed:", (err as Error).message);
    return { ok: false };
  }
}

/// Give the allowance back when the Groq call we charged for failed. A free user
/// gets three cleanups a day — burning one on our 502 is the kind of thing that
/// makes someone uninstall. Fire-and-forget: if the refund itself fails we log
/// and move on rather than turning one upstream error into two.
export async function refundFreeTier(
  deviceId: string,
  kind: UsageKind,
  amount: number
): Promise<void> {
  const result = await consumeFreeTier(deviceId, kind, -Math.abs(Math.ceil(amount)));
  if (!result.ok) console.error(`[iw] refund failed for ${kind}`);
}
