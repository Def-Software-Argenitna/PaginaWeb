import { useLayoutEffect, useRef } from 'react';

/* Entrada al sitio: pantalla completa donde un cubo isometrico (como los del fondo) se dibuja
   trazo a trazo, se rellena con sus caras grises, se escribe "DEF Software" y despues la pantalla
   se abre para dejar ver el hero y la nav. Se ve en cada carga de la pagina (no al volver al Home
   navegando dentro del sitio); si la persona scrollea durante la intro se acelera, y si la pagina
   carga lejos del hero se saltea. */

// vive en memoria: se reinicia al recargar, pero sobrevive a la navegacion entre paginas del sitio
let playedThisLoad = false;

// Cubo isometrico en viewBox 200x200: contorno hexagonal + la "Y" de las aristas interiores
const OUTLINE = 'M100 20 L169 60 L169 140 L100 180 L31 140 L31 60 Z';
const EDGES = 'M31 60 L100 100 L169 60 M100 100 L100 180';
const FACES = {
  top: 'M100 20 L169 60 L100 100 L31 60 Z',
  left: 'M31 60 L100 100 L100 180 L31 140 Z',
  right: 'M100 100 L169 60 L169 140 L100 180 Z',
};

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_DRAW = 'cubic-bezier(0.65, 0, 0.35, 1)';

interface SiteIntroProps {
  /** Elementos del hero que entran cuando la pantalla de entrada se abre */
  revealSelector: string;
  onDone: () => void;
}

export default function SiteIntro({ revealSelector, onDone }: SiteIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = <T extends Element>(s: string) => [...root.querySelectorAll<T>(s)];
    const cube = q<SVGSVGElement>('.site-intro__cube')[0];
    const [outline, edges] = q<SVGPathElement>('.intro-pen');
    const faces = q<SVGPathElement>('.intro-face');
    const letters = q<HTMLSpanElement>('.intro-letter');
    const reveal = [...document.querySelectorAll<HTMLElement>(revealSelector)];
    const nav = document.querySelector<HTMLElement>('.new-modern-header');

    const anims: Animation[] = [];
    const add = (el: Element, frames: Keyframe[], delay: number, duration: number, easing = EASE_OUT) => {
      anims.push(el.animate(frames, { delay, duration, easing, fill: 'both' }));
    };

    // 1 · trazo: el contorno en un barrido largo, despues las aristas interiores
    add(outline, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], 300, 1100, EASE_DRAW);
    add(edges, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], 1150, 550, EASE_DRAW);

    // 2 · volumen: las caras se rellenan (arriba, izquierda, derecha) y el trazo queda como brillo de arista
    faces.forEach((f, i) => add(f, [{ opacity: 0 }, { opacity: 1 }], 1650 + i * 110, 650, 'ease-out'));
    [outline, edges].forEach((p) => add(p, [{ opacity: 1 }, { opacity: 0.35 }], 2000, 700, 'ease-in'));
    add(
      cube,
      [
        { filter: 'drop-shadow(0 0 0 rgba(0, 242, 254, 0))' },
        { filter: 'drop-shadow(0 0 30px rgba(0, 242, 254, 0.45))', offset: 0.45 },
        { filter: 'drop-shadow(0 18px 30px rgba(0, 0, 0, 0.5))' },
      ],
      1800,
      1200,
      'ease-out',
    );

    // 3 · "DEF Software" letra por letra
    letters.forEach((l, i) =>
      add(l, [{ opacity: 0, transform: 'translateY(60%)' }, { opacity: 1, transform: 'none' }], 2250 + i * 45, 900),
    );

    // 4 · salida: el cubo avanza hacia la camara y la pantalla se desvanece; entran hero y nav
    const EXIT = 3600;
    add(cube, [{ transform: 'none' }, { transform: 'scale(1.6)' }], EXIT, 900, 'cubic-bezier(0.7, 0, 0.84, 0)');
    add(q('.site-intro__word')[0], [{ opacity: 1 }, { opacity: 0 }], EXIT, 400, 'ease-in');
    add(root, [{ opacity: 1 }, { opacity: 0 }], EXIT + 300, 700, 'ease-in-out');
    reveal.forEach((el, i) =>
      add(el, [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }], EXIT + 500 + i * 140, 1000),
    );
    if (nav) add(nav, [{ opacity: 0, transform: 'translateY(-14px)' }, { opacity: 1, transform: 'none' }], EXIT + 800, 900);

    let done = false;
    const cleanup = () => {
      removeEventListener('wheel', hurry);
      removeEventListener('touchmove', hurry);
      removeEventListener('keydown', hurry);
      removeEventListener('scroll', offHero);
    };
    const complete = () => {
      if (done) return;
      done = true;
      cleanup();
      playedThisLoad = true;
      // la nav y el hero vuelven a su estilo natural; la pantalla de entrada se desmonta
      anims.forEach((a) => {
        const target = (a.effect as KeyframeEffect | null)?.target;
        if (target === nav || reveal.includes(target as HTMLElement)) a.cancel();
      });
      onDoneRef.current();
    };
    const finish = () => anims.forEach((a) => a.finish());
    // sin bloquear el scroll: si la persona quiere bajar, la intro se acelera
    const hurry = () => anims.forEach((a) => { if (a.playbackRate === 1) a.playbackRate = 2.4; });
    const offHero = () => { if (scrollY > innerHeight * 0.5) finish(); };

    Promise.all(anims.map((a) => a.finished)).then(complete, () => { /* cancelada al desmontar */ });

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (playedThisLoad || reduced || location.hash || scrollY > innerHeight * 0.5) {
      finish();
    } else {
      addEventListener('wheel', hurry, { once: true, passive: true });
      addEventListener('touchmove', hurry, { once: true, passive: true });
      addEventListener('keydown', hurry, { once: true, passive: true });
      addEventListener('scroll', offHero, { passive: true });
    }

    return () => {
      cleanup();
      if (!done) anims.forEach((a) => a.cancel());
    };
  }, [revealSelector]);

  return (
    <div ref={rootRef} className="site-intro" aria-hidden="true">
      <svg className="site-intro__cube" viewBox="20 10 160 180">
        <defs>
          <linearGradient id="intro-top" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8a8a8e" />
            <stop offset="1" stopColor="#6a6a6e" />
          </linearGradient>
          <linearGradient id="intro-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#56565a" />
            <stop offset="1" stopColor="#434347" />
          </linearGradient>
          <linearGradient id="intro-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#424246" />
            <stop offset="1" stopColor="#323236" />
          </linearGradient>
        </defs>
        <path className="intro-face" d={FACES.top} fill="url(#intro-top)" />
        <path className="intro-face" d={FACES.left} fill="url(#intro-left)" />
        <path className="intro-face" d={FACES.right} fill="url(#intro-right)" />
        <path className="intro-pen" d={OUTLINE} pathLength={1} />
        <path className="intro-pen" d={EDGES} pathLength={1} />
      </svg>
      <div className="site-intro__word">
        {'DEF'.split('').map((c, i) => (
          <span key={`d${i}`} className="intro-letter intro-letter--strong">{c}</span>
        ))}
        {'Software'.split('').map((c, i) => (
          <span key={`s${i}`} className="intro-letter">{c}</span>
        ))}
      </div>
    </div>
  );
}
