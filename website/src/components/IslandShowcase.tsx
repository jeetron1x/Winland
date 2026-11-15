import React, { useState } from 'react';
import { Music, Bell, Clipboard, Pin, FileText, Folder, Sparkles, Check, Play, Pause } from 'lucide-react';

export const IslandShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'music' | 'notifications' | 'clipboard' | 'shelf'>('music');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyText = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedItem(text);
    setTimeout(() => setCopiedItem(null), 1500);
  };

  return (
    <section id="island" className="py-24 px-4 max-w-6xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-caption font-mono uppercase tracking-widest text-primary mb-3 inline-block">
          Interactive Architecture
        </span>
        <h2 className="font-display font-extrabold text-headline-lg tracking-tight text-secondary mb-4">
          Hang it from the top edge.
        </h2>
        <p className="text-body-md text-tertiary">
          Hover to peek, click to expand. Sub-millisecond spring dynamics designed natively for Windows 10 and 11.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Tab selectors */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div 
            onClick={() => setActiveTab('music')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'music'
                ? 'bg-surface border-primary/50 shadow-halo-pink'
                : 'bg-surface/50 border-border-subtle hover:border-border-strong'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Music className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base text-secondary">Audio Hub & Visualizer</h3>
              </div>
              <span className="text-caption font-mono text-primary bg-primary-20 px-2 py-0.5 rounded-full">WASAPI</span>
            </div>
            <p className="text-body-sm text-tertiary">
              Direct integration with Spotify, Apple Music, YouTube Music, and Lyriic. Real-time 64-band spectrum visualizer and dynamic album art extraction.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('notifications')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-surface border-primary/50 shadow-halo-pink'
                : 'bg-surface/50 border-border-subtle hover:border-border-strong'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base text-secondary">Live System Notifications</h3>
              </div>
              <span className="text-caption font-mono text-tertiary bg-white/10 px-2 py-0.5 rounded-full">Passive HUD</span>
            </div>
            <p className="text-body-sm text-tertiary">
              Snipping Tool captures, USB devices, battery thresholds, and app alerts surface discreetly without obstructing full-screen apps.
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('clipboard')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'clipboard'
                ? 'bg-surface border-primary/50 shadow-halo-pink'
                : 'bg-surface/50 border-border-subtle hover:border-border-strong'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Clipboard className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-base text-secondary">Smart Clipboard & Stash</h3>
              </div>
              <span className="text-caption font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full">Encrypted</span>
            </div>
            <p className="text-body-sm text-tertiary">
              Instant access to your recently copied code snippets, links, and hex codes. 100% local memory storage with zero cloud telemetry.
            </p>
          </div>
        </div>

        {/* Right: Live Interactive Card preview */}
        <div className="lg:col-span-7 bg-surface border border-border-strong rounded-3xl p-6 sm:p-8 relative min-h-[360px] flex flex-col justify-center items-center shadow-2xl">
          
          <div className="w-full flex justify-between items-center text-caption font-mono text-zinc-500 mb-6">
            <span>WINLAND_ISLAND_COMPOSITION_V1</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              120 FPS DirectComposition
            </span>
          </div>

          {activeTab === 'music' && (
            <div className="w-full max-w-lg bg-black/95 border border-white/15 rounded-3xl p-5 shadow-2xl">
              {/* Actual Island Screenshot Replica */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-zinc-400 text-xs">
                <div className="flex items-center gap-3">
                  <Pin className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="px-2.5 py-1 rounded-full bg-white/15 text-white font-semibold flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-primary" /> Music
                  </span>
                  <Bell className="w-3.5 h-3.5 hover:text-white" />
                  <FileText className="w-3.5 h-3.5 hover:text-white" />
                  <Clipboard className="w-3.5 h-3.5 hover:text-white" />
                </div>
                <span className="text-primary font-mono text-[11px]">DirectX 12</span>
              </div>

              <div className="flex items-center gap-5 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-halo-pink flex-shrink-0">
                  <img src="/images/expanded-island-music.png" alt="Cover" className="w-full h-full object-cover scale-150" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-bold text-white">Cry For Me</div>
                  <div className="text-xs text-zinc-300">The Weeknd · Hurry Up Tomorrow</div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mt-2">
                    <span>0:33</span>
                    <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[35%]" />
                    </div>
                    <span>3:44</span>
                  </div>
                </div>
              </div>

              {/* Dot visualizer rows */}
              <div className="grid grid-cols-12 gap-1.5 pt-3 border-t border-white/10">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${(i % 6) * 120}ms` }} />
                    <span className="w-2 h-2 rounded-full bg-primary-80 opacity-60" />
                    <span className="w-2 h-2 rounded-full bg-primary-20 opacity-40" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="w-full max-w-md bg-black/95 border border-white/15 rounded-full px-5 py-3 shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#202022] flex items-center justify-center text-white">
                  <Clipboard className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Snipping Tool</div>
                  <div className="text-xs text-zinc-400">Screenshot copied to clipboard</div>
                </div>
              </div>
              <span className="text-xs text-primary font-mono px-2 py-0.5 rounded-full bg-primary-20">Auto-hide</span>
            </div>
          )}

          {activeTab === 'clipboard' && (
            <div className="w-full max-w-md flex flex-col gap-2">
              {[
                'https://github.com/jeetron1x/Winland',
                'Winland-Setup.exe --silent',
                '#fb6e90 (Neon Pulse Pink)'
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => copyText(item)}
                  className="p-3 bg-surface-2 border border-border-subtle hover:border-primary/50 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="font-mono text-xs text-zinc-300 truncate max-w-[280px]">{item}</span>
                  <span className="text-caption text-primary flex items-center gap-1">
                    {copiedItem === item ? <><Check className="w-3 h-3" /> Copied</> : 'Click to copy'}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </section>
  );
};
