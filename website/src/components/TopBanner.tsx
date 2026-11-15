import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface TopBannerProps {
  onOpenDownload: () => void;
}

export const TopBanner: React.FC<TopBannerProps> = ({ onOpenDownload }) => {
  return (
    <aside
      aria-label="Release Announcement"
      className="w-full bg-[#08080a] border-b border-border-subtle py-2 px-4 text-center text-body-sm text-tertiary flex items-center justify-center gap-2 relative z-50"
    >
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-20 text-primary text-caption font-semibold">
          <Sparkles className="w-3 h-3 text-primary animate-pulse" />
          v1.0.0 Live
        </span>
        <span className="text-secondary font-medium">
          Winland is officially released for Windows 10 & 11
        </span>
        <span className="hidden sm:inline text-tertiary">·</span>
        <button
          onClick={onOpenDownload}
          className="text-primary hover:text-primary-80 transition-colors inline-flex items-center gap-1 font-semibold group cursor-pointer"
        >
          <span>Download Installer</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </aside>
  );
};
