# `/api/iw/*` — the zero-config proxy (IW-A20, Part 1)

The point of these two routes: **no IndianWhisper user ever sees an API key.**
Today the Mac app asks a paying customer for their own Groq key
(`SettingsView.swift:166`) and Settings offers seven LLM providers. The app sends
us its licence key instead; we spend our Groq credit. The key lives only in the
Vercel environment.

## Endpoints

### `POST /api/iw/transcribe`
`multipart/form-data` — `file=<wav>`, optional `language` (`hi` | `en`).
Returns `{ text, tier, license, secondsLeft? }`.

### `POST /api/iw/cleanup`
JSON — `{ text, mode?: "clean"|"summarize", formatLists?, vocabulary?: string[],
customInstructions?, language? }`.
Returns `{ text, tier, license, cleanupsLeft? }`.

## Auth

| Header | Required | Notes |
|---|---|---|
| `X-IW-License` | no | Validated against Dodo's public `/licenses/validate`, cached 10 min per instance. Valid → unlimited. |
| `X-IW-Instance` | no | The activation id the app already stores; forwarded so Dodo can enforce its own device cap. |
| `X-IW-Device` | yes* | Anonymous device id. Keys the free-tier counters. *Only optional if a **valid** licence is present. |

No key, or a key Dodo rejects, falls through to the free tier — the first run has
to work with nothing configured. `license` in the response tells the client which
happened (`pro` / `invalid` / `none`), so a mistyped key can be surfaced without
blocking the dictation.

## Free tier

3 cleanups/day and 600 audio-seconds/day per device, mirroring `FreeTierLimits`
(`AppState.swift:66`). Counters live in Supabase `public.iw_usage`, charged
through the `iw_usage_consume` function so concurrent requests can't overspend.
Usage is charged **before** the Groq call and refunded if Groq fails.

If Supabase is unreachable the free tier **fails closed** (503 `UPSTREAM`).
Failing open would hand out our Groq credit to anyone.

## Error codes

| Code | HTTP | Client should |
|---|---|---|
| `LIMIT_REACHED` | 429 | Amber capsule + one line to /pricing |
| `LICENSE_INVALID` | 401 | Only when no device id was sent — ask for the key again |
| `UPSTREAM` | 502 / 503 | Fall back to the local model if one exists |
| `BAD_REQUEST` | 400 / 413 | Bug in the client — log it |
| `RATE_LIMITED` | 429 | Back off |

## Guards

25 MB body · 60 s audio (read from the WAV header) · 8,000 chars of text ·
20 requests/min per device (best-effort, per instance).

## Env

Required: `GROQ_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
Optional: `IW_CLEANUP_MODEL`, `IW_CLEANUP_REASONING_EFFORT`.
Local dev only, never on Vercel: `IW_DEV_FAKE_LICENSE`.

## Before this can serve traffic

1. Run `supabase/migrations/20260914000000_iw_usage.sql`. It has **not** been run.
2. Set `GROQ_API_KEY` in Vercel — it is blank in `.env.local`.
3. Decide the cleanup model. The clients' model is decommissioned on Groq; see
   the comment on `CLEANUP_MODEL` in `_lib/groq.ts`.
4. Move the Groq account off the free tier — 8,000 TPM / 1,000 requests a day is
   roughly ten cleanups a minute for the entire product.
