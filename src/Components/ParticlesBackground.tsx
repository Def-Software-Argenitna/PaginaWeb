import { useCallback, useEffect, useRef } from 'react';

// Simple animated particles background (canvas)
export default function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const particles = useRef(
    Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.5 + Math.random() * 2.5,
      dx: (Math.random() - 0.5) * 0.0015,
      dy: (Math.random() - 0.5) * 0.0015,
      opacity: 0.3 + Math.random() * 0.7,
    }))
  );

  const animate = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles.current) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > 1) p.dx *= -1;
      if (p.y < 0 || p.y > 1) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animate();
    // Resize canvas on window resize
    const resize = () => {
      if (ref.current) {
        ref.current.width = window.innerWidth;
        ref.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [animate]);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}
