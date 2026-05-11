import React, { useEffect, useState } from 'react';

// Mouse following atmospheric background
const AtmosphericBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [videoEnded, setVideoEnded] = useState(false);

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
        {/* Capa de fondo desenfocada para llenar los bordes negros */}
        <video
          autoPlay
          muted
          playsInline
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(30px)',
            transform: 'scale(1.1) translateY(5%)', // Lo bajamos un poquito para que acompañe al video principal
            opacity: 0.3, // Muy sutil
            // Desvanecer suavemente la parte inferior
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 90%)',
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 90%)'
          }}
        >
          <source src="/def-software-video-2.mp4" type="video/mp4" />
        </video>

        {/* Imagen estática que se revelará cuando termine el video */}
        <img
          src="/def-software-bg-final.png"
          alt="DEF Software Final"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'scale(0.85) translateY(12%)',
            opacity: videoEnded ? 0.5 : 0, // Aparece suavemente
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 1,
            // Aplicar la misma máscara para el fade inferior
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 85%)',
            maskImage: 'linear-gradient(to bottom, black 65%, transparent 85%)'
          }}
        />

        {/* Video principal, centrado y desvanecido para ocultar las letras */}
        <video
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoEnded(true)}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'scale(0.85) translateY(12%)', // Lo bajamos un 12% para centrar el cubo y que no se corte arriba
            opacity: videoEnded ? 0 : 0.5, // Desaparece suavemente
            transition: 'opacity 1.5s ease-in-out',
            zIndex: 2,
            // Desvanecer suavemente la parte inferior para borrar las letras finales y la marca de agua
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 85%)',
            maskImage: 'linear-gradient(to bottom, black 65%, transparent 85%)'
          }}
        >
          <source src="/def-software-video-2.mp4" type="video/mp4" />
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
