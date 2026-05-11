import React, { useEffect, useState } from 'react';

// Mouse following atmospheric background
const AtmosphericBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position in percentage
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="atmospheric-container">
      {/* Background Video Wrapper */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#050505'
      }}>
        {/* Video principal a pantalla completa */}
        <video
          autoPlay
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Cubre toda la pantalla sin bordes
            opacity: 0.5, 
            zIndex: 0,
            clipPath: 'inset(0 0 12% 0)' // Mantenemos el corte inferior recto para borrar VEO
          }}
        >
          <source src="/def-software-video-3.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dynamic Mouse Following Orb */}
      <div 
        className="orb mouse-orb"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.4s ease-out, top 0.4s ease-out', // More responsive smooth lag
        }}
      ></div>

      {/* Static/Floating orbs for base atmosphere */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      {/* orb-3 removed for cleaner style */}
      
      <div className="glass-overlay"></div>
      <div className="noise-overlay"></div>
    </div>
  );
};

export default AtmosphericBackground;
