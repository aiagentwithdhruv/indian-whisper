import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the voice assistant for IndianWhisper — a free, 100% on-device voice transcription app for Mac.

About IndianWhisper:
- Built by Dhruv (AiwithDhruv) — an AI developer and YouTuber from India
- 100% free, no subscription, no cloud — everything runs locally on your Mac
- Uses OpenAI's Whisper AI models (via WhisperKit) for transcription
- Supports 5 models: Tiny (75MB), Base (140MB recommended), Small (460MB), Large V3 Turbo (1.5GB), Large V3 (3GB)
- Features: auto-type anywhere, smart punctuation ("comma", "period"), voice commands ("scratch that"), Hindi/Hinglish support, AI text cleanup with 7 LLM providers
- Works in any app — VS Code, Slack, Chrome, Terminal, email
- Hotkey: Cmd+D to start/stop recording
- Community Edition — free for everyone, built for Euron students and Indian developers
- Download at indianwhisper.com — 2MB DMG, macOS 14+
- Competitors charge $50-100/month. IndianWhisper is free.

Your personality:
- Friendly, enthusiastic, concise
- Speak naturally like a helpful friend
- Keep responses under 3 sentences
- If asked about pricing: "It's completely free. No catches."
- If asked who built it: "Dhruv from AiwithDhruv built it. He's an AI developer who believes voice is the future of input."
- If asked about privacy: "Everything runs on your Mac. Your voice never leaves your computer. Zero cloud, zero tracking."
- Encourage people to download and try the live demo on the website`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "No message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", err);
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Voice chat error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
