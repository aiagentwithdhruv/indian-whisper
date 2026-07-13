"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#101014] border border-white/10 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 1024 1024" fill="none" aria-hidden="true">
              <rect x="214" y="490" width="76" height="112" rx="38" fill="#3B4048" />
              <rect x="734" y="490" width="76" height="112" rx="38" fill="#3B4048" />
              <rect x="344" y="446" width="76" height="200" rx="38" fill="#7E8792" />
              <rect x="604" y="446" width="76" height="200" rx="38" fill="#7E8792" />
              <rect x="474" y="376" width="76" height="340" rx="38" fill="#18D1E0" />
              <circle cx="512" cy="286" r="80" fill="#18D1E0" opacity="0.35" />
              <circle cx="512" cy="286" r="52" fill="#2BE3F2" />
            </svg>
          </div>
          <span className="font-semibold text-lg">Indian<span className="text-[#A1A1AA]">Whisper</span></span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-[#A1A1AA]">
          <a
            href="#try-it"
            className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors font-medium"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-subtle-pulse" />
            Try Live
          </a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a
            href="#calculator"
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
            </svg>
            ROI Calculator
          </a>
          <a href="#models" className="hover:text-white transition-colors">Models</a>
          <a href="/blog" className="hover:text-white transition-colors">Blog</a>
          <a href="#download" className="hover:text-white transition-colors">Download</a>
        </div>

        {/* 3-platform download buttons */}
        <div className="hidden md:flex items-center gap-2">
          {/* macOS */}
          <a
            href="/releases/IndianWhisper-v2.6.1.dmg"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
            aria-label="Download IndianWhisper for macOS"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Mac
          </a>

          {/* Windows */}
          <a
            href="/releases/windows/IndianWhisper%20Setup%202.2.3.exe"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all"
            aria-label="Download IndianWhisper for Windows"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            Windows
          </a>

          {/* Chrome extension */}
          <a
            href="https://chromewebstore.google.com/detail/indianwhisper-%E2%80%94-voice-to/fialodcjdcfockfpohckpifmhbhobohf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all"
            aria-label="Install IndianWhisper Chrome extension"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="21.17" x2="12" y1="8" y2="8" />
              <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
              <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
            </svg>
            Chrome
          </a>
        </div>
      </div>
    </nav>
  );
}
