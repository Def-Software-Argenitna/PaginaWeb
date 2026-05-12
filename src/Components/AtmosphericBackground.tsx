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

  useEffect(() => {
    const handleReplay = () => {
      const video = document.getElementById('bg-video') as HTMLVideoElement;
      if (video) {
        video.currentTime = 0;
        video.play();
      }
    };

    window.addEventListener('replay-background-video', handleReplay);
    return () => window.removeEventListener('replay-background-video', handleReplay);
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
        overflow: 'hidden',
        background: '#050505'
      }}>
        {/* Video principal a pantalla completa */}
        <video
          id="bg-video"
          autoPlay
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '115%', // Lo hacemos más alto para empujar la franja inferior (el VEO) fuera de la pantalla visible
            objectFit: 'cover', 
            opacity: 0.5, 
            zIndex: 0
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
