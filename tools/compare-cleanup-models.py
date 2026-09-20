#!/usr/bin/env python3
"""Head-to-head for the dictation cleanup model: quality, latency, and real cost.

Cleanup is ~40% of our per-dictation cost and 100% of whether the text reads like a human
wrote it, so the model is chosen on OUTPUT, not price. This runs every candidate over the
same real Hinglish dictations and prints them side by side with measured tokens and rupees.

Why this file exists: two pinned Groq models were decommissioned four days apart (Sep 2026),
each time silently degrading every install. Re-run this before any cleanup model change, and
monthly against the incumbent to prove it is still alive.

    export GROQ_API_KEY=...        # optional
    export GEMINI_API_KEY=...      # optional
    python3 tools/compare-cleanup-models.py            # all models with a key present
    python3 tools/compare-cleanup-models.py --json     # machine-readable

Each candidate carries its own reasoning cap, because the cap is per-model and getting it
wrong is silent: gpt-oss returns EMPTY content without one, qwen leaks a <think> block into
the text, and Gemini 3-series REJECTS "none" outright (Google: reasoning cannot be disabled
on 3 models). Never copy a cap from one model to another.
"""
import json, os, re, sys, time, urllib.request

INR = 84.0
UA = {"User-Agent": "IndianWhisper-modelcheck/1.0", "Content-Type": "application/json"}

SYSTEM = ("Clean up this dictation. Remove fillers. Keep Hinglish in Roman script. "
          "Never translate. Fix punctuation and capitalisation. Output only the cleaned text.")

# Fixtures live in cleanup-fixtures.json so real dictations can be added without touching code.
FIX = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                  "cleanup-fixtures.json")))["cases"]
CASES = [c["raw"] for c in FIX]

# Devanagari — the product promise is Roman-script Hinglish; any Devanagari is a hard failure.
DEVANAGARI = re.compile(r"[\u0900-\u097F]")


def score(case, out):
    """Objective failures only. Style is not judged here; broken promises are."""
    bad = []
    if not out:
        return ["EMPTY"]
    if "<think" in out.lower():
        bad.append("leaked-reasoning")
    if DEVANAGARI.search(out):
        bad.append("devanagari")
    for term in case.get("must_keep", []):
        if term.lower() not in out.lower():
            bad.append(f"dropped:{term}")
    # A cleanup that rewrites more than it cleans is translating, not tidying.
    if len(out) < len(case["raw"]) * 0.55:
        bad.append("over-compressed")
    return bad


MODELS = [
    # (label, env key, url, model id, reasoning field builder, extra headers)
    ("Groq qwen3.8-27b", "GROQ_API_KEY",
     "https://api.groq.com/openai/v1/chat/completions", "qwen/qwen3.8-27b",
     lambda: {"reasoning_effort": "none"}, {}, 0.0, 0.0),
    ("Gemini 3.1 Flash-Lite", "GEMINI_API_KEY",
     "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
     "gemini-3.1-flash-lite",
     # "none" is REJECTED on 3-series models — reasoning cannot be turned off.
     lambda: {"reasoning_effort": "low"}, {}, 0.25, 1.50),
    ("OR Gemini 3.1 Flash-Lite", "OPENROUTER_API_KEY",
     "https://openrouter.ai/api/v1/chat/completions", "google/gemini-3.1-flash-lite",
     lambda: {"reasoning": {"effort": "low"}},
     {"HTTP-Referer": "https://indianwhisper.com", "X-Title": "IndianWhisper"}, 0.25, 1.50),
    ("OR Gemini 3.5 Flash-Lite", "OPENROUTER_API_KEY",
     "https://openrouter.ai/api/v1/chat/completions", "google/gemini-3.5-flash-lite",
     lambda: {"reasoning": {"effort": "low"}},
     {"HTTP-Referer": "https://indianwhisper.com", "X-Title": "IndianWhisper"}, 0.30, 2.50),
    ("Gemini 2.5 Flash-Lite", "GEMINI_API_KEY",
     "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
     "gemini-2.5-flash-lite",
     lambda: {"reasoning_effort": "none"}, {}, 0.10, 0.40),
]


def call(url, key, model, reasoning, headers, text):
    body = {"model": model, "messages": [
        {"role": "system", "content": SYSTEM}, {"role": "user", "content": text}]}
    body.update(reasoning)
    req = urllib.request.Request(url, json.dumps(body).encode(),
                                 {**UA, **headers, "Authorization": f"Bearer {key}"})
    t = time.time()
    with urllib.request.urlopen(req, timeout=90) as r:
        d = json.load(r)
    dt = time.time() - t
    if "error" in d:
        raise RuntimeError(d["error"].get("message", "unknown"))
    out = d["choices"][0]["message"]["content"].strip()
    u = d.get("usage", {}) or {}
    return out, dt, u.get("prompt_tokens", 0), u.get("completion_tokens", 0)


def main():
    as_json = "--json" in sys.argv
    results = {}
    for label, envk, url, model, reason, hdrs, pin, pout in MODELS:
        key = os.environ.get(envk, "").strip()
        if not key:
            print(f"SKIP {label} — {envk} not set", file=sys.stderr)
            continue
        rows, lat, tin, tout, failed = [], [], 0, 0, None
        for c in CASES:
            try:
                o, dt, i, out_t = call(url, key, model, reason(), hdrs, c)
            except Exception as e:
                failed = str(e)[:160]
                break
            rows.append(o); lat.append(dt); tin += i; tout += out_t
        if failed:
            print(f"FAIL {label}: {failed}", file=sys.stderr)
            results[label] = {"error": failed}
            continue
        n = len(rows)
        # Cost per MINUTE of dictation: these clips average ~12 s of speech each.
        per_min = 60 / 12.0
        cost_min = ((tin / n) * per_min * pin + (tout / n) * per_min * pout) / 1e6 * INR
        results[label] = {
            "outputs": rows,
            "latency_avg_s": round(sum(lat) / n, 2),
            "latency_max_s": round(max(lat), 2),
            "tokens_in_avg": round(tin / n), "tokens_out_avg": round(tout / n),
            "rs_per_minute_of_dictation": round(cost_min, 4),
            "rs_per_user_month_30min_day": round(cost_min * 30 * 30, 1),
        }
        fails = {}
        for c, o in zip(FIX, rows):
            for f in score(c, o):
                fails[f.split(":")[0]] = fails.get(f.split(":")[0], 0) + 1
        results[label]["failures"] = fails
        results[label]["clean_cases"] = sum(1 for c, o in zip(FIX, rows) if not score(c, o))

    if as_json:
        print(json.dumps(results, indent=2, ensure_ascii=False)); return

    for i, c in enumerate(CASES):
        print(f"\n{'='*78}\nRAW  {c[:120]}{'...' if len(c) > 120 else ''}")
        for label, r in results.items():
            if "outputs" in r:
                print(f"  {label:<24} {r['outputs'][i]}")
    print(f"\n{'='*78}\n{'model':<24}{'avg s':>7}{'max s':>7}{'in':>6}{'out':>6}"
          f"{'Rs/min':>9}{'Rs/user/mo':>12}   (30 min/day)")
    for label, r in results.items():
        if "error" in r:
            print(f"{label:<24}  ERROR: {r['error'][:44]}"); continue
        print(f"{label:<24}{r['latency_avg_s']:>7}{r['latency_max_s']:>7}"
              f"{r['tokens_in_avg']:>6}{r['tokens_out_avg']:>6}"
              f"{r['rs_per_minute_of_dictation']:>9.3f}{r['rs_per_user_month_30min_day']:>12.0f}"
              + f"  {r['clean_cases']}/{len(CASES)} clean"
              + ("  FAILS=" + str(r["failures"]) if r["failures"] else ""))
    print("\nJudge on the OUTPUT first: Hinglish must stay in Roman script, nothing invented,\n"
          "numbers/dates/names intact. Cost differences here are pennies; a wrong word is not.")


if __name__ == "__main__":
    main()
