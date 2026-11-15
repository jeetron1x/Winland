import React, { useState } from 'react';
import { WindowsIcon } from './SocialIcons';
import { ShieldCheck, Monitor, Zap, RotateCcw } from 'lucide-react';

export const TaskbarShowcase: React.FC = () => {
  const [isTaskbarHidden, setIsTaskbarHidden] = useState(false);

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
          A translucent glass dock with razor-thin ambient top edge lighting. Completely safe, reversible, and zero registry tampering.
        </p>
      </div>

      {/* Taskbar Interactive Bezel */}
      <div className="bg-surface border border-border-strong rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
        
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-label-md font-bold text-secondary">Interactive Dock Demo</span>
          </div>
          <button
            onClick={() => setIsTaskbarHidden(!isTaskbarHidden)}
            className="px-4 py-1.5 rounded-full bg-surface-2 border border-border-strong hover:border-white/30 text-secondary text-caption font-semibold transition-colors"
          >
            {isTaskbarHidden ? 'Show Dock' : 'Simulate Auto-Hide (Full-Screen App)'}
          </button>
        </div>

        {/* Taskbar Component Mockup */}
        <div className="relative w-full h-32 rounded-2xl bg-black border border-white/10 overflow-hidden flex flex-col justify-end p-2 sm:p-4">
          
          {/* Subtle Ambient Wallpaper Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-950/30 via-transparent to-transparent pointer-events-none" />

          {/* Actual Winland Taskbar from Screenshot 4 */}
          <div 
            className={`w-full h-12 bg-black/80 backdrop-blur-2xl border-t border-primary/50 px-4 sm:px-6 rounded-xl flex items-center justify-between text-white text-xs shadow-2xl transition-all duration-300 ${
              isTaskbarHidden ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            {/* Left: Start & Search */}
            <div className="flex items-center gap-3">
              <WindowsIcon className="w-4 h-4 text-white hover:text-primary transition-colors cursor-pointer" />
              <span className="text-zinc-400 text-sm cursor-pointer">🔍</span>
              <span className="w-px h-3 bg-white/20" />
            </div>

            {/* Center: System Tray */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-zinc-400 text-[11px]">📶</span>
              <span className="text-zinc-400 text-[11px]">🔊</span>
              <span className="text-zinc-400 text-[11px]">🔋</span>
              <div className="text-[10px] font-mono text-zinc-300 leading-tight">
                <div>6:44 PM</div>
                <div className="text-[8px] text-zinc-500">15/11/2026</div>
              </div>
            </div>

            {/* Right: Pinned & Running Apps */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs relative cursor-pointer hover:bg-white/20 transition-colors">
                🦁
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs relative cursor-pointer hover:bg-white/20 transition-colors">
                📁
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs relative cursor-pointer hover:bg-white/20 transition-colors">
                🌐
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs relative cursor-pointer hover:bg-white/20 transition-colors">
                💬
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Safety & Engineering Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-border-subtle rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-20 text-primary flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-secondary mb-2">Zero Registry Modifications</h4>
          <p className="text-body-sm text-tertiary">
            Hides the native Windows taskbar cleanly using Win32 API calls (<code className="text-primary font-mono text-xs">SW_HIDE</code>). Never touches system files, DLLs, or Explorer registry hives.
          </p>
        </div>

        <div className="bg-surface border border-border-subtle rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-20 text-primary flex items-center justify-center mb-4">
            <RotateCcw className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-secondary mb-2">Instant Fail-Safe Restoration</h4>
          <p className="text-body-sm text-tertiary">
            If Winland closes, crashes, or is toggled off, the original Windows taskbar instantly restores with 100% icon state and pinned apps preserved without requiring an Explorer reboot.
          </p>
        </div>

        <div className="bg-surface border border-border-subtle rounded-2xl p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-20 text-primary flex items-center justify-center mb-4">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-secondary mb-2">Auto-Yield Gaming Mode</h4>
          <p className="text-body-sm text-tertiary">
            Detects full-screen 3D games and maximized windows automatically, sliding the dock down to yield 100% display real estate for immersive gameplay.
          </p>
        </div>
      </div>

    </section>
  );
};
