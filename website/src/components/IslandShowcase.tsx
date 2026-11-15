import React from 'react';
import { Music, Bell, Clipboard, Pin, Sparkles, Layers, Sliders, Shield } from 'lucide-react';

export const IslandShowcase: React.FC = () => {
  return (
    <section id="island" className="py-24 px-4 max-w-6xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-caption font-mono uppercase tracking-widest text-primary mb-3 inline-block">
          Dynamic Island
        </span>
        <h2 className="font-display font-extrabold text-headline-lg tracking-tight text-secondary mb-4">
          Hang it from the top edge.
        </h2>
        <p className="text-body-md text-tertiary">
          Your music, clipboard, notifications, and shelf right at the top of your screen. Stays discreet until you interact with it.
        </p>
      </div>

      {/* Main Expanded Island Showcase */}
      <div className="bg-surface border border-border-strong rounded-3xl p-6 sm:p-10 shadow-2xl mb-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left: Pristine Screenshot of Expanded Island */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="relative p-2 sm:p-4 rounded-2xl bg-black border border-white/10 shadow-[0_0_50px_rgba(251,110,144,0.25)]">
              <img
                src="/images/expanded-island-music.png"
                alt="Winland Expanded Media Island"
                className="w-full h-auto rounded-xl"
              />
            </div>
            <div className="mt-3 text-caption font-mono text-zinc-500 text-center">
              Actual capture: The Weeknd · "Cry For Me" (Hurry Up Tomorrow)
            </div>
          </div>

          {/* Right: Feature Breakdown */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-20 text-primary text-caption font-semibold mb-3">
                <Music className="w-3.5 h-3.5" />
                <span>Audio Engine & SMTC</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-secondary mb-2">
                Real-Time WASAPI Spectrum & Player
              </h3>
              <p className="text-body-sm text-tertiary leading-relaxed">
                Connects directly to Windows System Media Transport Controls (SMTC) for Spotify, Apple Music, YouTube Music, and Lyriic. Features seekable scrubber, circular album art, and an audio-reactive 64-band dot matrix visualizer that adapts its color gradient to the active album cover.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
              <div>
                <h4 className="font-bold text-sm text-secondary mb-1">Dot Matrix Visualizer</h4>
                <p className="text-caption text-tertiary">
                  Dynamic multi-row equalizer dots synced to system audio output.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-secondary mb-1">Productivity Tabs</h4>
                <p className="text-caption text-tertiary">
                  Pin, Notes, Clipboard History, File Shelf, and Quick Settings in one dock.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Secondary Notification Showcase */}
      <div className="bg-surface border border-border-strong rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
          
          {/* Right: Pristine Snipping Tool Pill Screenshot */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="relative p-2 sm:p-4 rounded-full bg-black border border-white/10 shadow-[0_0_35px_rgba(251,110,144,0.2)]">
              <img
                src="/images/snipping-tool-island.png"
                alt="Winland Snipping Tool Notification"
                className="w-full max-w-md h-auto rounded-full"
              />
            </div>
            <div className="mt-3 text-caption font-mono text-zinc-500 text-center">
              Actual capture: Snipping Tool Screenshot Notification HUD
            </div>
          </div>

          {/* Left: Feature Breakdown */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary text-caption font-semibold self-start">
              <Bell className="w-3.5 h-3.5 text-primary" />
              <span>Passive Notification HUD</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-secondary">
              Alerts that respect your flow.
            </h3>
            <p className="text-body-sm text-tertiary leading-relaxed">
              When Windows Snipping Tool captures a screenshot, a file downloads, or a timer finishes, the island pulses smoothly to deliver high-priority status without covering your main work window or interrupting full-screen games.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
};
