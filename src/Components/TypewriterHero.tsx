import { useEffect, useState } from 'react';

const words = [
  'Gestión inteligente para tu comercio',
  'Control de ventas e inventario',
  'Facturación automatizada',
  'Lleva tu negocio al siguiente nivel',
];

export default function TypewriterHero() {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const timer = setTimeout(() => setPause(false), 2000);
      return () => clearTimeout(timer);
    }
    const current = words[wordIdx];
    const typingSpeed = deleting ? 40 : 80;

    if (!deleting && charIdx < current.length) {
      const timer = setTimeout(() => {
        setCharIdx(charIdx + 1);
        setDisplayed(current.slice(0, charIdx + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (!deleting && charIdx === current.length) {
      setPause(true);
      setDeleting(true);
    } else if (deleting && charIdx > 0) {
      const timer = setTimeout(() => {
        setCharIdx(charIdx - 1);
        setDisplayed(current.slice(0, charIdx - 1));
      }, typingSpeed / 2);
      return () => clearTimeout(timer);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((wordIdx + 1) % words.length);
    }
  }, [charIdx, deleting, pause, wordIdx]);

  return (
    <div className="typewriter-container" style={{ minHeight: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ 
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
        fontWeight: 700, 
        lineHeight: 1.1,
        letterSpacing: '-1px',
        margin: '0 auto',
        maxWidth: '900px',
        color: '#ffffff',
        display: 'inline'
      }}>
        {displayed}
        <span style={{ 
          color: 'var(--accent-cyan)', 
          fontWeight: 400, 
          animation: 'blink 1s step-end infinite',
          marginLeft: '4px'
        }}>|</span>
      </h1>
      <style>{`
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
