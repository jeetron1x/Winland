import React, { useState, useEffect } from 'react';
import { Cloud, Cpu, Activity, Battery, Move, Eye } from 'lucide-react';

export const WidgetsShowcase: React.FC = () => {
  const [cpu, setCpu] = useState(11);
  const [mem, setMem] = useState(80);
  const [timeStr, setTimeStr] = useState('6:43 PM');
  const [dayStr, setDayStr] = useState('SUNDAY');
  const [dateStr, setDateStr] = useState('15 NOVEMBER, 2026.');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      setTimeStr(`${formattedHours}:${minutes} ${ampm}`);

      const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
      setDayStr(days[now.getDay()]);
      setDateStr(`${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}.`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // CPU slight fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(10 + Math.random() * 6));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Widget 1: Real Weather Widget */}
        <div className="bg-surface border border-border-strong rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-20/20 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-caption font-mono text-primary bg-primary-20 px-2.5 py-0.5 rounded-full">
                Open-Meteo API
              </span>
              <span className="text-caption text-zinc-500">Live Forecast</span>
            </div>

            <div className="bg-black/85 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-white">26°</div>
                  <div className="text-sm font-semibold text-zinc-200 mt-1">Partly cloudy</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-zinc-200 text-xl shadow-lg">
                  ☁
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-zinc-400 mt-4 pt-3 border-t border-white/10">
                <span>H 31° · L 21°</span>
                <span className="font-mono text-[10px] text-zinc-500 tracking-wider">OPEN-METEO</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">Cuttack</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle">
            <h4 className="font-bold text-sm text-secondary mb-1">Dynamic Animated Weather</h4>
            <p className="text-caption text-tertiary">
              Automatic location sensing, precipitation radar, and high/low ranges with zero API key requirement.
            </p>
          </div>
        </div>

        {/* Widget 2: Real System Hardware Monitor */}
        <div className="bg-surface border border-border-strong rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-caption font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                DirectX Pulse
              </span>
              <span className="text-caption text-zinc-500">Hardware Telemetry</span>
            </div>

            <div className="bg-black/85 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-inner">
              {/* CPU */}
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-zinc-400 font-semibold">CPU</span>
                <span className="text-zinc-200 font-bold">{cpu}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-blue-400 rounded-full transition-all duration-500" 
                  style={{ width: `${cpu}%` }}
                />
              </div>

              {/* Memory */}
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-zinc-400 font-semibold">MEMORY</span>
                <span className="text-primary font-bold">{mem}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${mem}%` }}
                />
              </div>

              {/* Throughput */}
              <div className="text-[11px] font-mono text-zinc-400 flex justify-between pt-1">
                <span>12.3 / 15.3 GB</span>
                <span className="text-zinc-300">↓ 0.1 ↑ 0.0 Mb/s</span>
              </div>

              <div className="text-[11px] font-mono text-zinc-400 flex justify-between mt-2 pt-2 border-t border-white/10">
                <span>Battery 97%</span>
                <span className="text-primary font-bold">WINLAND</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle">
            <h4 className="font-bold text-sm text-secondary mb-1">Local Performance Monitor</h4>
            <p className="text-caption text-tertiary">
              Direct kernel polling via Win32 Performance Counters. Extremely lightweight (under 0.1% CPU).
            </p>
          </div>
        </div>

        {/* Widget 3: Real Blood Moon Day Clock */}
        <div className="bg-surface border border-border-strong rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-caption font-mono text-secondary bg-white/10 px-2.5 py-0.5 rounded-full">
                Custom Typography
              </span>
              <span className="text-caption text-zinc-500">Day & Date</span>
            </div>

            <div className="bg-black/85 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 text-center flex flex-col items-center justify-center min-h-[170px]">
              <div className="font-display font-extrabold tracking-[0.25em] text-white text-2xl drop-shadow-[0_0_15px_rgba(251,110,144,0.5)]">
                {dayStr}
              </div>
              <div className="font-mono text-xs text-zinc-300 tracking-wider mt-2">
                {dateStr}
              </div>
              <div className="font-mono text-xs text-primary font-bold tracking-widest mt-1">
                — {timeStr} —
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle">
            <h4 className="font-bold text-sm text-secondary mb-1">Minimalist Wall Clock</h4>
            <p className="text-caption text-tertiary">
              Full RGB color wheel customization, resizable typography scale, and seamless wallpaper blending.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
