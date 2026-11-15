import React, { useState, useEffect } from 'react';
import { Download, Play, Pause, SkipForward, SkipBack, Pin, Music, Bell, FileText, Clipboard, Folder, Library, Sun, Settings, X, Check } from 'lucide-react';
import { GithubIcon, WindowsIcon } from './SocialIcons';

interface HeroProps {
  onOpenDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDownload }) => {
  const [stars, setStars] = useState<number>(42);
  const [islandState, setIslandState] = useState<'resting' | 'snipping' | 'expanded'>('expanded');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(33); // 0:33
  const [isSnippingClosed, setIsSnippingClosed] = useState<boolean>(false);

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

  // Timer simulation for playback
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(prev => (prev >= 224 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="pt-24 pb-16 px-4 max-w-6xl mx-auto flex flex-col items-center text-center">
      
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
        The next-generation Dynamic Island & modern taskbar for Windows. Built with hardware-accelerated DirectX composition, sub-millisecond spring dynamics, and local-only WASAPI processing.
      </p>

      {/* Primary CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
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

      {/* Monitor Display Bezel with Real Desktop Mockup */}
      <div className="w-full rounded-2xl md:rounded-[34px] border border-border-strong bg-surface p-2 sm:p-4 shadow-2xl relative overflow-hidden group">
        
        {/* Screen Bezel Inner */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl md:rounded-[26px] overflow-hidden bg-black select-none border border-white/5">
          
          {/* Wallpaper Layer */}
          <img
            src="/images/desktop-hero-wallpaper.jpg"
            alt="Winland Desktop Workspace"
            className="w-full h-full object-cover object-center filter brightness-95"
          />

          {/* Center Giant Blood Moon Day Clock */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <div className="font-display font-extrabold tracking-[0.35em] text-white/95 text-2xl sm:text-4xl md:text-5xl drop-shadow-[0_0_25px_rgba(251,110,144,0.6)]">
              SUNDAY
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-white/80 tracking-widest mt-1">
              15 NOVEMBER, 2026.
            </div>
            <div className="font-mono text-[9px] sm:text-[11px] text-white/60 tracking-wider">
              — 6:43 PM —
            </div>
          </div>

          {/* Top Center: Interactive Live Winland Island */}
          <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 z-30 transition-all duration-300">
            {islandState === 'resting' && (
              <div 
                onClick={() => setIslandState('expanded')}
                className="bg-black/95 backdrop-blur-2xl border border-white/15 px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer hover:border-primary/50 transition-all hover:scale-102"
                title="Click to expand island"
              >
                <div className="w-4 h-4 rounded-full overflow-hidden border border-white/20">
                  <img src="/images/expanded-island-music.png" alt="Cover" className="w-full h-full object-cover" />
                </div>
                <span className="text-[12px] font-semibold text-white">Cry For Me</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse delay-75" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-150" />
                </div>
              </div>
            )}

            {islandState === 'snipping' && (
              <div className="bg-black/95 backdrop-blur-2xl border border-white/15 px-4 py-2 rounded-full shadow-2xl flex items-center gap-3.5 max-w-sm transition-all">
                <div className="w-7 h-7 rounded-full bg-[#202022] flex items-center justify-center text-white">
                  <Clipboard className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-[12px] font-bold text-white leading-tight">Snipping Tool</div>
                  <div className="text-[11px] text-zinc-400 leading-tight">Screenshot copied to clipboard</div>
                </div>
                <button 
                  onClick={() => setIslandState('expanded')}
                  className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors ml-2"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {islandState === 'expanded' && (
              <div className="w-[320px] sm:w-[520px] bg-black/95 backdrop-blur-2xl border border-white/15 rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-left transition-all">
                {/* Top Tabs */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-tertiary">
                  <div className="flex items-center gap-2 sm:gap-3 text-xs">
                    <button className="p-1 hover:text-white transition-colors" title="Pin Island"><Pin className="w-3.5 h-3.5" /></button>
                    <button className="px-2 py-0.5 rounded-full bg-white/15 text-white font-semibold flex items-center gap-1" title="Music Player">
                      <Music className="w-3.5 h-3.5 text-primary" />
                    </button>
                    <button onClick={() => setIslandState('snipping')} className="p-1 hover:text-white transition-colors" title="Notifications">
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1 hover:text-white transition-colors" title="Notes"><FileText className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:text-white transition-colors" title="Clipboard"><Clipboard className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:text-white transition-colors" title="Shelf"><Folder className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:text-white transition-colors" title="Widgets"><Library className="w-3.5 h-3.5" /></button>
                    <button className="p-1 hover:text-white transition-colors" title="Display"><Sun className="w-3.5 h-3.5" /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-px h-3 bg-white/20" />
                    <button className="p-1 hover:text-white transition-colors"><Settings className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                {/* Main Media Player Row */}
                <div className="flex items-center gap-4 sm:gap-6 mb-3">
                  {/* Circular Album Artwork with Cutout Glow */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_20px_rgba(251,110,144,0.4)] flex-shrink-0">
                    <div className="w-full h-full bg-[#1a0f12] flex items-center justify-center">
                      <img 
                        src="/images/expanded-island-music.png" 
                        alt="The Weeknd Hurry Up Tomorrow" 
                        className="w-full h-full object-cover scale-150"
                      />
                    </div>
                  </div>

                  {/* Metadata & Controls */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                      Cry For Me
                    </div>
                    <div className="text-xs text-zinc-300 font-medium">The Weeknd</div>
                    <div className="text-[11px] text-zinc-500">Hurry Up Tomorrow</div>

                    {/* Scrubber */}
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mt-2">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-primary rounded-full"
                          style={{ width: `${(currentTime / 224) * 100}%` }}
                        />
                      </div>
                      <span>3:44</span>
                    </div>

                    {/* Media Buttons */}
                    <div className="flex items-center gap-3 mt-2">
                      <button className="text-zinc-400 hover:text-white transition-colors">
                        <SkipBack className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <button className="text-zinc-400 hover:text-white transition-colors">
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dot Matrix Reactive Visualizer */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between px-1">
                  <div className="flex gap-1.5 sm:gap-2">
                    {[
                      'bg-red-700', 'bg-red-600', 'bg-orange-600', 'bg-pink-600', 
                      'bg-primary', 'bg-pink-500', 'bg-purple-600', 'bg-primary-80'
                    ].map((colorClass, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <span className={`w-2 h-2 rounded-full ${colorClass} ${isPlaying ? 'animate-pulse' : 'opacity-30'}`} style={{ animationDelay: `${idx * 100}ms` }} />
                        <span className={`w-2 h-2 rounded-full ${colorClass} opacity-70`} />
                        <span className={`w-2 h-2 rounded-full ${colorClass} opacity-40`} />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">WASAPI · 64-Band</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Left Floating Desktop Widgets */}
          <div className="absolute bottom-14 left-3 sm:left-6 flex flex-col gap-2.5 max-w-[170px] sm:max-w-[210px] pointer-events-none">
            
            {/* Real Weather Widget */}
            <div className="bg-black/75 backdrop-blur-xl border border-white/10 rounded-2xl p-3 text-left shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-bold text-white">26°</span>
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 text-xs">
                  ☁
                </span>
              </div>
              <div className="text-[11px] font-medium text-zinc-200">Partly cloudy</div>
              <div className="text-[9px] text-zinc-400 mt-1 flex justify-between">
                <span>H 31° · L 21°</span>
                <span className="font-mono text-[8px] text-zinc-500">OPEN-METEO</span>
              </div>
              <div className="text-[9px] text-zinc-400">Cuttack</div>
            </div>

            {/* Real System Hardware Monitor Widget */}
            <div className="bg-black/75 backdrop-blur-xl border border-white/10 rounded-2xl p-3 text-left shadow-2xl">
              <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                <span className="text-zinc-400">CPU</span>
                <span className="text-zinc-200 font-bold">11%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="w-[11%] h-full bg-blue-400 rounded-full" />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                <span className="text-zinc-400">MEMORY</span>
                <span className="text-primary font-bold">80%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1.5">
                <div className="w-[80%] h-full bg-primary rounded-full" />
              </div>

              <div className="text-[9px] font-mono text-zinc-400 flex justify-between">
                <span>12.3 / 15.3 GB</span>
                <span>↓ 0.1 ↑ 0.0 Mb/s</span>
              </div>
              <div className="text-[9px] font-mono text-zinc-500 flex justify-between mt-1 pt-1 border-t border-white/5">
                <span>Battery 97%</span>
                <span className="text-zinc-400 font-semibold">WINLAND</span>
              </div>
            </div>

          </div>

          {/* Bottom: The Real Winland Modern Taskbar */}
          <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-12 bg-black/65 backdrop-blur-xl border-t border-primary/40 px-3 sm:px-6 flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <WindowsIcon className="w-4 h-4 text-white hover:text-primary transition-colors cursor-pointer" />
              <span className="text-zinc-400 text-sm">🔍</span>
              <span className="w-px h-3 bg-white/15" />
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[11px] text-zinc-400">📶</span>
              <span className="text-[11px] text-zinc-400">🔊</span>
              <span className="text-[11px] text-zinc-400">🔋</span>
              <div className="text-[9px] sm:text-[10px] font-mono text-zinc-300 leading-tight">
                <div>6:44 PM</div>
                <div className="text-[8px] text-zinc-500">15/11/2026</div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[11px] relative cursor-pointer">
                🦁
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
              </div>
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[11px] relative cursor-pointer">
                📁
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
              </div>
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[11px] relative cursor-pointer">
                🌐
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-white" />
              </div>
            </div>
          </div>

        </div>

        {/* Caption below Mockup */}
        <div className="mt-3 px-2 flex items-center justify-between text-caption text-tertiary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Interactive Live Simulation · Click the island at the top to toggle states</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIslandState('resting')} 
              className={`px-2 py-0.5 rounded text-[11px] ${islandState === 'resting' ? 'bg-primary-20 text-primary font-bold' : 'text-zinc-500 hover:text-white'}`}
            >
              Resting
            </button>
            <button 
              onClick={() => setIslandState('snipping')} 
              className={`px-2 py-0.5 rounded text-[11px] ${islandState === 'snipping' ? 'bg-primary-20 text-primary font-bold' : 'text-zinc-500 hover:text-white'}`}
            >
              Notification
            </button>
            <button 
              onClick={() => setIslandState('expanded')} 
              className={`px-2 py-0.5 rounded text-[11px] ${islandState === 'expanded' ? 'bg-primary-20 text-primary font-bold' : 'text-zinc-500 hover:text-white'}`}
            >
              Media Hub
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
