import React, { useRef, useEffect } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      
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
      targetPointer.x = e.clientX;
      targetPointer.y = e.clientY;
      hasEntered = true;
    };

    const onMouseLeave = (e: MouseEvent) => {
      // Pointer left browser window
      if (!e.relatedTarget && !e.toElement) {
        hasEntered = false;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      isTouch = true;
      hasEntered = true;
      if (e.touches[0]) {
        targetPointer.x = e.touches[0].clientX;
        targetPointer.y = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        targetPointer.x = e.touches[0].clientX;
        targetPointer.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Before pointer has entered: drift on slow Lissajous so cloak breathes on its own
      // On touch: keep that drift permanently
      if (!hasEntered || isTouch) {
        const t = performance.now() * 0.001;
        const driftX = w * 0.5 + Math.sin(t * 0.8) * (w * 0.32);
        const driftY = h * 0.5 + Math.sin(t * 1.3) * (h * 0.24);

        if (!hasEntered) {
          targetPointer.x = driftX;
          targetPointer.y = driftY;
        } else if (isTouch) {
          targetPointer.x = targetPointer.x * 0.94 + driftX * 0.06;
          targetPointer.y = targetPointer.y * 0.94 + driftY * 0.06;
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

        // if d < R: push particle directly away from pointer by f along normal
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
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
