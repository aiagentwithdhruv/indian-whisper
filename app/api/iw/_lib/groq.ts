// Every outbound Groq call in the proxy. The API key is read here and nowhere
// else, and is never echoed into a response or a log line.

const GROQ_TRANSCRIBE_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

/// Matches `GroqTranscriptionService.transcribe` (Mac, Sources/Services/
/// GroqTranscriptionService.swift:26) and `groq-transcribe.js` (Windows).
export const TRANSCRIBE_MODEL = "whisper-large-v3-turbo";

/// NOT the clients' model. Both clients ask Groq for
/// `meta-llama/llama-4-scout-17b-16e-instruct` (LLMCleanupService.swift:76,
/// llm-cleanup.js), and Groq has DECOMMISSIONED it — every Groq cleanup call
/// returns 404 model_not_found today, which the clients hide by silently failing
/// over to another provider or returning the raw text. Verified 14 Sep 2026
/// against GET /v1/models: the whole llama family is gone from the account.
///
/// Measured on the real cleanup prompt with a Hinglish utterance, temperature 0:
///   qwen/qwen3.6-27b   (reasoning_effort none) 0.30s  correct
///   openai/gpt-oss-120b (reasoning_effort low) 0.66s  correct
///   openai/gpt-oss-20b  (reasoning_effort low) 0.81s  correct
///   groq/compound-mini                         1.06s  correct (agentic, may tool-call)
/// Without a reasoning cap gpt-oss returns an EMPTY content field and qwen leaks
/// a <think> block into it — both would reach the user as broken output, so any
/// swap has to carry the matching effort setting below.
///
/// Overridable by env so this can be changed without a code deploy. Dhruv owns
/// the final pick; this default is the fastest option that was correct.
export const CLEANUP_MODEL =
  process.env.IW_CLEANUP_MODEL?.trim() || "qwen/qwen3.6-27b";

/// "none" is valid for qwen only; gpt-oss accepts low|medium|high and rejects
/// anything else with a 400. Set to an empty string to omit the field entirely.
const CLEANUP_REASONING_EFFORT =
  process.env.IW_CLEANUP_REASONING_EFFORT?.trim() ?? "none";

const TRANSCRIBE_TIMEOUT_MS = 15_000; // same 15 s budget as the Mac client
const CLEANUP_TIMEOUT_MS = 8_000; // client uses 5 s; +3 s for our extra hop

export function groqKey(): string | null {
  const key = process.env.GROQ_API_KEY?.trim();
  return key && key.length > 0 ? key : null;
}

export type GroqResult<T> = { ok: true; value: T } | { ok: false; detail: string };

export async function transcribeWithGroq(
  audio: Blob,
  filename: string,
  language: string | null,
  prompt: string
): Promise<GroqResult<string>> {
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
      return { ok: false, detail: `HTTP ${res.status} ${detail.slice(0, 200)}` };
    }

    const json = (await res.json()) as { text?: string };
    return { ok: true, value: (json.text ?? "").trim() };
  } catch (err) {
    return { ok: false, detail: (err as Error).message };
  }
}

export async function chatWithGroq(
  systemPrompt: string,
  userContent: string,
  maxTokens: number
): Promise<GroqResult<string>> {
  const key = groqKey();
  if (!key) return { ok: false, detail: "GROQ_API_KEY not configured" };

  try {
    const res = await fetch(GROQ_CHAT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      // Same body as `LLMCleanupService.callProviderAPI` non-Anthropic branch,
      // plus the reasoning cap the replacement model needs.
      body: JSON.stringify({
        model: CLEANUP_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.0,
        max_tokens: maxTokens,
        stream: false,
        ...(CLEANUP_REASONING_EFFORT
          ? { reasoning_effort: CLEANUP_REASONING_EFFORT }
          : {}),
      }),
      signal: AbortSignal.timeout(CLEANUP_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, detail: `HTTP ${res.status} ${detail.slice(0, 200)}` };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
      return { ok: false, detail: "no content in Groq response" };
    }
    return { ok: true, value: content.trim() };
  } catch (err) {
    return { ok: false, detail: (err as Error).message };
  }
}
