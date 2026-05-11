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
            transform: 'scale(1.1)', // Para evitar bordes blancos por el blur
            opacity: 0.3, // Muy sutil
          }}
        >
          <source src="/def-software-video-3.mp4" type="video/mp4" />
        </video>

        {/* Video principal, centrado y sin cortar letras */}
        <video
          autoPlay
          muted
          playsInline
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: 'scale(0.9)', // Mismo tamaño y sin desplazar hacia abajo para no cortar las letras
            opacity: 0.5, 
            zIndex: 2
          }}
        >
          <source src="/def-software-video-3.mp4" type="video/mp4" />
        </video>

        {/* Contenedor invisible que imita exactamente el tamaño del video 16:9 para posicionar el parche */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          maxWidth: 'calc(100vh * (16 / 9))',
          maxHeight: 'calc(100vw * (9 / 16))',
          margin: 'auto',
          inset: 0,
          transform: 'scale(0.9)', // Mismo scale que el video
          pointerEvents: 'none',
          zIndex: 3
        }}>
          {/* Parche "DS" anclado a la esquina inferior derecha del video REAL */}
          <div style={{
            position: 'absolute',
            bottom: '10px', 
            right: '10px', 
            width: '45px',
            height: '25px',
            backgroundColor: '#1c1e22', // Gris casi idéntico al fondo del video
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.3)', // Color sutil para que pase desapercibido
            fontFamily: 'var(--font-manrope)',
            fontWeight: '600',
            letterSpacing: '1px',
            fontSize: '0.75rem',
            border: 'none',
            boxShadow: 'none', // Sin sombra ni borde para que se funda con el video
            pointerEvents: 'auto'
          }}>
            DS
          </div>
        </div>
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
