"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PlatformKey = "mac" | "windows" | "chrome";

type Platform = {
  key: PlatformKey;
  label: string;
  meta: string;
  href: string;
  external: boolean;
  icon: React.ReactNode;
};

const PLATFORMS: Platform[] = [
  {
    key: "mac",
    label: "Mac",
    meta: "v3.2.0 · 4 MB · macOS 14+",
    href: "/releases/IndianWhisper-v3.2.0.dmg",
    external: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  },
  {
    key: "windows",
    label: "Windows",
    meta: "v3.0.0 · ~85 MB · Windows 10/11 (x64)",
    href: "/releases/windows/IndianWhisper%20Setup%203.0.0.exe",
    external: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
  },
  {
    key: "chrome",
    label: "Chrome extension",
    meta: "Free · works on any website",
    href: "https://chromewebstore.google.com/detail/indianwhisper-%E2%80%94-voice-to/fialodcjdcfockfpohckpifmhbhobohf",
    external: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
      </svg>
    ),
  },
];

/** Best-effort OS sniff — used only to pre-highlight, never to block a choice. */
function detectPlatform(): PlatformKey | null {
  if (typeof navigator === "undefined") return null;
  const ua = `${navigator.userAgent} ${navigator.platform ?? ""}`.toLowerCase();
  if (ua.includes("win")) return "windows";
  // iPads report "macintosh" too — still the closest match we ship for.
  if (ua.includes("mac") || ua.includes("iphone") || ua.includes("ipad")) return "mac";
  return "chrome";
}

export default function DownloadPicker({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [detected, setDetected] = useState<PlatformKey | null>(null);
  const [mounted, setMounted] = useState(false);
  const firstOptionRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setDetected(detectPlatform());
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) firstOptionRef.current?.focus();
  }, [open, detected]);

  if (!open || !mounted) return null;

  // Recommended platform first, so the focused option is the one they want.
  const ordered = detected
    ? [...PLATFORMS].sort((a, b) => Number(b.key === detected) - Number(a.key === detected))
    : PLATFORMS;

  // Portal to body — the navbar is a fixed/backdrop-blurred parent, which would
  // otherwise become the containing block and squash the overlay.
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-picker-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0A0B] p-6 shadow-[0_0_60px_rgba(0,0,0,0.6)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#71717A] hover:text-white transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 id="download-picker-title" className="text-xl font-bold text-white">
          Which one are you on?
        </h2>
        <p className="mt-1.5 text-sm text-[#A1A1AA]">
          Free to start. No card needed.
        </p>

        <div className="mt-6 space-y-3">
          {ordered.map((p, i) => {
            const recommended = p.key === detected;
            return (
              <a
                key={p.key}
                ref={i === 0 ? firstOptionRef : undefined}
                href={p.href}
                {...(p.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : { download: true })}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all ${
                  recommended
                    ? "border-[#18D1E0]/50 bg-[#18D1E0]/[0.06] hover:bg-[#18D1E0]/[0.12]"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"
                }`}
              >
                <span className={recommended ? "text-[#18D1E0]" : "text-[#A1A1AA]"}>{p.icon}</span>
                <span className="flex-1 text-left">
                  <span className="block text-sm font-semibold text-white">{p.label}</span>
                  <span className="block text-xs text-[#71717A]">{p.meta}</span>
                </span>
                {recommended && (
                  <span className="rounded-md border border-[#18D1E0]/30 bg-[#18D1E0]/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#18D1E0]">
                    Your device
                  </span>
                )}
              </a>
            );
          })}
        </div>

        <p className="mt-5 text-center text-xs text-[#71717A]">
          First launch needs a one-time security approval —{" "}
          <a href="/#download" onClick={onClose} className="text-[#A1A1AA] underline underline-offset-2 hover:text-white">
            steps here
          </a>
          .
        </p>
      </div>
    </div>,
    document.body
  );
}
