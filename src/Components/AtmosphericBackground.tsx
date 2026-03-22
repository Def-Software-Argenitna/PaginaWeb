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
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.6; /* Increased opacity */
          mix-blend-mode: screen;
          animation: float 25s infinite alternate ease-in-out;
        }

        .orb-1 {
          width: 70vw;
          height: 70vw;
          background: radial-gradient(circle, rgba(0, 242, 255, 0.4) 0%, transparent 70%);
          top: -20vh;
          left: -10vw;
        }

        .orb-2 {
          width: 80vw;
          height: 80vw;
          background: radial-gradient(circle, rgba(112, 0, 255, 0.3) 0%, transparent 70%);
          bottom: -30vh;
          right: -15vw;
          animation-duration: 35s;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(0, 242, 255, 0.2) 0%, transparent 70%);
          top: 50%;
          left: 60%;
          transform: translate(-50%, -50%);
          animation-duration: 20s;
          animation-delay: -3s;
        }

        .glass-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 20% 30%, transparent 0%, rgba(5, 5, 10, 0.5) 100%);
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(5%, 10%) rotate(10deg) scale(1.1); }
          100% { transform: translate(-5%, 5%) rotate(-5deg) scale(0.9); }
        }
      `}</style>
    </div>
  );
};

export default AtmosphericBackground;
