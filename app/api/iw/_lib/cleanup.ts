// The cleanup LLM call behind `/api/iw/cleanup`, with the vendor behind a switch.
//
// Default is Groq (18 Sep 2026): one provider, one key we already hold for ASR,
// and the cheapest model measured below. Groq's free chat tier is 8,000 tokens/min
// and 1,000 requests/day — roughly ten cleanups a minute for the whole product —
// and its paid tier is closed ("Developer tier upgrades temporarily unavailable").
// The day that wall is hit, `IW_CLEANUP_PROVIDER=openrouter` + an OPENROUTER_API_KEY
// moves cleanup to per-token billing with no such cap. Until then it stays inert.
//
// Both endpoints are OpenAI-compatible chat completions, so the body is shared
// and only the key, URL, model, extra headers and reasoning-cap field differ.

import { type UpstreamResult } from "./limits";

function readEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : null;
}

export type CleanupProvider = "openrouter" | "groq";

export const CLEANUP_PROVIDER: CleanupProvider =
  process.env.IW_CLEANUP_PROVIDER?.trim().toLowerCase() === "openrouter"
    ? "openrouter"
    : "groq";

type ProviderConfig = {
  url: string;
  key: () => string | null;
  keyName: string;
  defaultModel: string;
  defaultEffort: string;
  /// The cap has a different name on each vendor and is NOT optional — see the
  /// measurement note below.
  reasoningField: (effort: string) => Record<string, unknown>;
  headers: Record<string, string>;
};

/// Model notes, measured on the real cleanup prompt with a Hinglish utterance at
/// temperature 0:
///   qwen/qwen3.8-27b    (effort none) 0.43s  correct   Groq — 37 output tokens (18 Sep)
///   openai/gpt-oss-120b (effort low)  0.95s  correct   Groq — 131 output tokens (18 Sep)
///   openai/gpt-oss-120b (effort low)  0.66s  correct   OpenRouter, $0.037/M in (14 Sep)
/// qwen/qwen3.6-27b was the Groq default from 14 Sep and was decommissioned by
/// 18 Sep — the second dead pinned id in four days. Probe `/v1/models` before
/// trusting any id here.
/// Without a reasoning cap gpt-oss returns an EMPTY content field and qwen leaks
/// a <think> block into it. Both would reach the user as a wiped or garbage
/// dictation, so any model swap has to carry the matching effort setting — and
/// `readContent` below treats either symptom as an upstream failure rather than
/// passing it on.
///
/// The clients' own model, meta-llama/llama-4-scout-17b-16e-instruct
/// (LLMCleanupService.swift:76, llm-cleanup.js), is decommissioned on Groq and
/// 404s — that is why this is not simply the client default.
const PROVIDERS: Record<CleanupProvider, ProviderConfig> = {
  openrouter: {
    url: "https://openrouter.ai/api/v1/chat/completions",
    key: () => readEnv("OPENROUTER_API_KEY"),
    keyName: "OPENROUTER_API_KEY",
    defaultModel: "openai/gpt-oss-120b",
    defaultEffort: "low",
    // OpenRouter's unified field; `reasoning_effort` is silently ignored here.
    reasoningField: (effort) => ({ reasoning: { effort } }),
    // Recommended by OpenRouter so the spend shows up attributed on their
    // dashboard. Neither header carries anything private.
    headers: {
      "HTTP-Referer": "https://indianwhisper.com",
      "X-Title": "IndianWhisper",
    },
  },
  groq: {
    url: "https://api.groq.com/openai/v1/chat/completions",
    key: () => readEnv("GROQ_API_KEY"),
    keyName: "GROQ_API_KEY",
    defaultModel: "qwen/qwen3.8-27b",
    // "none" is valid for qwen only; gpt-oss on Groq takes low|medium|high.
    defaultEffort: "none",
    reasoningField: (effort) => ({ reasoning_effort: effort }),
    headers: {},
  },
};

const CLEANUP_TIMEOUT_MS = 8_000; // client uses 5 s; +3 s for our extra hop

export const CLEANUP_MODEL =
  process.env.IW_CLEANUP_MODEL?.trim() || PROVIDERS[CLEANUP_PROVIDER].defaultModel;

/// Set to an empty string to omit the cap entirely (only safe on a model that
/// doesn't reason at all).
const CLEANUP_REASONING_EFFORT =
  process.env.IW_CLEANUP_REASONING_EFFORT?.trim() ??
  PROVIDERS[CLEANUP_PROVIDER].defaultEffort;

export type CleanupResult = {
  text: string;
  provider: CleanupProvider;
  model: string;
  /// Reported by the vendor when it sends a `usage` block, otherwise estimated at
  /// 4 chars/token. Logged as the cost guard — not returned to the client.
  tokens: number;
  tokensSource: "reported" | "estimated";
};

export async function cleanupChat(
  systemPrompt: string,
  userContent: string,
  maxTokens: number
): Promise<UpstreamResult<CleanupResult>> {
  const provider = CLEANUP_PROVIDER;
  const config = PROVIDERS[provider];
  const key = config.key();
  if (!key) return { ok: false, detail: `${config.keyName} not configured` };

  try {
    const res = await fetch(config.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...config.headers,
      },
      // Same body as `LLMCleanupService.callProviderAPI` non-Anthropic branch,
      // plus the reasoning cap the replacement models need.
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
          ? config.reasoningField(CLEANUP_REASONING_EFFORT)
          : {}),
      }),
      signal: AbortSignal.timeout(CLEANUP_TIMEOUT_MS),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return {
        ok: false,
        status: res.status,
        detail: `HTTP ${res.status} ${detail.slice(0, 200)}`,
      };
    }

    const json = (await res.json()) as ChatResponse;
    const content = readContent(json);
    if (!content.ok) return content;

    return {
      ok: true,
      value: {
        text: content.value,
        provider,
        model: CLEANUP_MODEL,
        ...countTokens(json, systemPrompt, userContent, content.value),
      },
    };
  } catch (err) {
    return { ok: false, detail: (err as Error).message };
  }
}

type ChatResponse = {
  choices?: { message?: { content?: string } }[];
  usage?: { total_tokens?: number; prompt_tokens?: number; completion_tokens?: number };
};

/// An empty content field or a leaked <think> block is a FAILURE, not an answer:
/// the route refunds the free-tier charge and the client keeps its raw text,
/// which is always better than typing nothing or typing the model's monologue.
function readContent(json: ChatResponse): UpstreamResult<string> {
  const content = json.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    return { ok: false, detail: "no content in cleanup response" };
  }
  const text = content.trim();
  if (text.length === 0) {
    return { ok: false, detail: "empty content (reasoning cap missing?)" };
  }
  if (/<\/?think>/i.test(text)) {
    return { ok: false, detail: "reasoning block leaked into content" };
  }
  return { ok: true, value: text };
}

function countTokens(
  json: ChatResponse,
  systemPrompt: string,
  userContent: string,
  output: string
): { tokens: number; tokensSource: "reported" | "estimated" } {
  const reported = json.usage?.total_tokens;
  if (typeof reported === "number" && reported > 0) {
    return { tokens: reported, tokensSource: "reported" };
  }
  // ~4 chars per token is close enough for a spend guard; we only need to notice
  // an order of magnitude, not bill on it.
  const chars = systemPrompt.length + userContent.length + output.length;
  return { tokens: Math.ceil(chars / 4), tokensSource: "estimated" };
}
