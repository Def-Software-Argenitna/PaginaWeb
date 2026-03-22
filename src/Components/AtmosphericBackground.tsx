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
      {/* Dynamic Mouse Following Orb */}
      <div 
        className="orb mouse-orb"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.8s cubic-bezier(0.1, 0.4, 0.2, 1), top 0.8s cubic-bezier(0.1, 0.4, 0.2, 1)', // Smooth lag
        }}
      ></div>

      {/* Static/Floating orbs for base atmosphere */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      
      <div className="glass-overlay"></div>
      <div className="noise-overlay"></div>
    </div>
  );
};

export default AtmosphericBackground;
