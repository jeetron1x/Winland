import React, { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface Particle {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export const ParticleCloak: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let animId: number;

    const targetPointer = { x: 0, y: 0 };
    const easedPointer = { x: 0, y: 0 };
    let hasEntered = false;
    let isTouch = false;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Grid step: max(9, min(w, h) / 22) px
      const step = Math.max(9, Math.min(w, h) / 22);
      particles = [];

      for (let x = step * 0.5; x < w; x += step) {
        for (let y = step * 0.5; y < h; y += step) {
          particles.push({
            homeX: x,
            homeY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            r: 1 + Math.random() * 1.6, // 1–2.6px
          });
        }
      }

      if (!hasEntered) {
        targetPointer.x = w * 0.5;
        targetPointer.y = h * 0.5;
        easedPointer.x = w * 0.5;
        easedPointer.y = h * 0.5;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetPointer.x = e.clientX - rect.left;
      targetPointer.y = e.clientY - rect.top;
      hasEntered = true;
    };

    const onMouseLeave = () => {
      hasEntered = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      isTouch = true;
      hasEntered = true;
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        targetPointer.x = e.touches[0].clientX - rect.left;
        targetPointer.y = e.touches[0].clientY - rect.top;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        targetPointer.x = e.touches[0].clientX - rect.left;
        targetPointer.y = e.touches[0].clientY - rect.top;
      }
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Before pointer has entered (or permanent drift on touch): slow Lissajous
      if (!hasEntered || isTouch) {
        const t = performance.now() * 0.001;
        const driftX = w * 0.5 + Math.sin(t * 0.8) * (w * 0.3);
        const driftY = h * 0.5 + Math.sin(t * 1.3) * (h * 0.22);

        if (!hasEntered) {
          targetPointer.x = driftX;
          targetPointer.y = driftY;
        } else if (isTouch) {
          targetPointer.x = targetPointer.x * 0.95 + driftX * 0.05;
          targetPointer.y = targetPointer.y * 0.95 + driftY * 0.05;
        }
      }

      // Lerp eased pointer at 0.16
      easedPointer.x += (targetPointer.x - easedPointer.x) * 0.16;
      easedPointer.y += (targetPointer.y - easedPointer.y) * 0.16;

      ctx.clearRect(0, 0, w, h);

      const R = 0.34 * Math.min(w, h);
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // d = distance from eased pointer
        const dx = p.x - easedPointer.x;
        const dy = p.y - easedPointer.y;
        const d = Math.sqrt(dx * dx + dy * dy);

        // if d < R: push particle directly away from pointer along its own normal
        if (d < R) {
          const f = Math.pow(1 - d / R, 2) * 3.4;
          const dist = d || 0.001;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // always pull it home: v += (home - pos) * 0.024
        p.vx += (p.homeX - p.x) * 0.024;
        p.vy += (p.homeY - p.y) * 0.024;

        // damp: v *= 0.86
        p.vx *= 0.86;
        p.vy *= 0.86;

        // integrate: pos += v
        p.x += p.vx;
        p.y += p.vy;

        // FADE BY DISPLACEMENT: alpha = max(0, 0.72 - distanceFromHome / 70)
        const dHomeX = p.x - p.homeX;
        const dHomeY = p.y - p.homeY;
        const distHome = Math.sqrt(dHomeX * dHomeX + dHomeY * dHomeY);
        const alpha = Math.max(0, 0.72 - distHome / 70);

        if (alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-caption font-mono uppercase tracking-widest text-primary mb-2 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Canvas Cloak</span>
        </span>
        <h2 className="font-display font-bold text-headline-sm text-secondary">
          Hover to part the veil.
        </h2>
        <p className="text-body-sm text-tertiary mt-2">
          Move your cursor over the particle grid below. It parts organically under pointer pressure and knits itself back together with spring dynamics.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] bg-black border border-border-strong rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center select-none"
      >
        {/* UNDERNEATH: Plate of content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none z-10">
          <h2 className="font-display font-extrabold text-headline-lg tracking-tight bg-gradient-to-r from-white via-primary to-primary-80 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(251,110,144,0.4)]">
            WINLAND
          </h2>
          <p className="font-mono text-caption text-zinc-400 tracking-[0.2em] uppercase mt-4 max-w-xl">
            Sub-millisecond Spring Dynamics · DirectX 12 Hardware Accelerated · By Jeetron1x
          </p>
        </div>

        {/* THE CLOAK: Canvas 2D over normal DOM */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-20 cursor-crosshair"
        />

        {/* Bottom instruction hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-[11px] font-mono text-zinc-600 tracking-wider">
          MOVE CURSOR TO DISPLACE CLOTH
        </div>
      </div>

    </section>
  );
};
