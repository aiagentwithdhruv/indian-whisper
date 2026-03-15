"use client";

import { useState } from "react";

export default function Calculator() {
  const [hoursTyping, setHoursTyping] = useState(3);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  // Average typing speed: 40 WPM, speaking speed: 150 WPM → 3.75x faster
  const speedMultiplier = 3.75;
  const weeklyTypingHours = hoursTyping * daysPerWeek;
  const weeklyWithVoice = weeklyTypingHours / speedMultiplier;
  const weeklySaved = weeklyTypingHours - weeklyWithVoice;
  const monthlySaved = weeklySaved * 4.3;
  const yearlySaved = weeklySaved * 52;

  // Money value: assume avg hourly rate
  const hourlyRate = 25; // USD
  const yearlyMoneySaved = Math.round(yearlySaved * hourlyRate);

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            How Much Time Are You{" "}
            <span className="gradient-text">Wasting?</span>
          </h2>
          <p className="mt-4 text-[#A1A1AA] text-lg max-w-xl mx-auto">
            Speaking is 3.75x faster than typing. See how much time you can save.
          </p>
        </div>

        <div className="glass-card glow-card-purple animate-float-slow rounded-2xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Inputs */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Hours spent typing per day</label>
                  <span className="text-2xl font-bold text-blue-400">{hoursTyping}h</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={hoursTyping}
                  onChange={(e) => setHoursTyping(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 ${((hoursTyping - 1) / 9) * 100}%, rgba(255,255,255,0.1) ${((hoursTyping - 1) / 9) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#71717A] mt-1">
                  <span>1h</span>
                  <span>10h</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium">Days per week</label>
                  <span className="text-2xl font-bold text-purple-400">{daysPerWeek}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={7}
                  step={1}
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #8B5CF6 ${((daysPerWeek - 1) / 6) * 100}%, rgba(255,255,255,0.1) ${((daysPerWeek - 1) / 6) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#71717A] mt-1">
                  <span>1 day</span>
                  <span>7 days</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-sm text-[#71717A]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  Average: 40 WPM typing vs 150 WPM speaking
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-5">
              <div className="text-center mb-6">
                <div className="text-sm text-[#71717A] uppercase tracking-wider mb-2">Time you save with voice</div>
              </div>

              <div className="glass-card rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{weeklySaved.toFixed(1)}h</div>
                <div className="text-xs text-[#71717A] mt-1">saved per week</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{Math.round(monthlySaved)}h</div>
                  <div className="text-xs text-[#71717A] mt-1">per month</div>
                </div>
                <div className="glass-card rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{Math.round(yearlySaved)}h</div>
                  <div className="text-xs text-[#71717A] mt-1">per year</div>
                </div>
              </div>

              <div className="glass-card glow-card-green rounded-xl p-4 text-center">
                <div className="text-xs text-[#71717A] uppercase tracking-wider mb-1">Value of time saved (at $25/hr)</div>
                <div className="text-3xl font-bold text-green-400">${yearlyMoneySaved.toLocaleString()}</div>
                <div className="text-xs text-[#71717A] mt-1">per year</div>
              </div>

              <div className="text-center pt-2">
                <a
                  href="#download"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Start saving time now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
