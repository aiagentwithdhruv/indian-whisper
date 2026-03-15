"use client";

export default function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center justify-center px-6 pt-16">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-[#A1A1AA] mb-8">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-1 bg-blue-500 rounded-full wave-bar"
                style={{ height: 8 }}
              />
            ))}
          </div>
          Voice to Text at the Speed of Thought
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animation-delay-200 text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Stop Typing.
          <br />
          <span className="gradient-text">Start Speaking.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up animation-delay-400 mt-6 text-lg md:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          100% on-device voice transcription for Mac. Powered by Whisper AI.
          Your voice data <span className="text-white font-medium">never leaves your computer</span>.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up animation-delay-600 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#download"
            className="glow-blue inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download for macOS
          </a>
          <div className="text-sm text-[#71717A]">
            v1.0.0 · 2 MB · macOS 14+ · 100% Free
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 flex items-center justify-center gap-8 md:gap-16 text-center">
          {[
            { value: "100%", label: "On-Device" },
            { value: "0", label: "Cloud Calls" },
            { value: "Free", label: "No Subscription" },
            { value: "42x", label: "Real-time Speed" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-xs md:text-sm text-[#71717A] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Floating indicator preview */}
        <div className="mt-16 relative">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#111113] border border-white/10 shadow-2xl">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-subtle-pulse" />
            <span className="text-sm text-[#A1A1AA]">Ready</span>
            <span className="text-sm text-[#71717A]">—</span>
            <span className="text-sm font-mono text-white">Cmd + D</span>
            <span className="text-sm text-[#71717A]">to start</span>
          </div>
        </div>
      </div>
    </section>
  );
}
