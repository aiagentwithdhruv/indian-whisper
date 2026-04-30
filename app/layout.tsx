import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import VoiceAssistant from "./components/VoiceAssistant"; // TODO: fix Gemini TTS then re-enable

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IndianWhisper — Voice to Text, 100% On-Device",
  description:
    "Free voice-to-text for Mac, Windows, and Chrome. Hindi, Hinglish, English. On-device on Mac — your voice data never leaves your computer. Built for Indian developers.",
  keywords: [
    "voice to text",
    "speech recognition",
    "whisper",
    "dictation",
    "mac",
    "on-device",
    "free",
    "indian english",
  ],
  openGraph: {
    title: "IndianWhisper — Stop Typing. Start Speaking.",
    description:
      "Voice-to-text for Mac, Windows, and Chrome. Hindi, Hinglish, English. Free forever. No subscription.",
    url: "https://indianwhisper.com",
    siteName: "IndianWhisper",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndianWhisper — Voice to Text, 100% On-Device",
    description: "Voice-to-text for Mac, Windows & Chrome. Hindi/Hinglish/English. Free.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#0A0A0B] text-white`}>
        {children}
        {/* <VoiceAssistant /> */}
      </body>
    </html>
  );
}
