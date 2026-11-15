import React from 'react';
import { WindowsIcon } from './SocialIcons';
import { ShieldCheck, RotateCcw, Zap, Monitor } from 'lucide-react';

export const TaskbarShowcase: React.FC = () => {
  return (
    <section id="taskbar" className="py-24 px-4 max-w-6xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-caption font-mono uppercase tracking-widest text-primary mb-3 inline-block">
          Desktop Integration
        </span>
        <h2 className="font-display font-extrabold text-headline-lg tracking-tight text-secondary mb-4">
          Interactive Modern Taskbar.
        </h2>
        <p className="text-body-md text-tertiary">
          A translucent glass dock with razor-thin ambient top edge lighting. Fully reversible, zero registry tampering.
        </p>
      </div>

      {/* Taskbar Screenshot Display */}
      <div className="bg-surface border border-border-strong rounded-3xl p-6 sm:p-10 shadow-2xl mb-12">
        <div className="p-3 sm:p-6 rounded-2xl bg-black border border-white/10 shadow-[0_0_50px_rgba(251,110,144,0.25)] flex flex-col items-center">
          <img
            src="/images/taskbar-dock.png"
            alt="Winland Modern Taskbar Dock"
            className="w-full max-w-4xl h-auto rounded-xl"
          />
          <div className="mt-3 text-caption font-mono text-zinc-500 text-center">
            Actual capture: Winland Glass Taskbar with Start Orb, System Tray, and Running App Indicators
          </div>
        </div>
      </div>

      {/* Engineering Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border-subtle rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-20 text-primary flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-secondary mb-2">Zero Registry Modifications</h4>
          <p className="text-body-sm text-tertiary leading-relaxed">
            Hides the native Windows taskbar cleanly using standard Win32 window-state calls (<code className="text-primary font-mono text-xs">SW_HIDE</code>). Never patches DLLs or alters Explorer registry hives.
          </p>
        </div>

        <div className="bg-surface border border-border-subtle rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-20 text-primary flex items-center justify-center mb-4">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-secondary mb-2">Instant Fail-Safe Restoration</h4>
          <p className="text-body-sm text-tertiary leading-relaxed">
            If Winland closes, crashes, or is toggled off, the original Windows taskbar instantly restores with 100% of your pinned apps and system tray icons preserved without needing an Explorer restart.
          </p>
        </div>

        <div className="bg-surface border border-border-subtle rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-20 text-primary flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-secondary mb-2">Auto-Yield Gaming Mode</h4>
          <p className="text-body-sm text-tertiary leading-relaxed">
            Detects full-screen 3D games and maximized windows automatically, sliding the dock down to yield 100% of your screen for competitive gaming.
          </p>
        </div>
      </div>

    </section>
  );
};
