import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Monitor, Music, Bell, LayoutGrid, Dock } from 'lucide-react';
import { GithubIcon, WindowsIcon } from './SocialIcons';

interface HeroProps {
  onOpenDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload }) => {
  const [stars, setStars] = useState<number>(42);
  const [activeShot, setActiveShot] = useState<'desktop' | 'island' | 'notification' | 'widgets' | 'taskbar'>('desktop');

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

  const screenshots = {
    desktop: {
      src: '/images/desktop-hero-wallpaper.jpg',
      title: 'Full Desktop Environment',
      desc: 'Blood moon clock, resting island, floating live widgets, and the glass taskbar dock.'
    },
    island: {
      src: '/images/expanded-island-music.png',
      title: 'Expanded Media Island',
      desc: 'The Weeknd media player with circular album artwork, timeline scrubber, and 4-row dot matrix visualizer.'
    },
    notification: {
      src: '/images/snipping-tool-island.png',
      title: 'Snipping Tool Notification',
      desc: 'Discrete passive HUD pill showing screenshot copied to clipboard with instant dismiss.'
    },
    widgets: {
      src: '/images/desktop-widgets.jpg',
      title: 'Desktop Glass Widgets',
      desc: 'Live Open-Meteo weather radar and real-time CPU / Memory / Battery hardware telemetry.'
    },
    taskbar: {
      src: '/images/taskbar-dock.png',
      title: 'Modern Glass Taskbar',
      desc: 'Translucent glass taskbar with razor-thin top rim glow, Start orb, system tray, and app dock.'
    }
  };

  return (
    <section className="pt-20 pb-16 px-4 max-w-6xl mx-auto flex flex-col items-center text-center">
      
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-2 border border-border-strong text-caption text-tertiary mb-6">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-secondary font-medium">Windows 10 (2004+) & Windows 11</span>
        <span className="text-border-strong">|</span>
        <span className="text-primary font-mono">v1.0.0 x64 ReadyToRun</span>
      </div>

      {/* Main Headline */}
      <h1 className="font-display font-extrabold text-headline-display tracking-tight text-secondary max-w-4xl mb-6">
        Your PC, with an island.
      </h1>

      {/* Sub-headline */}
      <p className="text-body-lg text-tertiary max-w-2xl mb-8 leading-relaxed">
        The next-generation Dynamic Island & modern taskbar for Windows. Hardware-accelerated DirectX composition, real-time WASAPI audio spectrum, and seamless taskbar integration.
      </p>

      {/* Primary CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
        <button
          onClick={onOpenDownload}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-secondary text-neutral hover:bg-white text-label-lg font-bold shadow-2xl transition-all hover:scale-102 cursor-pointer"
        >
          <WindowsIcon className="w-5 h-5" />
          <span>Download Winland Installer</span>
          <span className="text-caption font-mono text-neutral/70 px-2 py-0.5 rounded-full bg-neutral/10">v1.0.0</span>
        </button>

        <a
          href="https://github.com/jeetron1x/Winland"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-surface-2 border border-border-strong hover:border-white/30 text-secondary text-label-lg font-semibold transition-all hover:-translate-y-0.5"
        >
          <GithubIcon className="w-5 h-5 text-tertiary" />
          <span>Star on GitHub</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-primary font-mono text-caption">
            ★ {stars}
          </span>
        </a>
      </div>

      {/* Screenshot Switcher Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-1.5 bg-surface-2/80 backdrop-blur-xl border border-border-subtle rounded-full max-w-full">
        <button
          onClick={() => setActiveShot('desktop')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeShot === 'desktop' ? 'bg-primary text-black font-bold shadow-halo-pink' : 'text-tertiary hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Desktop</span>
        </button>

        <button
          onClick={() => setActiveShot('island')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeShot === 'island' ? 'bg-primary text-black font-bold shadow-halo-pink' : 'text-tertiary hover:text-white'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>Media Island</span>
        </button>

        <button
          onClick={() => setActiveShot('notification')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeShot === 'notification' ? 'bg-primary text-black font-bold shadow-halo-pink' : 'text-tertiary hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Notification</span>
        </button>

        <button
          onClick={() => setActiveShot('widgets')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeShot === 'widgets' ? 'bg-primary text-black font-bold shadow-halo-pink' : 'text-tertiary hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Widgets</span>
        </button>

        <button
          onClick={() => setActiveShot('taskbar')}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            activeShot === 'taskbar' ? 'bg-primary text-black font-bold shadow-halo-pink' : 'text-tertiary hover:text-white'
          }`}
        >
          <Dock className="w-3.5 h-3.5" />
          <span>Taskbar Dock</span>
        </button>
      </div>

      {/* Monitor Display Bezel with Real Pristine Screenshot */}
      <div className="w-full rounded-2xl md:rounded-[34px] border border-border-strong bg-surface p-2 sm:p-4 shadow-2xl relative overflow-hidden group">
        
        <div className="relative w-full rounded-xl md:rounded-[26px] overflow-hidden bg-black select-none border border-white/10 flex items-center justify-center min-h-[300px] sm:min-h-[460px]">
          {activeShot === 'desktop' && (
            <img
              src="/images/desktop-hero-wallpaper.jpg"
              alt="Winland Full Desktop Environment"
              className="w-full h-auto object-cover rounded-xl md:rounded-[24px]"
            />
          )}

          {activeShot === 'island' && (
            <div className="p-4 sm:p-12 flex flex-col items-center justify-center bg-black/90 w-full min-h-[380px]">
              <img
                src="/images/expanded-island-music.png"
                alt="Winland Expanded Media Island"
                className="max-w-full sm:max-w-xl h-auto rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(251,110,144,0.3)] transition-transform duration-300 hover:scale-102"
              />
            </div>
          )}

          {activeShot === 'notification' && (
            <div className="p-8 sm:p-16 flex flex-col items-center justify-center bg-black/90 w-full min-h-[380px]">
              <img
                src="/images/snipping-tool-island.png"
                alt="Winland Snipping Tool Notification"
                className="max-w-full sm:max-w-md h-auto rounded-full border border-white/20 shadow-[0_0_35px_rgba(251,110,144,0.25)]"
              />
            </div>
          )}

          {activeShot === 'widgets' && (
            <div className="p-6 sm:p-12 flex flex-col items-center justify-center bg-black/90 w-full min-h-[380px]">
              <img
                src="/images/desktop-widgets.jpg"
                alt="Winland Desktop Widgets"
                className="max-w-full sm:max-w-md h-auto rounded-2xl border border-white/20 shadow-2xl"
              />
            </div>
          )}

          {activeShot === 'taskbar' && (
            <div className="p-6 sm:p-12 flex flex-col items-center justify-center bg-black/90 w-full min-h-[380px]">
              <img
                src="/images/taskbar-dock.png"
                alt="Winland Modern Taskbar Dock"
                className="w-full max-w-4xl h-auto rounded-xl border border-white/20 shadow-[0_0_35px_rgba(251,110,144,0.25)]"
              />
            </div>
          )}
        </div>

        {/* Caption below Bezel */}
        <div className="mt-3.5 px-3 flex flex-col sm:flex-row items-center justify-between text-caption text-tertiary gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-semibold text-secondary">{screenshots[activeShot].title}:</span>
            <span>{screenshots[activeShot].desc}</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500">Uncompressed Capture</span>
        </div>

      </div>

    </section>
  );
};
