import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TopBanner } from './components/TopBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IslandShowcase } from './components/IslandShowcase';
import { WidgetsShowcase } from './components/WidgetsShowcase';
import { TaskbarShowcase } from './components/TaskbarShowcase';
import { PerformanceGrid } from './components/PerformanceGrid';
import { FaqAccordion } from './components/FaqAccordion';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Smooth scroll with Lenis
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral text-secondary font-sans selection:bg-primary-20 selection:text-primary-80 flex flex-col relative">
      {/* Subtle Noise Texture */}
      <div className="noise-overlay" />

      {/* 0. Top Announcement Banner */}
      <TopBanner onOpenDownload={() => setIsDownloadOpen(true)} />

      {/* 1. Glass Navbar */}
      <Navbar onOpenDownload={() => setIsDownloadOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero with Real Desktop & Interactive Island */}
        <Hero onOpenDownload={() => setIsDownloadOpen(true)} />

        {/* 3. Dynamic Island Showcase */}
        <IslandShowcase />

        {/* 4. Desktop Widgets Showcase */}
        <WidgetsShowcase />

        {/* 5. Modern Taskbar Showcase */}
        <TaskbarShowcase />

        {/* 6. Architecture & Performance Specs */}
        <PerformanceGrid />

        {/* 7. Common FAQs */}
        <FaqAccordion />

        {/* 8. Conversion CTAs */}
        <FinalCta onOpenDownload={() => setIsDownloadOpen(true)} />
      </main>

      {/* 9. Minimalist Footer */}
      <Footer />

      {/* 10. Direct Download Modal */}
      <DownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
    </div>
  );
};
