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

Required: `GROQ_API_KEY` (ASR, primary), `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
Required for the default configuration: `OPENROUTER_API_KEY` (cleanup, default provider —
Groq's paid tier is closed, see below).
Recommended: `OPENAI_API_KEY` (ASR fallback when Groq 429s/5xxs — free tier is 2,000 req/day).
Optional: `IW_CLEANUP_PROVIDER` (`openrouter` default | `groq`), `IW_CLEANUP_MODEL`,
`IW_CLEANUP_REASONING_EFFORT`.
Local dev only, never on Vercel: `IW_DEV_FAKE_LICENSE`.

## Before this can serve traffic

1. Run `supabase/migrations/20260914000000_iw_usage.sql`. It has **not** been run.
2. Set `GROQ_API_KEY`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY` in Vercel production —
   as of 14 Sep 2026, `GROQ_API_KEY` is set; `OPENROUTER_API_KEY` and `OPENAI_API_KEY`
   still need to be set (values ready in `~/.aiwithdhruv-secrets` on Dhruv's machine).
3. ~~Decide the cleanup model~~ — done 14 Sep 2026. Default is now OpenRouter
   `openai/gpt-oss-120b` (reasoning effort low), because the clients' own model
   (`meta-llama/llama-4-scout-17b-16e-instruct`) is decommissioned on Groq and
   Groq's paid tier is closed. See `_lib/cleanup.ts` for the measured alternatives
   and why each needs its matching reasoning-effort cap. `IW_CLEANUP_PROVIDER=groq`
   switches back the moment Groq sells capacity.
4. Groq ASR stays default (free tier 2,000 req/day is enough today); `_lib/asr.ts`
   retries once on OpenAI `gpt-4o-mini-transcribe` for 429/5xx only. Verified for
   real 14 Sep 2026: without the bias prompt OpenAI guesses Urdu/Devanagari script
   for Hinglish audio; **with** the same prompt the clients already send, it
   returns correct Roman-script output — the code always sends the prompt, so
   this is safe, but don't drop the prompt from a future refactor.
