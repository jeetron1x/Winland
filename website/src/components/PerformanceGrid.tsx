import React from 'react';
import { Cpu, Zap, Lock, Shield, Gamepad2, Layers } from 'lucide-react';

export const PerformanceGrid: React.FC = () => {
  const specs = [
    {
      icon: <Layers className="w-5 h-5 text-primary" />,
      title: 'DirectComposition Hardware Engine',
      desc: 'Sub-millisecond spring dynamics and micro-interactions built on native Windows DirectX composition for seamless desktop responsiveness.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-primary" />,
      title: 'Native WASAPI Loopback',
      desc: 'Real-time 64-band spectrum visualizer hooks directly into Windows kernel audio streaming. Zero virtual cables, zero latency.'
    },
    {
      icon: <Gamepad2 className="w-5 h-5 text-primary" />,
      title: 'Zero Gaming FPS Impact',
      desc: 'Intelligent full-screen game detection automatically suspends background rendering when playing competitive DirectX/Vulkan titles.'
    },
    {
      icon: <Lock className="w-5 h-5 text-primary" />,
      title: '100% Offline & Private',
      desc: 'Zero telemetry, zero analytics tracking, and no cloud account required. Your clipboard, settings, and audio stay entirely on your local PC.'
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      title: 'Authenticode Certified',
      desc: 'Compiled with ReadyToRun Ahead-of-Time native machine code. Digitally certified and signed with RFC3161 timestamping by Jeetron1x.'
    },
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: 'Clean Windows Integration',
      desc: 'One-click installer creates Start Menu & Desktop shortcuts. Standard Windows Settings uninstaller removes everything cleanly.'
    }
  ];

  return (
    <section id="performance" className="py-24 px-4 max-w-6xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-caption font-mono uppercase tracking-widest text-primary mb-3 inline-block">
          System Architecture
        </span>
        <h2 className="font-display font-extrabold text-headline-lg tracking-tight text-secondary mb-4">
          Engineered for raw performance.
        </h2>
        <p className="text-body-md text-tertiary">
          No Electron bloat. Built natively for Windows 10 and 11 to run continuously with under 0.2% idle CPU usage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {specs.map((spec, idx) => (
          <div key={idx} className="bg-surface border border-border-subtle hover:border-border-strong rounded-3xl p-6 transition-all hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-primary-20 flex items-center justify-center mb-4">
              {spec.icon}
            </div>
            <h3 className="font-bold text-base text-secondary mb-2">{spec.title}</h3>
            <p className="text-body-sm text-tertiary leading-relaxed">{spec.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
};
