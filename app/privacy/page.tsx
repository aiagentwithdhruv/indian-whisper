export const metadata = {
  title: "Privacy Policy — IndianWhisper",
  description: "IndianWhisper privacy policy. Your voice data never leaves your computer.",
};

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-[#71717A] mb-12">Last updated: March 17, 2026</p>

        <div className="space-y-8 text-[#A1A1AA] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
            <p>
              IndianWhisper is built with privacy as a core principle. Your voice data never leaves
              your computer. We do not collect, store, transmit, or sell any personal data, voice
              recordings, or transcribed text.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Mac App</h2>
            <p>
              The IndianWhisper Mac app uses WhisperKit to run speech recognition entirely on your
              device. All audio processing happens locally using Apple&apos;s CoreML framework. No audio
              or text is sent to any server. The optional LLM cleanup feature, if enabled by the user,
              sends only the transcribed text (not audio) to the user&apos;s chosen AI provider using the
              user&apos;s own API key.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Chrome Extension</h2>
            <p>
              The IndianWhisper Chrome extension uses the browser&apos;s built-in Web Speech API for
              speech recognition. Voice processing is handled by Chrome — we have no access to your
              audio or transcribed text. The extension does not make any network requests, does not
              use analytics or tracking, and does not require an account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Website</h2>
            <p>
              The indianwhisper.com website does not use cookies, analytics, or tracking scripts.
              The feedback form stores your message for product improvement purposes only. The live
              voice demo uses the Web Speech API in your browser — no audio leaves your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Data Collection</h2>
            <p>We collect <strong className="text-white">zero</strong> data. Specifically:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>No voice recordings</li>
              <li>No transcribed text</li>
              <li>No usage analytics</li>
              <li>No cookies or tracking</li>
              <li>No personal information</li>
              <li>No account or sign-up required</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Third-Party Services</h2>
            <p>
              IndianWhisper does not integrate with any third-party analytics, advertising, or data
              collection services. The Chrome extension uses only Chrome&apos;s built-in Web Speech API.
              The Mac app uses only Apple&apos;s on-device CoreML and WhisperKit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Open Source</h2>
            <p>
              IndianWhisper is open source. You can verify our privacy claims by reviewing the source
              code at{" "}
              <a
                href="https://github.com/aiagentwithdhruv/indian-whisper"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/aiagentwithdhruv/indian-whisper
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">Contact</h2>
            <p>
              For privacy questions, reach out via the feedback form on{" "}
              <a href="https://indianwhisper.com/#feedback" className="text-blue-400 hover:underline">
                indianwhisper.com
              </a>{" "}
              or email{" "}
              <a href="mailto:aiwithdhruv@gmail.com" className="text-blue-400 hover:underline">
                aiwithdhruv@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-[#71717A]">
          <a href="/" className="text-blue-400 hover:underline">&larr; Back to IndianWhisper</a>
        </div>
      </div>
    </main>
  );
}
