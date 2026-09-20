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
Required for the default configuration: `GROQ_API_KEY` (transcription + cleanup, default provider —
Groq's paid tier is closed, see below).
Recommended: `OPENAI_API_KEY` (ASR fallback when Groq 429s/5xxs — free tier is 2,000 req/day).
Optional: `IW_CLEANUP_PROVIDER` (`groq` default | `gemini` | `openrouter`), `IW_CLEANUP_MODEL`,
`IW_CLEANUP_REASONING_EFFORT`.
Local dev only, never on Vercel: `IW_DEV_FAKE_LICENSE`.

## Before this can serve traffic

1. Run `supabase/migrations/20260914000000_iw_usage.sql`. It has **not** been run.
2. `GROQ_API_KEY`, `OPENAI_API_KEY`, Supabase URL + service key are set in Vercel production
   (verified 18 Sep 2026). Nothing else is required. `OPENROUTER_API_KEY` is only needed if
   `IW_CLEANUP_PROVIDER=openrouter` is ever set.
3. Cleanup model — Groq `qwen/qwen3.8-27b` (reasoning effort none) since 18 Sep 2026. The
   14 Sep choice, `qwen/qwen3.6-27b`, was decommissioned within four days; so was the clients'
   original `meta-llama/llama-4-scout-17b-16e-instruct`. Groq's free chat tier is 8,000
   tokens/min and 1,000 requests/day; when that wall is hit, `IW_CLEANUP_PROVIDER=openrouter`
   moves cleanup to per-token billing. See `_lib/cleanup.ts` for the measurements and why each
   model needs its matching reasoning-effort cap.
4. Groq ASR stays default (free tier 2,000 req/day is enough today); `_lib/asr.ts`
   retries once on OpenAI `gpt-4o-mini-transcribe` for 429/5xx only. Verified for
   real 14 Sep 2026: without the bias prompt OpenAI guesses Urdu/Devanagari script
   for Hinglish audio; **with** the same prompt the clients already send, it
   returns correct Roman-script output — the code always sends the prompt, so
   this is safe, but don't drop the prompt from a future refactor.

## Cleanup provider choice (20 Sep 2026)

Measured end to end on real 11.7 s Hinglish audio: transcription (Groq `whisper-large-v3-turbo`)
**0.87 s**, cleanup (Groq `qwen3.8-27b`) **0.40 s** — 1.27 s total, before our own proxy hop.
Transcription costs Rs 0.011 per dictation and dominates; the cleanup model is nearly free at
~97 in / 50 out tokens, so pick it on quality, not price.

| cleanup model | per dictation | per user/month @30/day | % of Rs 499 |
|---|---|---|---|
| Groq `qwen3.8-27b` (current default) | Rs 0.011 | Rs 10 | 2.0% |
| Gemini `gemini-2.5-flash-lite` | Rs 0.013 | Rs 12 | 2.4% |
| ~~Gemini `gemini-3.1-flash-lite`~~ **REJECTED** | Rs 0.161 | Rs 145 | 29% |
| Claude Haiku 4.5 | Rs 0.040 | Rs 36 | 7.2% |
| Claude Sonnet 5 | Rs 0.069 | Rs 62 | 12.5% |

Set `IW_CLEANUP_PROVIDER=gemini` + `GEMINI_API_KEY` to use it. Groq stays the default until a
Gemini key is in Vercel and one real call has been made — the Gemini path is **unproven**: no
request has been sent to `gemini-3.1-flash-lite` yet, so its Hinglish output, its latency, and
whether it leaks reasoning text into `content` are all unverified. Reasoning cannot be disabled
on 3-series models (effort must be `low`, never `none`) and reasoning tokens bill as output, so
confirm `usage.completion_tokens` against the table above before trusting the margin.

### Measured head-to-head, 30 real Hinglish fixtures (20 Sep 2026)

`tools/compare-cleanup-models.py` + `tools/cleanup-fixtures.json`. Scoring is objective only —
Devanagari in the output, leaked `<think>`, a dropped must-keep term, or over-compression.

| model | avg / max latency | clean | Rs/user/month @30min/day |
|---|---|---|---|
| **Groq `qwen3.8-27b`** (kept) | **0.31 s** / 0.54 | **29/30** | Rs 0 (free tier) |
| `gemini-3.1-flash-lite` | **timed out >90 s** | — | ~Rs 145 |
| `gemini-3.5-flash-lite` | 1.43 s / 1.82 | 28/30 | Rs 34 |

Groq stays primary: 4.6x faster and marginally more accurate. The real Groq risk is not quality
but **vendor churn** — two pinned models decommissioned four days apart in Sep 2026, each
silently degrading every install. Mitigation is a fallback, not a different default: set
`IW_CLEANUP_PROVIDER=openrouter` (or `gemini`) and cleanup moves to `gemini-3.5-flash-lite`,
the measured runner-up, with no code change. Re-run the harness monthly against the incumbent.
