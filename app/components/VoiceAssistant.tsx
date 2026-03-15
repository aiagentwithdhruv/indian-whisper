"use client";

import { useState, useRef, useCallback } from "react";

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Try to pick a natural female voice
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google UK English Female")
    );
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setStatus("speaking");
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setStatus("idle");
    };

    speechSynthesis.speak(utterance);
  }, []);

  const askAI = useCallback(async (text: string) => {
    setStatus("thinking");
    try {
      const res = await fetch("/api/voice-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (data.reply) {
        speak(data.reply);
      } else {
        speak("Sorry, I couldn't process that. Try again.");
        setStatus("idle");
      }
    } catch {
      speak("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }, [speak]);

  const toggleListening = useCallback(() => {
    // If speaking, stop
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setStatus("idle");
      return;
    }

    // If listening, stop
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setStatus("idle");
      return;
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      speak("Voice input requires Chrome or Edge browser.");
      return;
    }

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      if (text) {
        askAI(text);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setStatus("idle");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setStatus("listening");
  }, [isListening, isSpeaking, askAI, speak]);

  return (
    <>
      {/* Floating button — bottom right */}
      <button
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
            // Auto-greet on first open
            setTimeout(() => speak("Hi! I'm the IndianWhisper assistant. Ask me anything about the app — tap the mic and speak!"), 300);
          } else {
            // Close and cleanup
            speechSynthesis.cancel();
            recognitionRef.current?.stop();
            setIsListening(false);
            setIsSpeaking(false);
            setStatus("idle");
            setIsOpen(false);
          }
        }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isOpen
            ? "bg-white/10 border border-white/20 hover:bg-white/15"
            : "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 glow-blue"
        }`}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        )}
      </button>

      {/* Voice panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-72 glass-card glow-card-purple rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold">IndianWhisper AI</div>
              <div className="text-xs text-[#71717A]">Voice-only assistant</div>
            </div>
          </div>

          {/* Status area */}
          <div className="px-5 py-8 flex flex-col items-center gap-4">
            {/* Animated circle */}
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                  status === "listening"
                    ? "bg-cyan-500/15 border-2 border-cyan-500/50"
                    : status === "thinking"
                    ? "bg-purple-500/15 border-2 border-purple-500/50"
                    : status === "speaking"
                    ? "bg-green-500/15 border-2 border-green-500/50"
                    : "bg-white/5 border-2 border-white/10"
                }`}
              >
                {status === "listening" && (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-1 bg-cyan-400 rounded-full wave-bar" style={{ height: 6 }} />
                    ))}
                  </div>
                )}
                {status === "thinking" && (
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                )}
                {status === "speaking" && (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-1 bg-green-400 rounded-full wave-bar" style={{ height: 6 }} />
                    ))}
                  </div>
                )}
                {status === "idle" && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                )}
              </div>

              {/* Pulse rings when active */}
              {(status === "listening" || status === "speaking") && (
                <>
                  <span className={`absolute inset-0 rounded-full btn-pulse-ring ${
                    status === "listening" ? "border-cyan-500/40" : "border-green-500/40"
                  }`} />
                  <span className={`absolute inset-0 rounded-full btn-pulse-ring ${
                    status === "listening" ? "border-cyan-500/40" : "border-green-500/40"
                  }`} style={{ animationDelay: "0.8s" }} />
                </>
              )}
            </div>

            {/* Status text */}
            <div className="text-sm text-center">
              {status === "idle" && <span className="text-[#71717A]">Tap to speak</span>}
              {status === "listening" && <span className="text-cyan-400">Listening...</span>}
              {status === "thinking" && <span className="text-purple-400">Thinking...</span>}
              {status === "speaking" && <span className="text-green-400">Speaking...</span>}
            </div>
          </div>

          {/* Mic button */}
          <div className="px-5 pb-5 flex justify-center">
            <button
              onClick={toggleListening}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                status === "listening"
                  ? "bg-red-500/15 text-red-400 border border-red-500/30"
                  : status === "speaking"
                  ? "bg-white/5 text-[#71717A] border border-white/10"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              }`}
            >
              {status === "listening" ? (
                <>
                  <div className="w-3 h-3 rounded-sm bg-red-400" />
                  Stop
                </>
              ) : status === "speaking" ? (
                "Tap to interrupt"
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  </svg>
                  Ask me anything
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
