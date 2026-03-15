export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </div>
              <span className="font-semibold">IndianWhisper</span>
              <span className="text-xs text-[#71717A]">Community Edition</span>
            </div>
            <p className="text-sm text-[#71717A]">
              Built by{" "}
              <a
                href="https://youtube.com/@AiwithDhruv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition-colors"
              >
                AiwithDhruv
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[#71717A]">
            <a
              href="https://youtube.com/@AiwithDhruv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              YouTube
            </a>
            <a
              href="https://github.com/aiagentwithdhruv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/aiwithdhruv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://aiwithdhruv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Portfolio
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <div>
            Powered by{" "}
            <a href="https://github.com/argmaxinc/WhisperKit" target="_blank" rel="noopener noreferrer" className="text-[#A1A1AA] hover:text-white transition-colors">
              WhisperKit
            </a>{" "}
            by Argmax
          </div>
          <div>
            Your voice data never leaves your computer. No analytics. No tracking.
          </div>
        </div>
      </div>
    </footer>
  );
}
