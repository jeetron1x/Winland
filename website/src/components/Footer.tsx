import React from 'react';
import { GithubIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-subtle py-12 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-body-sm text-tertiary">
        <div className="flex items-center gap-3">
          <span className="w-5 h-2.5 rounded-full bg-primary shadow-halo-pink inline-block" />
          <span className="font-display font-bold text-secondary text-base">Winland</span>
          <span className="text-zinc-600">·</span>
          <span>Crafted with precision by <strong>Jeetron1x</strong></span>
        </div>

        <div className="flex items-center gap-6 text-caption">
          <a
            href="https://github.com/jeetron1x/Winland/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
          >
            MIT License
          </a>
          <a
            href="https://github.com/jeetron1x/Winland/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary transition-colors"
          >
            Changelog
          </a>
          <a
            href="https://github.com/jeetron1x/Winland"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors flex items-center gap-1 text-primary"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-[11px] text-zinc-600">
        Compatible with Windows 10 (2004+) and Windows 11. Winland is an independent open-source project and is not affiliated with Microsoft Corporation.
      </div>
    </footer>
  );
};
