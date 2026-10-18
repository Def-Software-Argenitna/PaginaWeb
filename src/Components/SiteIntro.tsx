import { useLayoutEffect, useRef } from 'react';

/* Entrada al sitio, a pantalla completa. Coreografia:
   1. se enciende la placa base y los circuitos cian se dibujan desde el centro hacia afuera
   2. los cubos caen y encastran en su lugar (del centro a los bordes) mientras la camara se endereza
   3. una onda de energia recorre los circuitos y aparece "DEF Software"
   4. la camara se zambulle en el cluster y la pantalla se abre sobre el fondo (el mismo cluster del video)
   Se ve en cada carga de la pagina (no al volver al Home navegando dentro del sitio); si la persona
   scrollea, toca o usa el teclado la intro se acelera, y si la pagina carga lejos del hero se saltea. */

// vive en memoria: se reinicia al recargar, pero sobrevive a la navegacion entre paginas del sitio
let playedThisLoad = false;

/* ---------- geometria: red triangular de cubos isometricos dentro de un hexagono ---------- */
const D = 168; // distancia entre centros de cubos
const S = 70; // "radio" del cubo (vertice superior a centro): deja ranuras anchas para ver los circuitos
const H = (S * Math.sqrt(3)) / 2;
const CELL = D / Math.sqrt(3); // hexagono de celda: sus bordes caen justo en las ranuras entre cubos
const RADIUS = 3; // 37 cubos

interface Cell { x: number; y: number; ring: number; angle: number }

const CELLS: Cell[] = [];
for (let q = -RADIUS; q <= RADIUS; q++) {
  for (let r = -RADIUS; r <= RADIUS; r++) {
    if (Math.abs(q + r) > RADIUS) continue;
    const x = q * D * (Math.sqrt(3) / 2);
    const y = q * (D / 2) + r * D;
    CELLS.push({ x, y, ring: Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r)), angle: Math.atan2(y, x) });
  }
}
// pintado de atras hacia adelante; caida del centro hacia afuera, en espiral
const PAINT = [...CELLS].sort((a, b) => a.y - b.y || a.x - b.x);
const DROP_ORDER = new Map([...CELLS].sort((a, b) => a.ring - b.ring || a.angle - b.angle).map((c, i) => [c, i]));

const hex = (cx: number, cy: number, R: number) =>
  `M${[-90, -30, 30, 90, 150, 210]
    .map((deg) => {
      const a = (deg * Math.PI) / 180;
      return `${(cx + R * Math.cos(a)).toFixed(1)} ${(cy + R * Math.sin(a)).toFixed(1)}`;
    })
    .join(' L')} Z`;

const FACE_TOP = `M0 ${-S} L${H} ${-S / 2} L0 0 L${-H} ${-S / 2} Z`;
const FACE_LEFT = `M${-H} ${-S / 2} L0 0 L0 ${S} L${-H} ${S / 2} Z`;
const FACE_RIGHT = `M0 0 L${H} ${-S / 2} L${H} ${S / 2} L0 ${S} Z`;
const RIM = `M${-H} ${-S / 2} L0 0 L${H} ${-S / 2}`; // arista frontal de la tapa (brillo)

// circuito de cada celda: el hexagono de la ranura + pistas que salen de cada vertice del cubo hacia la ranura
const circuit = (c: Cell) =>
  `${hex(c.x, c.y, CELL)} ${[-90, -30, 30, 90, 150, 210]
    .map((deg) => {
      const a = (deg * Math.PI) / 180;
      const p = (r: number) => `${(c.x + r * Math.cos(a)).toFixed(1)} ${(c.y + r * Math.sin(a)).toFixed(1)}`;
      return `M${p(S + 6)} L${p(CELL)}`;
    })
    .join(' ')}`;

// el brillo se concentra en el centro y se enfria hacia los bordes, como en la imagen de marca
const CORE_OPACITY = [1, 0.85, 0.6, 0.42];
const HALO_OPACITY = [0.95, 0.7, 0.42, 0.22];
const CORE_COLOR = ['#7ff9ff', '#8ff6fb', '#a8e8ec', '#c2d6d8'];

// trazos de luz que recorren algunos circuitos en loop
const PULSE_CELLS = CELLS.filter((c, i) => c.ring > 0 && i % 4 === 1);

// polvo / cubitos flotando en el fondo, en tres profundidades (determinista para no cambiar entre renders)
const DUST = Array.from({ length: 26 }, (_, i) => {
  const rnd = (n: number) => {
    const v = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  const depth = i % 3; // 0 lejos (borroso) · 2 cerca
  return {
    left: `${(rnd(1) * 100).toFixed(1)}%`,
    top: `${(rnd(2) * 100).toFixed(1)}%`,
    size: 6 + depth * 7 + rnd(3) * 8,
    blur: [3.5, 1.2, 0][depth],
    opacity: [0.35, 0.55, 0.8][depth],
    drift: 18 + depth * 22,
    duration: 7 + rnd(4) * 5,
    rotate: (rnd(5) - 0.5) * 120,
    delay: -rnd(6) * 6,
  };
});

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_DRAW = 'cubic-bezier(0.65, 0, 0.35, 1)';
const CAM = 'perspective(1600px)';

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
    const one = <T extends Element>(s: string) => root.querySelector<T>(s)!;
    const scene = one<SVGSVGElement>('.site-intro__scene');
    const reveal = [...document.querySelectorAll<HTMLElement>(revealSelector)];
    const nav = document.querySelector<HTMLElement>('.new-modern-header');

    const anims: Animation[] = [];
    const loops: Animation[] = [];
    const add = (
      el: Element,
      frames: Keyframe[],
      delay: number,
      duration: number,
      easing = EASE_OUT,
      fill: FillMode = 'both',
    ) => {
      anims.push(el.animate(frames, { delay, duration, easing, fill }));
    };

    // camara: arranca inclinada y lejos, se endereza y se acerca durante toda la intro
    add(
      scene,
      [
        { transform: `${CAM} rotateX(34deg) rotateZ(-9deg) scale(0.74) translateY(70px)` },
        { transform: `${CAM} rotateX(0deg) rotateZ(0deg) scale(1) translateY(0px)` },
      ],
      0,
      4400,
      'cubic-bezier(0.33, 0, 0.15, 1)',
    );
    add(one('.site-intro__dust'), [{ transform: 'scale(1.15)' }, { transform: 'scale(1)' }], 0, 4400, 'cubic-bezier(0.33, 0, 0.15, 1)');

    // 1 · placa base y circuitos
    add(one('.intro-plate'), [{ opacity: 0 }, { opacity: 1 }], 0, 900, 'ease-out');
    add(one('.intro-plate-glow'), [{ opacity: 0 }, { opacity: 0.55 }], 300, 1400, 'ease-out');
    q<SVGPathElement>('.intro-circuit').forEach((p) => {
      const ring = Number(p.dataset.ring);
      add(p, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], 200 + ring * 230, 750, EASE_DRAW);
    });

    // 2 · los cubos caen con peso: aceleran, golpean y asientan
    q<SVGGElement>('.intro-cube').forEach((g) => {
      const i = Number(g.dataset.order);
      add(
        g,
        [
          { transform: 'translateY(-300px)', opacity: 0, easing: 'cubic-bezier(0.55, 0, 1, 0.45)' },
          { opacity: 1, offset: 0.35 },
          { transform: 'translateY(0px)', offset: 0.7, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
          { transform: 'translateY(-7px)', offset: 0.84, easing: 'cubic-bezier(0.32, 0, 0.67, 0)' },
          { transform: 'translateY(0px)', opacity: 1 },
        ],
        650 + i * 38,
        780,
        'linear',
      );
    });

    // 3 · onda de energia del centro hacia afuera + wordmark
    q<SVGPathElement>('.intro-circuit--core').forEach((p) => {
      const ring = Number(p.dataset.ring);
      const base = CORE_OPACITY[ring];
      add(p, [{ opacity: base }, { opacity: 1, offset: 0.35 }, { opacity: base }], 2550 + ring * 130, 700, 'ease-out');
    });
    add(one('.intro-plate-glow'), [{ opacity: 0.55 }, { opacity: 1, offset: 0.3 }, { opacity: 0.7 }], 2500, 1100, 'ease-out', 'forwards');
    q<HTMLSpanElement>('.intro-letter').forEach((l, i) =>
      add(l, [{ opacity: 0, transform: 'translateY(70%)' }, { opacity: 1, transform: 'none' }], 2900 + i * 45, 900),
    );
    add(one('.site-intro__tag'), [{ opacity: 0, letterSpacing: '0.5em' }, { opacity: 1, letterSpacing: '0.32em' }], 3350, 1000);

    // trazos de luz en loop por algunos circuitos (no cuentan para el final de la intro)
    q<SVGPathElement>('.intro-pulse').forEach((p, i) => {
      loops.push(
        p.animate([{ strokeDashoffset: 1, opacity: 1 }, { strokeDashoffset: 0, opacity: 1 }], {
          delay: 1500 + i * 260,
          duration: 1600,
          iterations: Infinity,
          easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
          fill: 'backwards',
        }),
      );
    });

    // 4 · salida: la camara se zambulle, la pantalla se abre y entran hero y nav
    const EXIT = 4500;
    add(
      scene,
      [
        { transform: `${CAM} scale(1)`, opacity: 1 },
        { transform: `${CAM} scale(2.6)`, opacity: 0 },
      ],
      EXIT,
      1000,
      'cubic-bezier(0.7, 0, 0.84, 0)',
      'forwards',
    );
    add(one('.site-intro__brand'), [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(16px)' }], EXIT, 450, 'ease-in', 'forwards');
    add(root, [{ opacity: 1 }, { opacity: 0 }], EXIT + 350, 800, 'ease-in-out', 'forwards');
    reveal.forEach((el, i) =>
      add(el, [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'none' }], EXIT + 650 + i * 140, 1000),
    );
    if (nav) add(nav, [{ opacity: 0, transform: 'translateY(-14px)' }, { opacity: 1, transform: 'none' }], EXIT + 950, 900);

    let done = false;
    const cleanup = () => {
      ['wheel', 'touchmove', 'keydown', 'pointerdown'].forEach((t) => removeEventListener(t, hurry));
      removeEventListener('scroll', offHero);
    };
    const complete = () => {
      if (done) return;
      done = true;
      cleanup();
      playedThisLoad = true;
      loops.forEach((a) => a.cancel());
      // la nav y el hero vuelven a su estilo natural; la pantalla de entrada se desmonta
      anims.forEach((a) => {
        const target = (a.effect as KeyframeEffect | null)?.target;
        if (target === nav || reveal.includes(target as HTMLElement)) a.cancel();
      });
      onDoneRef.current();
    };
    const finish = () => anims.forEach((a) => a.finish());
    // sin bloquear el scroll: si la persona quiere bajar, la intro se acelera
    const hurry = () => [...anims, ...loops].forEach((a) => { if (a.playbackRate === 1) a.playbackRate = 2.4; });
    const offHero = () => { if (scrollY > innerHeight * 0.5) finish(); };

    Promise.all(anims.map((a) => a.finished)).then(complete, () => { /* cancelada al desmontar */ });

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (playedThisLoad || reduced || location.hash || scrollY > innerHeight * 0.5) {
      finish();
    } else {
      // el video del fondo termina en el mismo cluster: se deja en su ultimo cuadro para que la salida empalme
      const video = document.getElementById('bg-video') as HTMLVideoElement | null;
      if (video) {
        video.pause();
        const toEnd = () => { video.currentTime = Math.max(0, video.duration - 0.05); };
        if (video.readyState >= 1) toEnd();
        else video.addEventListener('loadedmetadata', toEnd, { once: true });
      }
      ['wheel', 'touchmove', 'keydown', 'pointerdown'].forEach((t) =>
        addEventListener(t, hurry, { once: true, passive: true }),
      );
      addEventListener('scroll', offHero, { passive: true });
    }

    return () => {
      cleanup();
      loops.forEach((a) => a.cancel());
      if (!done) anims.forEach((a) => a.cancel());
    };
  }, [revealSelector]);

  return (
    <div ref={rootRef} className="site-intro" aria-hidden="true">
      <div className="site-intro__dust">
        {DUST.map((d, i) => (
          <svg
            key={i}
            className="intro-dust"
            viewBox="-10 -12 20 24"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              opacity: d.opacity,
              filter: d.blur ? `blur(${d.blur}px)` : undefined,
              ['--drift' as string]: `${d.drift}px`,
              ['--spin' as string]: `${d.rotate}deg`,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
            }}
          >
            <path d="M0 -10 L8.7 -5 L0 0 L-8.7 -5 Z" fill="#cfd0cc" />
            <path d="M-8.7 -5 L0 0 L0 10 L-8.7 5 Z" fill="#8e908c" />
            <path d="M0 0 L8.7 -5 L8.7 5 L0 10 Z" fill="#4a4d4c" />
          </svg>
        ))}
      </div>

      <div className="site-intro__stage">
        <svg className="site-intro__scene" viewBox="-560 -620 1120 1240">
          <defs>
            <linearGradient id="ic-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e2e2dd" />
              <stop offset="1" stopColor="#b4b5b0" />
            </linearGradient>
            <linearGradient id="ic-left" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0" stopColor="#a9aaa6" />
              <stop offset="1" stopColor="#6f716e" />
            </linearGradient>
            <linearGradient id="ic-right" x1="1" y1="0" x2="0.7" y2="1">
              <stop offset="0" stopColor="#5d605e" />
              <stop offset="1" stopColor="#2f3231" />
            </linearGradient>
            <radialGradient id="ic-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#00f2fe" stopOpacity="0.55" />
              <stop offset="0.55" stopColor="#00b8c4" stopOpacity="0.18" />
              <stop offset="1" stopColor="#00f2fe" stopOpacity="0" />
            </radialGradient>
            <filter id="ic-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* placa base hexagonal */}
          <path className="intro-plate" d={hex(0, 0, 3 * D + CELL * 0.55)} />
          <circle className="intro-plate-glow" cx="0" cy="0" r={3.2 * D} fill="url(#ic-glow)" />

          {/* circuitos: halo difuso + nucleo brillante */}
          <g filter="url(#ic-blur)">
            {CELLS.map((c, i) => (
              <path
                key={i}
                className="intro-circuit intro-circuit--halo"
                data-ring={c.ring}
                d={circuit(c)}
                pathLength={1}
                style={{ opacity: HALO_OPACITY[c.ring] }}
              />
            ))}
          </g>
          {CELLS.map((c, i) => (
            <path
              key={i}
              className="intro-circuit intro-circuit--core"
              data-ring={c.ring}
              d={circuit(c)}
              pathLength={1}
              style={{ opacity: CORE_OPACITY[c.ring], stroke: CORE_COLOR[c.ring] }}
            />
          ))}
          {PULSE_CELLS.map((c, i) => (
            <path key={i} className="intro-pulse" d={hex(c.x, c.y, CELL)} pathLength={1} />
          ))}

          {/* cubos */}
          {PAINT.map((c) => (
            <g key={`${c.x},${c.y}`} transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})`}>
              <g className="intro-cube" data-order={DROP_ORDER.get(c)}>
                <path d={FACE_TOP} fill="url(#ic-top)" />
                <path d={FACE_LEFT} fill="url(#ic-left)" />
                <path d={FACE_RIGHT} fill="url(#ic-right)" />
                <path className="intro-cube__rim" d={RIM} />
                <path className="intro-cube__edge" d={hex(0, 0, S)} />
              </g>
            </g>
          ))}
        </svg>

        <div className="site-intro__brand">
          <div className="site-intro__word">
            {'DEF'.split('').map((c, i) => (
              <span key={`d${i}`} className="intro-letter intro-letter--strong">{c}</span>
            ))}
            {'Software'.split('').map((c, i) => (
              <span key={`s${i}`} className="intro-letter">{c}</span>
            ))}
          </div>
          <div className="site-intro__tag">Gestión para comercios</div>
        </div>
      </div>
    </div>
  );
}
