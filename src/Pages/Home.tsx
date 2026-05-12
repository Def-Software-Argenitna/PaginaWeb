import { type ReactNode, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import TypewriterHero from '../Components/TypewriterHero';

interface Product {
  name: string;
  badge: string;
  summary: string;
  idealFor: string;
  capabilities: string[];
  segment: string;
  repoUrl?: string;
  images: string[];
}

interface SalesFeature {
  title: string;
  icon: ReactNode;
  description: string;
}

interface BusinessOutcome {
  title: string;
  description: string;
}

const ProductCatalog: Product[] = [
  {
    name: 'KioskManager',
    badge: 'App movil gestionada',
    summary:
      'Aplicacion movil para iOS y Android que permite la gestion integral de tu negocio directamente desde el celular, sin depender de una PC.',
    idealFor:
      'Ideal para dueños de kioscos y minimercados que buscan gestionar el stock, las ventas y la operatoria desde la palma de su mano.',
    capabilities: [
      'Lectura de codigos de barras nativa utilizando la camara del dispositivo para cobros instantaneos.',
      'Gestion integral desde el celular: revisa stock, precios y caja desde cualquier lugar.',
      'Operacion agil en el punto de venta para reducir filas y acelerar la atencion.',
      'Control operativo para supervisar turnos, cierres diarios y usuarios en tiempo real.',
    ],
    segment: 'Retail / kioscos',
    repoUrl: 'https://github.com/Def-Software-Argenitna/KioskManager',
    images: ['/kioskmanager_mockup.png'],
  },
  {
    name: 'MeatManager',
    badge: 'Plataforma 100% Web',
    summary:
      'Plataforma web para carnicerias con foco en ventas, stock y rentabilidad, accesible desde cualquier sucursal con una sola operacion centralizada.',
    idealFor:
      'Ideal para carnicerias y despensas con venta por peso que buscan modernizarse mediante terminales tactiles e integraciones fisicas.',
    capabilities: [
      'Punto de venta web rapido para ventas por kilo o unidad.',
      'Integracion con balanzas por Serial/USB para capturar peso real sin carga manual.',
      'Control de stock de cortes, cuentas corrientes de clientes y menu digital para WhatsApp.',
      'Modo PRO con trazabilidad, analisis de rindes, costos reales y gestion de proveedores.',
    ],
    segment: 'Carnicerias / alimentos frescos',
    repoUrl: 'https://github.com/Def-Software-Argenitna/MeatManager',
    images: [
      '/meatmanager/image.png',
      '/meatmanager/2.png',
      '/meatmanager/3.png',
      '/meatmanager/4.png',
      '/meatmanager/5.png',
      '/meatmanager/6.png',
      '/meatmanager/77.png',
      '/meatmanager/8.png',
    ],
  },
];

const SalesFeatures: SalesFeature[] = [
  {
    title: 'Gestion de inventario',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    description:
      'Control de cortes y productos frescos en tiempo real con alertas de faltantes para reponer a tiempo.',
  },
  {
    title: 'POS por peso y unidad',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    description:
      'Flujo de venta agil para mostrador y caja, con registro rapido de kilos, unidades y comandas.',
  },
  {
    title: 'Gestion de cobros',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="12" y1="2" x2="12" y2="6"></line>
      </svg>
    ),
    description:
      'Configura efectivo, tarjetas, transferencias y billeteras virtuales con una operacion de cobro mas clara.',
  },
  {
    title: 'Clientes y cuentas corrientes',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
        <line x1="8" y1="20" x2="8" y2="10"></line>
      </svg>
    ),
    description:
      'Historial de compras y control de fiados para seguir saldos pendientes sin planillas externas.',
  },
  {
    title: 'Balanza y mostrador',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    description:
      'Integracion con balanzas electronicas para reducir errores manuales y mejorar la velocidad de atencion.',
  },
  {
    title: 'Rindes y rentabilidad',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    description:
      'Analiza rendimiento por animal, costos post-despostada y calidad de proveedores para cuidar margenes.',
  },
];

const BusinessOutcomes: BusinessOutcome[] = [
  {
    title: 'Operacion centralizada en la web',
    description:
      'Toda la gestion queda unificada en la plataforma web para administrar el negocio desde un unico entorno.',
  },
  {
    title: 'Mas control financiero diario',
    description:
      'Centraliza stock, fiados, caja y medios de pago para tomar decisiones con datos operativos reales.',
  },
  {
    title: 'Escalabilidad para crecer',
    description:
      'Empieza con funciones base y evoluciona a analitica PRO de rindes, costos y gestion multi-sucursal.',
  },
];

/* ── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'lbFadeIn 0.22s ease',
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes lbSlideIn { from { transform:scale(0.92); opacity:0 } to { transform:scale(1); opacity:1 } }
        .lb-img { animation: lbSlideIn 0.25s cubic-bezier(.22,1,.36,1); }
        .lb-btn:hover { background: rgba(255,255,255,0.18) !important; }
        .lb-close:hover { background: rgba(249,115,22,0.85) !important; }
        .lb-thumb-active { border: 2px solid var(--accent-color, #f97316) !important; opacity: 1 !important; }
      `}</style>

      {/* Botón cerrar */}
      <button
        className="lb-close"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{
          position: 'absolute',
          top: '1.2rem',
          right: '1.4rem',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          color: '#fff',
          fontSize: '1.4rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s',
        }}
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Imagen ampliada */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Flecha izquierda */}
          {images.length > 1 && (
            <button
              className="lb-btn"
              onClick={prev}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
              aria-label="Anterior"
            >
              ‹
            </button>
          )}

          <img
            key={current}
            className="lb-img"
            src={images[current]}
            alt={`Screenshot ${current + 1}`}
            style={{
              maxWidth: images.length > 1 ? 'calc(90vw - 120px)' : '90vw',
              maxHeight: '75vh',
              objectFit: 'contain',
              borderRadius: '10px',
              boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
            }}
          />

          {/* Flecha derecha */}
          {images.length > 1 && (
            <button
              className="lb-btn"
              onClick={next}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
              aria-label="Siguiente"
            >
              ›
            </button>
          )}
        </div>

        {/* Contador */}
        {images.length > 1 && (
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            {current + 1} / {images.length}
          </span>
        )}

        {/* Miniaturas en lightbox */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '80vw' }}>
            {images.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={`thumb ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={i === current ? 'lb-thumb-active' : ''}
                style={{
                  width: '56px',
                  height: '40px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  opacity: i === current ? 1 : 0.4,
                  border: '1px solid rgba(255,255,255,0.15)',
                  transition: 'opacity 0.2s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ProductCard ──────────────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          images={product.images}
          startIndex={selectedImg}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <article
        key={product.name}
        id={product.name.toLowerCase()}
        className="product-card glass-panel reveal"
        style={{ transitionDelay: `${index * 0.1}s` }}
      >
        <div className="product-badge">{product.badge}</div>

        <div className="product-card-header">
          <div>
            <p className="product-kicker">Producto destacado</p>
            <h3>{product.name}</h3>
          </div>
          <span className="product-chip">{product.segment}</span>
        </div>

        <p className="product-summary">{product.summary}</p>
        <p className="product-ideal">{product.idealFor}</p>

        <div className="product-capabilities">
          {product.capabilities.map((capability) => (
            <div key={capability} className="capability-pill">
              {capability}
            </div>
          ))}
        </div>

        {product.images.length > 0 && (
          <div className="product-screenshots" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Imagen principal — click abre lightbox */}
            <div
              onClick={() => setLightboxOpen(true)}
              title="Clic para ampliar"
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: '#0d0d0d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '260px',
                cursor: 'zoom-in',
                position: 'relative',
              }}
            >
              <img
                src={product.images[selectedImg]}
                alt={`Vista principal de ${product.name}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                }}
              />
              {/* Overlay hint */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.35)';
                  const icon = e.currentTarget.querySelector('.zoom-icon') as HTMLElement | null;
                  if (icon) icon.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0)';
                  const icon = e.currentTarget.querySelector('.zoom-icon') as HTMLElement | null;
                  if (icon) icon.style.opacity = '0';
                }}
              >
                <span
                  className="zoom-icon"
                  style={{
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    fontSize: '2rem',
                    color: '#fff',
                    pointerEvents: 'none',
                  }}
                >
                  🔍
                </span>
              </div>
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                  gap: '0.8rem',
                  marginTop: '0.8rem',
                }}
              >
                {product.images.map((img, i) => (
                  <div
                    key={img}
                    onClick={() => setSelectedImg(i)}
                    style={{
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: i === selectedImg
                        ? '2px solid var(--accent-color, #f97316)'
                        : '1px solid rgba(255,255,255,0.1)',
                      height: '60px',
                      background: 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      transition: 'border 0.2s',
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} screenshot ${i + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        opacity: i === selectedImg ? 1 : 0.5,
                        transition: 'opacity 0.2s',
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="product-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/contacto" className="modern-btn demo-btn">
            Quiero este software
          </Link>
          <Link to="/plataforma" className="modern-btn secondary-btn">
            Ver capacidades
          </Link>
        </div>
      </article>
    </>
  );
}

export default function Home() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section">
        <div className="hero-panel reveal">
          <TypewriterHero />
          <p
            style={{
              color: 'var(--text-dim)',
              fontSize: '1.25rem',
              maxWidth: '720px',
              margin: '1.5rem auto 3.5rem',
              lineHeight: 1.6,
            }}
          >
            Desarrollamos software comercial para negocios que necesitan vender mas,
            ordenar su operacion y tomar decisiones con informacion real. Convertimos
            procesos cotidianos en ventajas competitivas.
          </p>
          <div className="hero-actions">
            <a
              href="#software"
              className="modern-btn main-btn"
              style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}
            >
              Ver software
            </a>
            <Link
              to="/contacto"
              className="modern-btn secondary-btn"
              style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}
            >
              Solicitar asesoramiento
            </Link>
          </div>
        </div>
      </section>

      <section className="new-info-section" id="software" style={{ paddingTop: '0' }}>
        <div className="section-header reveal">
          <h2>Software que ofrecemos</h2>
          <p>
            Tomamos nuestros desarrollos reales y los convertimos en productos listos
            para resolver problemas concretos de operacion, ventas y control.
          </p>
        </div>

        <div className="product-grid">
          {ProductCatalog.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="new-info-section">
        <div className="section-header reveal">
          <h2>Capacidades que convierten operacion en crecimiento</h2>
          <p>
            No vendemos solo un sistema: entregamos herramientas para controlar mejor,
            vender con mas fluidez y escalar sin perder orden.
          </p>
        </div>
        <div className="info-grid">
          {SalesFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="info-card glass-panel reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="new-info-section" style={{ paddingTop: '0' }}>
        <div className="section-header reveal">
          <h2>Por que nuestros productos ayudan a vender mas</h2>
          <p>
            Cada solucion esta pensada para impactar en el dia a dia del negocio, no
            solo para sumar pantallas o funciones decorativas.
          </p>
        </div>
        <div className="outcomes-grid">
          {BusinessOutcomes.map((outcome, index) => (
            <div
              key={outcome.title}
              className="outcome-card glass-panel reveal"
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" id="demo">
        <div className="cta-panel reveal">
          <h2>Lleva el software correcto a tu negocio.</h2>
          <p
            style={{
              color: 'var(--text-dim)',
              fontSize: '1.2rem',
              maxWidth: '650px',
              margin: '0 auto 3rem',
            }}
          >
            Si quieres vender mejor, ordenar procesos y profesionalizar tu operacion,
            te ayudamos a elegir e implementar la solucion adecuada para tu empresa.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/contacto"
              className="modern-btn demo-btn"
              style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}
            >
              Solicitar demo comercial
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
