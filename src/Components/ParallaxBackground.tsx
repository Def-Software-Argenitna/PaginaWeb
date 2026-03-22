import React, { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      if (ref.current) {
        (ref.current as HTMLDivElement).style.backgroundPosition = `${50 + x}% ${50 + y}%`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, #232526 0%, #181a1b 100%)',
        transition: 'background-position 0.2s',
      }}
    />
  );
}
