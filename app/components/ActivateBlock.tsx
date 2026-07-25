"use client";

import { useState } from "react";

/**
 * Post-purchase activation. The deep link is the happy path on a Mac that already
 * has v3.2.0+ installed; the raw key + copy button stay visible because the link is
 * a no-op for Windows buyers and for anyone who hasn't installed the app yet.
 */
export default function ActivateBlock({ licenseKey }: { licenseKey: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
        Your license key
      </p>

      <code className="mt-3 block break-all text-lg text-white">{licenseKey}</code>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={`indianwhisper://activate?key=${encodeURIComponent(licenseKey)}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#18D1E0] px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-[#18D1E0]/90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Activate in IndianWhisper
        </a>

        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
        >
          {copied ? "Copied" : "Copy key"}
        </button>
      </div>

      <p className="mt-4 text-xs text-[#71717A]">
        The button needs IndianWhisper v3.2.0 or newer on this Mac. On Windows, or if
        nothing happens, copy the key and paste it in Settings → License.
      </p>
    </div>
  );
}
