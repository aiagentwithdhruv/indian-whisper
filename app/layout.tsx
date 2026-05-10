import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import VoiceAssistant from "./components/VoiceAssistant"; // TODO: fix Gemini TTS then re-enable

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IndianWhisper — Voice to Text, On-Device by Default",
  description:
    "Free voice-to-text for Mac, Windows, and Chrome. Hindi, Hinglish, English. On-device by default — your audio recordings never leave your machine. Sign in for cross-device transcript sync. Built for Indian developers.",
  keywords: [
    "voice to text",
    "voice typing",
    "speech recognition",
    "whisper",
    "dictation",
    "mac",
    "windows",
    "chrome extension",
    "on-device",
    "free",
    "indian english",
    "hindi",
    "hinglish",
    "indianwhisper",
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
    title: "IndianWhisper — Voice to Text, On-Device by Default",
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
