import React from 'react';
import { Cloud, Cpu, Activity, Clock, ShieldCheck } from 'lucide-react';

export const WidgetsShowcase: React.FC = () => {
  return (
    <section id="widgets" className="py-24 px-4 max-w-6xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-caption font-mono uppercase tracking-widest text-primary mb-3 inline-block">
          Desktop Canvas
        </span>
        <h2 className="font-display font-extrabold text-headline-lg tracking-tight text-secondary mb-4">
          Widgets that live on your glass.
        </h2>
        <p className="text-body-md text-tertiary">
          Draggable, modular, and native. Pull any live widget onto your desktop with zero background telemetry or frame drops.
        </p>
      </div>

      <div className="bg-surface border border-border-strong rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          {/* Left: Pristine Close-Up Screenshot of Both Widgets */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className="relative p-3 rounded-2xl bg-black border border-white/10 shadow-[0_0_40px_rgba(251,110,144,0.2)]">
              <img
                src="/images/desktop-widgets.jpg"
                alt="Winland Weather and Hardware Widgets"
                className="w-full max-w-md h-auto rounded-xl"
              />
            </div>
            <div className="mt-3 text-caption font-mono text-zinc-500 text-center">
              Actual capture: Live Weather & Hardware Telemetry Widgets
            </div>
          </div>

          {/* Right: Technical Details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            
            {/* Weather */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-border-subtle">
              <div className="flex items-center gap-2.5 mb-2">
                <Cloud className="w-4 h-4 text-primary" />
                <h4 className="font-bold text-base text-secondary">Live Weather Radar</h4>
                <span className="text-caption font-mono text-zinc-500 ml-auto">OPEN-METEO</span>
              </div>
              <p className="text-body-sm text-tertiary leading-relaxed">
                Real-time temperature, condition indicators, high/low ranges, and precipitation forecasts. Uses frosted glass material with subtle ambient bokeh circles.
              </p>
            </div>

            {/* Hardware Telemetry */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-border-subtle">
              <div className="flex items-center gap-2.5 mb-2">
                <Cpu className="w-4 h-4 text-primary" />
                <h4 className="font-bold text-base text-secondary">Hardware Monitor & Throughput</h4>
                <span className="text-caption font-mono text-emerald-400 ml-auto">Direct Kernel</span>
              </div>
              <p className="text-body-sm text-tertiary leading-relaxed">
                Direct Win32 performance counters track live CPU utilization percentage, DDR4/DDR5 memory allocation (12.3 / 15.3 GB), network throughput (Mb/s), and battery percentage with under 0.1% CPU overhead.
              </p>
            </div>

            {/* Clock */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-border-subtle">
              <div className="flex items-center gap-2.5 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <h4 className="font-bold text-base text-secondary">Minimalist Typography Day Clock</h4>
              </div>
              <p className="text-body-sm text-tertiary leading-relaxed">
                Wide-spaced day, date, and time clock with full RGB color wheel customization to match any desktop wallpaper.
              </p>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
