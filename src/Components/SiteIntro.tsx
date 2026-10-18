import { useLayoutEffect, useRef } from 'react';

/* Entrada al sitio, a pantalla completa. Coreografia:
   1. sobre la placa negra se abren los canales (tiras negras con rieles) desde el centro hacia afuera
   2. los cubos blancos caen y encastran (del centro a los bordes) mientras la camara se endereza;
      por los canales empieza a correr luz cian
   3. una onda de energia recorre los canales y aparece "DEF Software"
   4. la camara se zambulle en el cluster y la pantalla se abre sobre el fondo (la imagen del mismo cluster)
   Se ve en cada carga de la pagina (no al volver al Home navegando dentro del sitio); si la persona
   scrollea, toca o usa el teclado la intro se acelera, y si la pagina carga lejos del hero se saltea. */

// vive en memoria: se reinicia al recargar, pero sobrevive a la navegacion entre paginas del sitio
let playedThisLoad = false;

/* ---------- geometria: red triangular de cubos isometricos dentro de un hexagono ---------- */
const D = 168; // distancia entre centros de cubos
const S = 74; // "radio" del cubo (vertice superior a centro)
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

const VERTS = [-90, -30, 30, 90, 150, 210].map((deg) => (deg * Math.PI) / 180);
const pt = (cx: number, cy: number, r: number, a: number) =>
  `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
const hex = (cx: number, cy: number, R: number) => `M${VERTS.map((a) => pt(cx, cy, R, a)).join(' L')} Z`;

// canal de cada celda: el hexagono de la ranura + tramos que bajan desde cada vertice del cubo
const channel = (c: Cell) =>
  `${hex(c.x, c.y, CELL)} ${VERTS.map((a) => `M${pt(c.x, c.y, S - 4, a)} L${pt(c.x, c.y, CELL, a)}`).join(' ')}`;
const ALL_CHANNELS = CELLS.map(channel).join(' ');

const FACE_TOP = `M0 ${-S} L${H} ${-S / 2} L0 0 L${-H} ${-S / 2} Z`;
const FACE_LEFT = `M${-H} ${-S / 2} L0 0 L0 ${S} L${-H} ${S / 2} Z`;
const FACE_RIGHT = `M0 0 L${H} ${-S / 2} L${H} ${S / 2} L0 ${S} Z`;
const RIM = `M${-H} ${-S / 2} L0 0 L${H} ${-S / 2}`; // arista frontal de la tapa (brillo)

const rand = (i: number, n: number) => {
  const v = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
  return v - Math.floor(v);
};

// luz que corre por los canales: un tramo por celda, con velocidad, sentido y largo propios
const STREAMS = CELLS.map((c, i) => ({
  cell: c,
  duration: 1800 + rand(i, 1) * 2000,
  reverse: rand(i, 2) > 0.5,
  dash: 0.09 + rand(i, 3) * 0.08,
}));

// polvo / cubitos flotando en el fondo, en tres profundidades (determinista para no cambiar entre renders)
const DUST = Array.from({ length: 26 }, (_, i) => {
  const depth = i % 3; // 0 lejos (borroso) · 2 cerca
  return {
    left: `${(rand(i, 1) * 100).toFixed(1)}%`,
    top: `${(rand(i, 2) * 100).toFixed(1)}%`,
    size: 6 + depth * 7 + rand(i, 3) * 8,
    blur: [3.5, 1.2, 0][depth],
    opacity: [0.35, 0.55, 0.8][depth],
    drift: 18 + depth * 22,
    duration: 7 + rand(i, 4) * 5,
    rotate: (rand(i, 5) - 0.5) * 120,
    delay: -rand(i, 6) * 6,
  };
});

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
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

    // 1 · placa negra y canales que se abren desde el centro
    add(one('.intro-plate'), [{ opacity: 0 }, { opacity: 1 }], 0, 800, 'ease-out');
    add(one('.intro-reveal'), [{ transform: 'scale(0)' }, { transform: 'scale(1)' }], 150, 1500, 'cubic-bezier(0.5, 0, 0.2, 1)');
    add(one('.intro-channel-glow'), [{ opacity: 0 }, { opacity: 0.75 }], 900, 1200, 'ease-out');

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

    // luz cian corriendo por los canales (en loop; no cuenta para el final de la intro)
    q<SVGGElement>('.intro-stream').forEach((g, i) => {
      const s = STREAMS[i];
      const frames = s.reverse
        ? [{ strokeDashoffset: 0 }, { strokeDashoffset: 1 }]
        : [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }];
      [...g.children].forEach((p) =>
        loops.push(p.animate(frames, { delay: 900 + s.cell.ring * 220, duration: s.duration, iterations: Infinity })),
      );
      add(g, [{ opacity: 0 }, { opacity: 1 }], 900 + s.cell.ring * 220, 500, 'ease-out');
    });

    // 3 · onda de energia + wordmark
    add(one('.intro-channel-glow'), [{ opacity: 0.75 }, { opacity: 1, offset: 0.3 }, { opacity: 0.8 }], 2500, 1200, 'ease-out', 'forwards');
    add(one('.intro-wave'), [{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1)', opacity: 0 }], 2500, 1300, 'cubic-bezier(0.2, 0, 0.3, 1)');
    q<HTMLSpanElement>('.intro-letter').forEach((l, i) =>
      add(l, [{ opacity: 0, transform: 'translateY(70%)' }, { opacity: 1, transform: 'none' }], 2900 + i * 45, 900),
    );
    add(one('.site-intro__tag'), [{ opacity: 0, letterSpacing: '0.5em' }, { opacity: 1, letterSpacing: '0.32em' }], 3350, 1000);

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
            <path d="M0 -10 L8.7 -5 L0 0 L-8.7 -5 Z" fill="#e4e4df" />
            <path d="M-8.7 -5 L0 0 L0 10 L-8.7 5 Z" fill="#b3b4af" />
            <path d="M0 0 L8.7 -5 L8.7 5 L0 10 Z" fill="#6c6f6d" />
          </svg>
        ))}
      </div>

      <div className="site-intro__stage">
        <svg className="site-intro__scene" viewBox="-560 -620 1120 1240">
          <defs>
            <linearGradient id="ic-top" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f1f1ec" />
              <stop offset="1" stopColor="#d6d6d0" />
            </linearGradient>
            <linearGradient id="ic-left" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0" stopColor="#c9cac5" />
              <stop offset="1" stopColor="#9c9d99" />
            </linearGradient>
            <linearGradient id="ic-right" x1="1" y1="0" x2="0.7" y2="1">
              <stop offset="0" stopColor="#8a8d8a" />
              <stop offset="1" stopColor="#4e5150" />
            </linearGradient>
            {/* rieles de los canales: cian cerca del centro, gris frio hacia los bordes */}
            <radialGradient id="ic-rail" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="600">
              <stop offset="0" stopColor="#5fe9f0" />
              <stop offset="0.45" stopColor="#3a8c92" />
              <stop offset="1" stopColor="#7a8689" />
            </radialGradient>
            {/* brillo dentro de los canales: fuerte en el centro, se apaga hacia afuera */}
            <radialGradient id="ic-channel-glow" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="560">
              <stop offset="0" stopColor="#00f2fe" stopOpacity="0.6" />
              <stop offset="0.5" stopColor="#00c4cf" stopOpacity="0.16" />
              <stop offset="1" stopColor="#00f2fe" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ic-stream" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="600">
              <stop offset="0" stopColor="#e6feff" />
              <stop offset="0.5" stopColor="#5cf3fb" />
              <stop offset="1" stopColor="#3fb9c1" />
            </radialGradient>
            <radialGradient id="ic-wave" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0.7" stopColor="#00f2fe" stopOpacity="0" />
              <stop offset="0.93" stopColor="#8ffaff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#00f2fe" stopOpacity="0" />
            </radialGradient>
            <clipPath id="ic-reveal-clip">
              <circle className="intro-reveal" cx="0" cy="0" r="720" />
            </clipPath>
            <clipPath id="ic-plate-clip">
              <path d={hex(0, 0, 3 * D + CELL * 0.62)} />
            </clipPath>
          </defs>

          {/* placa base negra */}
          <path className="intro-plate" d={hex(0, 0, 3 * D + CELL * 0.62)} />

          {/* canales: tira clara + tira negra encima = dos rieles finos; adentro brillo y luz corriendo */}
          <g clipPath="url(#ic-plate-clip)">
            <g clipPath="url(#ic-reveal-clip)">
              <path className="intro-channel intro-channel--rail" d={ALL_CHANNELS} />
              <path className="intro-channel intro-channel--floor" d={ALL_CHANNELS} />
              <path className="intro-channel intro-channel-glow" d={ALL_CHANNELS} />
              {STREAMS.map((s, i) => (
                <g key={i} className="intro-stream">
                  <path
                    className="intro-stream__halo"
                    d={channel(s.cell)}
                    pathLength={1}
                    style={{ strokeDasharray: `${s.dash} ${1 - s.dash}` }}
                  />
                  <path
                    className="intro-stream__core"
                    d={channel(s.cell)}
                    pathLength={1}
                    style={{ strokeDasharray: `${s.dash} ${1 - s.dash}` }}
                  />
                </g>
              ))}
            </g>
            <circle className="intro-wave" cx="0" cy="0" r="640" fill="url(#ic-wave)" />
          </g>

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
