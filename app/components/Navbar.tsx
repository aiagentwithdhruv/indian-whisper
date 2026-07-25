"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DownloadPicker from "./DownloadPicker";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hash, setHash] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  // Anchors only resolve on the homepage — prefix them elsewhere so they navigate home and scroll.
  const anchor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const linkClass = (active: boolean) =>
    active
      ? "text-white underline underline-offset-8 decoration-[#18D1E0] decoration-2 transition-colors"
      : "text-[#A1A1AA] hover:text-white transition-colors";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="IndianWhisper home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/icon-256.png" alt="" aria-hidden="true" className="w-10 h-10" />
          <span className="font-semibold text-lg">Indian<span className="text-[#A1A1AA]">Whisper</span></span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <a
            href="/"
            aria-current={isHome && hash === "" ? "page" : undefined}
            className={linkClass(isHome && hash === "")}
          >
            Home
          </a>
          {/* The interactive demo is the strongest hook on the site — keep it prominent. */}
          <a
            href={anchor("try-it")}
            aria-current={isHome && hash === "#try-it" ? "true" : undefined}
            className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors font-medium"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-subtle-pulse" />
            Try Live
          </a>
          {/* Second hook: free value before they're ready to buy. */}
          <a
            href={anchor("calculator")}
            aria-current={isHome && hash === "#calculator" ? "true" : undefined}
            className="flex items-center gap-1.5 text-[#18D1E0] hover:text-[#18D1E0]/80 transition-colors font-medium"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
            </svg>
            ROI Calculator
          </a>
          <a
            href="/pricing"
            aria-current={pathname === "/pricing" ? "page" : undefined}
            className={linkClass(pathname === "/pricing")}
          >
            Pricing
          </a>
          <a
            href="/blog"
            aria-current={pathname.startsWith("/blog") ? "page" : undefined}
            className={linkClass(pathname.startsWith("/blog"))}
          >
            Blog
          </a>

          {/* Single Download entry — opens the platform picker instead of three buttons */}
          <a
            href={anchor("download")}
            onClick={(e) => {
              e.preventDefault();
              setPickerOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-[#18D1E0] text-black font-semibold hover:bg-[#18D1E0]/90 transition-all"
          >
            Download
          </a>
        </div>
      </div>

      <DownloadPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </nav>
  );
}
