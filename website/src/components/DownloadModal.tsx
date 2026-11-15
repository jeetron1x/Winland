import React from 'react';
import { X, Download, ShieldCheck, Check } from 'lucide-react';
import { WindowsIcon, GithubIcon } from './SocialIcons';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-surface border border-border-strong rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-surface-2 text-tertiary hover:text-secondary hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-3.5 rounded-full bg-primary shadow-halo-pink" />
          <h3 className="font-display font-bold text-xl text-secondary">
            Download Winland
          </h3>
        </div>

        <p className="text-body-sm text-tertiary mb-6">
          Official release <strong>v1.0.0</strong> for Windows 10 (2004+) and Windows 11. Hardware-accelerated DirectX composition with sub-millisecond spring dynamics.
        </p>

        {/* Primary Download Button */}
        <div className="flex flex-col gap-3 mb-6">
          <a
            href="https://github.com/jeetron1x/Winland/releases/download/v1.0.0/Winland-Setup.exe"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-secondary text-neutral hover:bg-white text-label-lg font-bold shadow-2xl transition-all hover:scale-102"
            download
          >
            <Download className="w-5 h-5" />
            <span>Download Winland-Setup.exe</span>
          </a>

          <div className="flex gap-3">
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
              <span>GitHub Releases ↗</span>
            </a>
          </div>
        </div>

        {/* Security & Verification Card */}
        <div className="bg-surface-2 border border-border-subtle rounded-2xl p-4 mb-6 text-caption">
          <div className="text-[11px] font-mono uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Binary Verification & Security</span>
          </div>
          <div className="flex justify-between py-1 text-tertiary">
            <span>Publisher:</span>
            <span className="text-secondary font-semibold">Jeetron1x (Verified)</span>
          </div>
          <div className="flex justify-between py-1 text-tertiary">
            <span>Architecture:</span>
            <span className="text-secondary font-mono">x64 ReadyToRun</span>
          </div>
          <div className="flex justify-between py-1 text-tertiary">
            <span>Digital Signature:</span>
            <span className="text-emerald-400 font-mono">Authenticode SHA-256</span>
          </div>
        </div>

        {/* Community Link */}
        <div className="flex items-center justify-between pt-4 border-t border-border-subtle text-caption text-tertiary">
          <span>Open-source on GitHub</span>
          <a
            href="https://github.com/jeetron1x/Winland"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-1 font-semibold"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Star the repo</span>
          </a>
        </div>
      </div>
    </div>
  );
};
