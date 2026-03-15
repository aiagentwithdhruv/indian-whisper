export default function Comparison() {
  const tools = [
    {
      name: "IndianWhisper",
      price: "Free",
      priceDetail: "no limits",
      privacy: "100% on-device",
      hindiSupport: true,
      openSource: true,
      llmCleanup: true,
      voiceCommands: true,
      highlighted: true,
    },
    {
      name: "Wispr Flow",
      price: "$8/mo",
      priceDetail: "~Rs.3,800/yr",
      privacy: "Cloud-based",
      hindiSupport: false,
      openSource: false,
      llmCleanup: true,
      voiceCommands: true,
      highlighted: false,
    },
    {
      name: "BridgeVoice",
      price: "$50/mo",
      priceDetail: "~Rs.50,000/yr",
      privacy: "On-device",
      hindiSupport: false,
      openSource: false,
      llmCleanup: false,
      voiceCommands: false,
      highlighted: false,
    },
    {
      name: "macOS Dictation",
      price: "Free",
      priceDetail: "built-in",
      privacy: "Cloud (Apple)",
      hindiSupport: false,
      openSource: false,
      llmCleanup: false,
      voiceCommands: false,
      highlighted: false,
    },
  ];

  const Check = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );

  const Cross = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Why Pay <span className="gradient-text">When It&apos;s Free?</span>
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-lg max-w-xl mx-auto">
            Compare IndianWhisper with paid alternatives.
          </p>
        </div>

        <div className="glass-card glow-card-blue animate-float-delayed rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-sm font-medium text-[#71717A]">Feature</th>
                {tools.map((tool) => (
                  <th
                    key={tool.name}
                    className={`text-center px-4 py-4 text-sm font-semibold ${
                      tool.highlighted ? "text-blue-400" : "text-[#A1A1AA]"
                    }`}
                  >
                    {tool.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/[0.03]">
                <td className="px-6 py-3.5 text-sm text-[#A1A1AA]">Price</td>
                {tools.map((tool) => (
                  <td key={tool.name} className="text-center px-4 py-3.5">
                    <div className={`text-sm font-semibold ${tool.highlighted ? "text-green-400" : ""}`}>{tool.price}</div>
                    <div className="text-xs text-[#71717A]">{tool.priceDetail}</div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/[0.03]">
                <td className="px-6 py-3.5 text-sm text-[#A1A1AA]">Privacy</td>
                {tools.map((tool) => (
                  <td key={tool.name} className="text-center px-4 py-3.5 text-sm text-[#A1A1AA]">{tool.privacy}</td>
                ))}
              </tr>
              {[
                { label: "Hindi / Hinglish", key: "hindiSupport" as const },
                { label: "Open Source", key: "openSource" as const },
                { label: "AI Cleanup (LLM)", key: "llmCleanup" as const },
                { label: "Voice Commands", key: "voiceCommands" as const },
              ].map((row) => (
                <tr key={row.label} className="border-b border-white/[0.03]">
                  <td className="px-6 py-3.5 text-sm text-[#A1A1AA]">{row.label}</td>
                  {tools.map((tool) => (
                    <td key={tool.name} className="text-center px-4 py-3.5">
                      <div className="flex justify-center">
                        {tool[row.key] ? <Check /> : <Cross />}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
