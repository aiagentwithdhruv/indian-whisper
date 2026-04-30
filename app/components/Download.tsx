export default function Download() {
  return (
    <section id="download" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold">
          Ready to <span className="gradient-text">Start Speaking?</span>
        </h2>
        <p className="mt-4 text-[#A1A1AA] text-lg max-w-xl mx-auto">
          Download IndianWhisper, grant two permissions, and you&apos;re live in 60 seconds.
        </p>

        {/* Two-platform download grid */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* macOS download */}
          <div className="flex flex-col items-center">
            <div className="relative inline-flex items-center justify-center w-full">
              <span className="absolute inset-0 rounded-2xl btn-pulse-ring" />
              <span className="absolute inset-0 rounded-2xl btn-pulse-ring" style={{ animationDelay: "0.8s" }} />
              <a
                href="/releases/IndianWhisper-v1.0.0.dmg"
                className="relative glow-blue inline-flex items-center justify-center gap-3 w-full px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download for macOS
                <span className="text-blue-200 text-sm font-normal">.dmg</span>
              </a>
            </div>
            <div className="mt-3 text-sm text-[#71717A]">v1.0.0 · 2 MB · macOS 14+</div>
          </div>

          {/* Windows download */}
          <div className="flex flex-col items-center">
            <div className="relative inline-flex items-center justify-center w-full">
              <span className="absolute inset-0 rounded-2xl btn-pulse-ring" />
              <span className="absolute inset-0 rounded-2xl btn-pulse-ring" style={{ animationDelay: "0.8s" }} />
              <a
                href="/releases/IndianWhisper-Windows-v1.0.0.exe"
                className="relative glow-cyan inline-flex items-center justify-center gap-3 w-full px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold text-lg hover:from-cyan-500 hover:to-cyan-400 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
                Download for Windows
                <span className="text-cyan-200 text-sm font-normal">.exe</span>
              </a>
            </div>
            <div className="mt-3 text-sm text-[#71717A]">v1.0.0 · ~80 MB · Windows 10/11 (x64)</div>
          </div>
        </div>

        {/* Linux coming soon (single pill) */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-[#71717A] text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="21.17" x2="12" y1="8" y2="8" />
              <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
              <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
            </svg>
            Linux — Coming Soon
          </div>
        </div>

        {/* Install instructions — both platforms */}
        <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* macOS */}
          <div className="glass-card rounded-xl p-5 text-left border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-lg mt-0.5">&#9888;</span>
              <div>
                <h3 className="font-semibold text-sm text-yellow-400">macOS — first time opening?</h3>
                <p className="text-[#A1A1AA] text-sm mt-1">
                  macOS may show &quot;IndianWhisper can&apos;t be opened&quot;. This is normal for apps outside the App Store.
                </p>
                <div className="mt-3 space-y-2 text-sm text-[#A1A1AA]">
                  <p><strong className="text-white">Option 1:</strong> Right-click the app &rarr; Click <strong className="text-white">Open</strong> &rarr; Click <strong className="text-white">Open</strong> again</p>
                  <p><strong className="text-white">Option 2:</strong> <strong className="text-white">System Settings &rarr; Privacy &amp; Security</strong> &rarr; <strong className="text-white">Open Anyway</strong></p>
                  <p><strong className="text-white">Option 3:</strong> <code className="bg-white/10 px-2 py-0.5 rounded text-xs font-mono">xattr -cr /Applications/IndianWhisper.app</code></p>
                </div>
              </div>
            </div>
          </div>

          {/* Windows */}
          <div className="glass-card rounded-xl p-5 text-left border border-cyan-500/20">
            <div className="flex items-start gap-3">
              <span className="text-cyan-400 text-lg mt-0.5">&#9888;</span>
              <div>
                <h3 className="font-semibold text-sm text-cyan-400">Windows — SmartScreen warning?</h3>
                <p className="text-[#A1A1AA] text-sm mt-1">
                  Windows Defender SmartScreen may show &quot;Windows protected your PC&quot;. This is normal for unsigned apps until we add a code-signing certificate.
                </p>
                <div className="mt-3 space-y-2 text-sm text-[#A1A1AA]">
                  <p><strong className="text-white">Step 1:</strong> Click <strong className="text-white">More info</strong> on the warning dialog</p>
                  <p><strong className="text-white">Step 2:</strong> Click <strong className="text-white">Run anyway</strong></p>
                  <p><strong className="text-white">Step 3:</strong> Allow microphone access when prompted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System requirements — both platforms */}
        <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* macOS reqs */}
          <div className="glass-card glow-card-purple animate-float rounded-2xl p-6 text-left">
            <h3 className="font-semibold mb-4 text-sm text-[#A1A1AA] uppercase tracking-wider">macOS Requirements</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#71717A]">OS</span><span>macOS 14 Sonoma or later</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">Chip</span><span>Apple Silicon &amp; Intel</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">RAM</span><span>4 GB min (8 GB for Large)</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">Disk</span><span>75 MB — 3 GB</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">Internet</span><span>Only for first model download</span></div>
            </div>
          </div>

          {/* Windows reqs */}
          <div className="glass-card glow-card-purple animate-float rounded-2xl p-6 text-left">
            <h3 className="font-semibold mb-4 text-sm text-[#A1A1AA] uppercase tracking-wider">Windows Requirements</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#71717A]">OS</span><span>Windows 10 / 11 (x64)</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">CPU</span><span>x64 (Intel/AMD); ARM via x64 emulation</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">RAM</span><span>4 GB min (8 GB for Large)</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">GPU</span><span>Vulkan-capable for 6× speedup (AMD/NVIDIA/Intel modern)</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">Disk</span><span>200 MB — 3 GB</span></div>
              <div className="flex justify-between border-t border-white/5 pt-3"><span className="text-[#71717A]">Internet</span><span>Only for first model download (or Groq cloud STT)</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
