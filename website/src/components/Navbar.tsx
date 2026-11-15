import React, { useState, useEffect } from 'react';
import { Download, Star, Menu, X } from 'lucide-react';
import { GithubIcon, WindowsIcon } from './SocialIcons';

interface NavbarProps {
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload }) => {
  const [stars, setStars] = useState<number>(42);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-4 z-40 w-full max-w-5xl mx-auto px-4">
      <nav className="bg-surface/85 backdrop-blur-xl border border-border-strong rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl transition-all">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="w-6 h-3 rounded-full bg-primary shadow-halo-pink inline-block transition-transform group-hover:scale-105" />
          <span className="font-display font-bold text-lg tracking-tight text-secondary">
            Winland
          </span>
        </a>

        {/* Desktop Anchor Links */}
        <div className="hidden md:flex items-center gap-6 text-label-md text-tertiary">
          <a href="#island" className="hover:text-secondary transition-colors">Island</a>
          <a href="#widgets" className="hover:text-secondary transition-colors">Widgets</a>
          <a href="#taskbar" className="hover:text-secondary transition-colors">Taskbar</a>
          <a href="#performance" className="hover:text-secondary transition-colors">Architecture</a>
          <a href="#faq" className="hover:text-secondary transition-colors">FAQ</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* GitHub Star Button */}
          <a
            href="https://github.com/jeetron1x/Winland"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 border border-border-subtle hover:border-border-strong text-secondary text-label-sm font-semibold transition-all hover:-translate-y-0.5"
            title="Star Winland on GitHub"
          >
            <GithubIcon className="w-4 h-4 text-tertiary" />
            <span>Star</span>
            <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-primary font-mono text-[11px]">
              ★ {stars}
            </span>
          </a>

          {/* Download Installer Button */}
          <button
            onClick={onOpenDownload}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-neutral hover:bg-white text-label-sm font-bold shadow-lg transition-all hover:scale-102 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-tertiary hover:text-secondary rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-surface/95 backdrop-blur-2xl border border-border-strong rounded-2xl p-4 flex flex-col gap-3 shadow-2xl">
          <a
            href="#island"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-tertiary hover:text-secondary text-label-md rounded-lg"
          >
            Island
          </a>
          <a
            href="#widgets"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-tertiary hover:text-secondary text-label-md rounded-lg"
          >
            Widgets
          </a>
          <a
            href="#taskbar"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-tertiary hover:text-secondary text-label-md rounded-lg"
          >
            Taskbar
          </a>
          <a
            href="#performance"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-tertiary hover:text-secondary text-label-md rounded-lg"
          >
            Architecture
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-tertiary hover:text-secondary text-label-md rounded-lg"
          >
            FAQ
          </a>
          <a
            href="https://github.com/jeetron1x/Winland"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-secondary bg-surface-2 rounded-lg text-label-md"
          >
            <span className="flex items-center gap-2">
              <GithubIcon className="w-4 h-4" />
              <span>Star on GitHub</span>
            </span>
            <span className="text-primary font-mono text-caption">★ {stars}</span>
          </a>
        </div>
      )}
    </header>
  );
};
