import React from 'react';

const AtmosphericBackground: React.FC = () => {
  return (
    <div className="atmospheric-container">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="glass-overlay"></div>
      <div className="noise-overlay"></div>
      
      <style>{`
        .atmospheric-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #05050a;
          overflow: hidden;
          z-index: -1;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          mix-blend-mode: screen;
          animation: float 20s infinite alternate ease-in-out;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 242, 255, 0.3) 0%, transparent 70%);
          top: -100px;
          left: -100px;
        }

        .orb-2 {
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(112, 0, 255, 0.2) 0%, transparent 70%);
          bottom: -200px;
          right: -100px;
          animation-duration: 25s;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 242, 255, 0.15) 0%, transparent 70%);
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-duration: 15s;
          animation-delay: -2s;
        }

        .glass-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(5, 5, 10, 0.4) 100%);
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(2%, 4%) scale(1.1); }
          66% { transform: translate(-3%, 2%) scale(0.95); }
          100% { transform: translate(0, 0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AtmosphericBackground;
