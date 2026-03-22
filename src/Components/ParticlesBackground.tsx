import { useCallback, useEffect, useRef } from 'react';

// Enhanced connected particles background
export default function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const particles = useRef(
    Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.0 + Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.0008,
      dy: (Math.random() - 0.5) * 0.0008,
      opacity: 0.1 + Math.random() * 0.4,
    }))
  );

  const drawConnections = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const maxDist = 150;
    particles.current.forEach((p1, i) => {
      particles.current.slice(i + 1).forEach(p2 => {
        const dx = (p1.x - p2.x) * width;
        const dy = (p1.y - p2.y) * height;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x * width, p1.y * height);
          ctx.lineTo(p2.x * width, p2.y * height);
          ctx.strokeStyle = `rgba(0, 242, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });
  };

  const animate = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections first
    drawConnections(ctx, canvas.width, canvas.height);

    for (const p of particles.current) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > 1) p.dx *= -1;
      if (p.y < 0 || p.y > 1) p.dy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(0, 242, 255, ${p.opacity})`;
      ctx.shadowColor = '#00f2ff';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animate();
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
        zIndex: -1,
        pointerEvents: 'none',
        background: '#05050a',
      }}
    />
  );
}
