// Groq transcription — the primary ASR leg of `/api/iw/transcribe`. The Groq key
// is read here and in nothing else, and is never echoed into a response or a log
// line. The OpenAI fallback lives in `asr.ts`; the cleanup LLM (which no longer
// defaults to Groq) lives in `cleanup.ts`.

import type { UpstreamResult } from "./limits";

const GROQ_TRANSCRIBE_URL = "https://api.groq.com/openai/v1/audio/transcriptions";

/// Matches `GroqTranscriptionService.transcribe` (Mac, Sources/Services/
/// GroqTranscriptionService.swift:26) and `groq-transcribe.js` (Windows).
export const TRANSCRIBE_MODEL = "whisper-large-v3-turbo";

const TRANSCRIBE_TIMEOUT_MS = 15_000; // same 15 s budget as the Mac client

export function groqKey(): string | null {
  const key = process.env.GROQ_API_KEY?.trim();
  return key && key.length > 0 ? key : null;
}

export async function transcribeWithGroq(
  audio: Blob,
  filename: string,
  language: string | null,
  prompt: string
): Promise<UpstreamResult<string>> {
  const key = groqKey();
  if (!key) return { ok: false, detail: "GROQ_API_KEY not configured" };

  const form = new FormData();
  form.append("file", audio, filename);
  form.append("model", TRANSCRIBE_MODEL);
  if (language) form.append("language", language);
  form.append("prompt", prompt);
  form.append("response_format", "json");
  form.append("temperature", "0");

  try {
    const res = await fetch(GROQ_TRANSCRIBE_URL, {
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
