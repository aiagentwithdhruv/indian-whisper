"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"feedback" | "bug" | "feature">("feedback");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);

    // Submit to formsubmit.co (free, no signup)
    try {
      await fetch("https://formsubmit.co/ajax/aiwithdhruv@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name || "Anonymous",
          type,
          message,
          _subject: `[IndianWhisper ${type}] from ${name || "Anonymous"}`,
        }),
      });
      setSubmitted(true);
      setName("");
      setMessage("");
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:aiwithdhruv@gmail.com?subject=${encodeURIComponent(`[IndianWhisper ${type}]`)}&body=${encodeURIComponent(`Name: ${name || "Anonymous"}\nType: ${type}\n\n${message}`)}`;
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="glass-card glow-card-green rounded-2xl p-10">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
            <p className="text-[#A1A1AA]">Your feedback helps us make IndianWhisper better.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Send another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="feedback" className="py-20 px-6 relative">
      <div className="max-w-lg mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Share Your <span className="gradient-text">Feedback</span>
          </h2>
          <p className="mt-3 text-[#A1A1AA] text-sm">
            Bug, idea, or just a kind word — we read every message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card glow-card-purple rounded-2xl p-8 space-y-5">
          {/* Type selector */}
          <div className="flex gap-2">
            {(["feedback", "bug", "feature"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                  type === t
                    ? t === "bug"
                      ? "bg-red-500/15 text-red-400 border border-red-500/30"
                      : t === "feature"
                      ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                      : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                    : "bg-white/5 text-[#71717A] border border-white/5 hover:border-white/10"
                }`}
              >
                {t === "bug" ? "Bug" : t === "feature" ? "Feature Idea" : "Feedback"}
              </button>
            ))}
          </div>

          {/* Name */}
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all"
          />

          {/* Message */}
          <textarea
            placeholder={
              type === "bug"
                ? "What happened? What did you expect?"
                : type === "feature"
                ? "What would you love to see in IndianWhisper?"
                : "Tell us what you think..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={!message.trim() || submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send Feedback"}
          </button>

          <p className="text-xs text-[#71717A] text-center">
            Goes directly to the developer. No spam, no tracking.
          </p>
        </form>
      </div>
    </section>
  );
}
