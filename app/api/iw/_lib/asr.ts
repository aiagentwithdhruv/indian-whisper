// Speech → text for `/api/iw/transcribe`: Groq first, OpenAI once if Groq is out.
//
// Why the fallback exists: Groq's ASR free tier is 2,000 requests/day (read off
// the x-ratelimit headers, 14 Sep 2026) and the paid tier is CLOSED — the console
// answers "Developer tier upgrades temporarily unavailable". So a busy day ends
// in 429s that we cannot buy our way out of, and dictation is the product. One
// retry on OpenAI costs a fraction of a cent and keeps the app usable.
//
// Only 429/5xx retries. A 400/401/404 is our bug or our config; a second vendor
// would fail the same way and we would have paid twice to learn it.

import { isRetriableStatus, type UpstreamResult } from "./limits";
import { transcribeWithGroq } from "./groq";

const OPENAI_TRANSCRIBE_URL = "https://api.openai.com/v1/audio/transcriptions";

/// Same multipart contract as Whisper on Groq (file / model / language / prompt),
/// with one difference that will 400 if ignored: the gpt-4o-*-transcribe models
/// accept `response_format` of json or text ONLY — no verbose_json, and no
/// `temperature` guarantee. We ask for json, which is what we already parse.
export const OPENAI_TRANSCRIBE_MODEL = "gpt-4o-mini-transcribe";

const TRANSCRIBE_TIMEOUT_MS = 15_000;

export type AsrProvider = "groq" | "openai";

export type Transcription = { text: string; provider: AsrProvider };

export function openaiKey(): string | null {
  const key = process.env.OPENAI_API_KEY?.trim();
  return key && key.length > 0 ? key : null;
}

export async function transcribeAudio(
  audio: Blob,
  filename: string,
  language: string | null,
  prompt: string
): Promise<UpstreamResult<Transcription>> {
  const primary = await transcribeWithGroq(audio, filename, language, prompt);
  if (primary.ok) return { ok: true, value: { text: primary.value, provider: "groq" } };

  if (!isRetriableStatus(primary.status) || !openaiKey()) return primary;

  const fallback = await transcribeWithOpenAI(audio, filename, language, prompt);
  if (fallback.ok) {
    return { ok: true, value: { text: fallback.value, provider: "openai" } };
  }
  // Carry both details so the log says which leg died and how, without either
  // response body reaching the client.
  return {
    ok: false,
    status: fallback.status,
    detail: `groq: ${primary.detail} | openai: ${fallback.detail}`,
  };
}

export async function transcribeWithOpenAI(
  audio: Blob,
  filename: string,
  language: string | null,
  prompt: string
): Promise<UpstreamResult<string>> {
  const key = openaiKey();
  if (!key) return { ok: false, detail: "OPENAI_API_KEY not configured" };

  const form = new FormData();
  form.append("file", audio, filename);
  form.append("model", OPENAI_TRANSCRIBE_MODEL);
  if (language) form.append("language", language);
  form.append("prompt", prompt);
  form.append("response_format", "json");

  try {
    const res = await fetch(OPENAI_TRANSCRIBE_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form,
      signal: AbortSignal.timeout(TRANSCRIBE_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        status: res.status,
        detail: `HTTP ${res.status} ${detail.slice(0, 200)}`,
      };
    }

    const json = (await res.json()) as { text?: string };
    return { ok: true, value: (json.text ?? "").trim() };
  } catch (err) {
    return { ok: false, detail: (err as Error).message };
  }
}
