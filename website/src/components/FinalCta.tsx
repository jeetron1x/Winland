import React, { useState, useEffect } from 'react';
import { Download, Star, ExternalLink, CheckCircle } from 'lucide-react';
import { GithubIcon, WindowsIcon } from './SocialIcons';

interface FinalCtaProps {
  onOpenDownload: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenDownload }) => {
  const [stars, setStars] = useState<number>(42);

  useEffect(() => {
    fetch('https://api.github.com/repos/jeetron1x/Winland')
      .then(res => res.json())
      .then(data => {
        if (typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Download Winland Installer */}
        <div className="bg-surface border border-border-strong rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-20 text-primary text-caption font-semibold mb-4">
              <WindowsIcon className="w-3.5 h-3.5" />
              <span>Official Release v1.0.0</span>
            </div>
            
            <h3 className="font-display font-extrabold text-headline-sm text-secondary mb-3">
              Ready for your desktop?
            </h3>
            
            <p className="text-body-sm text-tertiary mb-8 leading-relaxed">
              Download the official verified installer for Windows 10 and 11. Includes one-click setup with automatic desktop shortcuts.
            </p>
          </div>

          <div>
            <a
              href="https://github.com/jeetron1x/Winland/releases/download/v1.0.0/Winland-Setup.exe"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-secondary text-neutral hover:bg-white text-label-lg font-bold shadow-2xl transition-all hover:scale-102 mb-3"
              download
            >
              <Download className="w-5 h-5" />
              <span>Download Winland-Setup.exe</span>
            </a>

            <div className="flex gap-3 mb-6">
              <a
                href="https://github.com/jeetron1x/Winland/releases/download/v1.0.0/Winland.msix"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-surface-2 border border-border-subtle hover:border-border-strong text-secondary text-label-sm font-semibold transition-colors"
                download
              >
                <WindowsIcon className="w-4 h-4" />
                <span>MSIX Package</span>
              </a>
              <a
                href="https://github.com/jeetron1x/Winland/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-surface-2 border border-border-subtle hover:border-border-strong text-secondary text-label-sm font-semibold transition-colors"
              >
                <span>All Releases</span>
                <ExternalLink className="w-3.5 h-3.5 text-tertiary" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border-subtle text-[11px] text-tertiary font-mono">
              <div>
                <strong className="text-secondary block">1. Download</strong>
                Winland-Setup.exe
              </div>
              <div>
                <strong className="text-secondary block">2. Run</strong>
                Signed by Jeetron1x
              </div>
              <div>
                <strong className="text-secondary block">3. Launch</strong>
                Instant Island startup
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Star on GitHub */}
        <div className="bg-surface border border-border-strong rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-caption font-semibold mb-4">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>Open Source Community</span>
            </div>
            
            <h3 className="font-display font-extrabold text-headline-sm text-secondary mb-3">
              Star Winland on GitHub.
            </h3>
            
            <p className="text-body-sm text-tertiary mb-8 leading-relaxed">
              Winland is completely free and open source. Starring the project on GitHub helps us grow, supports independent desktop software, and tracks upcoming feature releases.
            </p>
          </div>

          <div>
            <a
              href="https://github.com/jeetron1x/Winland"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-surface-2 border border-border-strong hover:border-white/30 text-secondary text-label-lg font-bold transition-all hover:-translate-y-0.5 mb-6"
            >
              <GithubIcon className="w-5 h-5 text-tertiary" />
              <span>Star on GitHub</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-primary font-mono text-caption">
                ★ {stars}
              </span>
            </a>

            <div className="bg-surface-2 border border-border-subtle rounded-2xl p-4 flex items-center justify-between text-caption font-mono">
              <span className="text-tertiary">Repository:</span>
              <a
                href="https://github.com/jeetron1x/Winland"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                github.com/jeetron1x/Winland
              </a>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
