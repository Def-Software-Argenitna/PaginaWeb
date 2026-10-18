import { useLayoutEffect, useRef } from 'react';

/* Intro del hero: el cubo se dibuja trazo a trazo, se rellena, se escribe "DEF Software"
   y recien ahi entran el resto del hero y la nav. Se ve una vez por sesion; si la persona
   scrollea durante la intro se acelera, y si ya esta lejos del hero se completa al instante. */

const SEEN_KEY = 'def-intro-seen';

// Cubo vectorizado de public/icono.png (viewBox 1024): contorno exterior + las tres caras
const OUTER = 'M517 38 L930 272 L930 752 L517 990 L105 752 L105 272 Z';
const FACES = [
  'M220 297 L378 205 L517 283 L657 205 L812 297 L517 467 Z',
  'M180 363 L474 533 L477 878 L317 786 L317 637 L180 557 Z',
  'M854 363 L554 533 L554 878 L718 786 L718 637 L854 557 Z',
];

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

interface HeroIntroProps {
  /** Elementos del hero que entran al final (texto, botones) */
  revealSelector: string;
  onDone: () => void;
}

export default function HeroIntro({ revealSelector, onDone }: HeroIntroProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const word = wordRef.current;
    if (!svg || !word) return;

    const q = <T extends Element>(s: string, root: ParentNode = svg) => [...root.querySelectorAll<T>(s)];
    const pens = q<SVGPathElement>('.intro-pen');
    const body = q<SVGPathElement>('.intro-body')[0];
    const faces = q<SVGPathElement>('.intro-face');
    const letters = q<HTMLSpanElement>('.intro-letter', word);
    const reveal = [...document.querySelectorAll<HTMLElement>(revealSelector)];
    const nav = document.querySelector<HTMLElement>('.new-modern-header');

    const anims: Animation[] = [];
    const add = (el: Element, frames: Keyframe[], delay: number, duration: number, easing = EASE_OUT) => {
      anims.push(el.animate(frames, { delay, duration, easing, fill: 'both' }));
    };

    // [inicio, duracion] en ms: el contorno en un barrido largo, despues cada cara
    const plan: [number, number][] = [[0, 1100], [850, 420], [1050, 420], [1250, 420]];
    plan.forEach(([t, d], i) => {
      add(pens[i], [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], 350 + t, d, 'cubic-bezier(0.65, 0, 0.35, 1)');
    });

    // relleno: el cuerpo se asienta y las caras se iluminan; el trazo queda tenue como borde
    add(body, [{ opacity: 0 }, { opacity: 1 }], 1900, 500, 'ease-out');
    faces.forEach((f, i) => add(f, [{ opacity: 0 }, { opacity: 1 }], 2000 + i * 90, 600, 'ease-out'));
    pens.forEach((p) => add(p, [{ opacity: 1 }, { opacity: 0.4 }], 2300, 600, 'ease-in'));
    add(
      svg,
      [
        { filter: 'drop-shadow(0 0 0 rgba(0, 242, 254, 0))' },
        { filter: 'drop-shadow(0 0 28px rgba(0, 242, 254, 0.55))', offset: 0.45 },
        { filter: 'drop-shadow(0 0 12px rgba(0, 242, 254, 0.3))' },
      ],
      2100,
      1100,
      'ease-out',
    );

    // "DEF Software" letra por letra
    letters.forEach((l, i) =>
      add(l, [{ opacity: 0, transform: 'translateY(60%)' }, { opacity: 1, transform: 'none' }], 2500 + i * 45, 900),
    );

    // resto del hero y nav
    reveal.forEach((el, i) =>
      add(el, [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }], 3300 + i * 140, 1000),
    );
    if (nav) add(nav, [{ opacity: 0, transform: 'translateY(-14px)' }, { opacity: 1, transform: 'none' }], 3700, 900);

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
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* sin storage: se repite la intro */ }
      // la nav y el hero vuelven a su estilo natural; el logo queda con su estado final
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

    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* sin storage */ }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced || location.hash || scrollY > innerHeight * 0.5) {
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
    <div className="hero-intro">
      <svg ref={svgRef} className="hero-intro__logo" viewBox="60 0 914 1030" role="img" aria-label="Def Software">
        <defs>
          <linearGradient id="intro-face-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#00f2fe" />
          </linearGradient>
        </defs>
        <path className="intro-body" d={`${OUTER} ${FACES.join(' ')}`} fillRule="evenodd" />
        {FACES.map((d) => (
          <path key={d} className="intro-face" d={d} />
        ))}
        {[OUTER, ...FACES].map((d) => (
          <path key={d} className="intro-pen" d={d} pathLength={1} />
        ))}
      </svg>
      <div ref={wordRef} className="hero-intro__word" aria-hidden="true">
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
