import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IndianWhisper — Voice to Text, 100% On-Device",
  description:
    "Free, on-device voice transcription for Mac. Powered by Whisper AI. Your voice data never leaves your computer. Built for Indian developers.",
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
      "100% on-device voice transcription for Mac. Free forever. No cloud, no subscriptions.",
    url: "https://indianwhisper.com",
    siteName: "IndianWhisper",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndianWhisper — Voice to Text, 100% On-Device",
    description: "Free, on-device voice transcription for Mac.",
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
      </body>
    </html>
  );
}
