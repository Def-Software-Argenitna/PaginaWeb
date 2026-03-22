import { useEffect, useState } from 'react';

const words = [
  'Software moderno para tu negocio.',
  'Control total, simple y visual.',
  'Automatización y datos en tiempo real.',
];

export default function TypewriterHero() {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      setTimeout(() => setPause(false), 1200);
      return;
    }
    const current = words[wordIdx];
    if (!deleting && charIdx < current.length) {
      setTimeout(() => setCharIdx(charIdx + 1), 60);
      setDisplayed(current.slice(0, charIdx + 1));
    } else if (!deleting && charIdx === current.length) {
      setTimeout(() => setDeleting(true), 1200);
    } else if (deleting && charIdx > 0) {
      setTimeout(() => setCharIdx(charIdx - 1), 30);
      setDisplayed(current.slice(0, charIdx - 1));
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPause(true);
      setWordIdx((wordIdx + 1) % words.length);
    }
  }, [charIdx, deleting, pause, wordIdx]);

  return (
    <h1 style={{fontSize: '2.8rem', fontWeight: 700, letterSpacing: '0.01em', minHeight: '3.5rem'}}>
      {displayed}
      <span style={{color: '#00ffe7', fontWeight: 400}}>|</span>
    </h1>
  );
}
