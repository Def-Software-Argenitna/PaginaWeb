import { useEffect, useState, type FC } from 'react';

// Mouse following atmospheric background
const AtmosphericBackground: FC = () => {
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
        {/* Paralaje con el mouse (afuera) + camara que deriva lento (adentro): el fondo nunca queda quieto */}
        <div
          className="bg-parallax"
          style={{ transform: `translate3d(${(50 - mousePos.x) * 0.16}px, ${(50 - mousePos.y) * 0.16}px, 0)` }}
        >
          <div className="bg-camera">
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
                height: '108%', // apenas mas alto que la pantalla: el cuadro entra completo (cluster + texto) y la marca "Veo" de abajo queda afuera
                objectFit: 'cover',
                objectPosition: '50% 80%', // en pantallas anchas recorta mas arriba que abajo para que el texto no se corte
                opacity: 0.5,
                zIndex: 0
              }}
            >
              <source src="/def-software-video-3.mp4" type="video/mp4" />
            </video>
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
