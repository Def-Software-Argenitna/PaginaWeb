import { Link } from 'react-router-dom';
import TypewriterHero from '../Components/TypewriterHero';

const ProductCatalog = [
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
    imageUrl: '/kioskmanager_mockup.png',
  },
  {
    name: 'MeatManager',
    badge: 'Software hibrido (Local + Nube)',
    summary:
      'Sistema instalable de forma local, combinado con una potente WebApp basada en la nube que garantiza respaldos (backups) automaticos de toda tu operacion.',
    idealFor:
      'Ideal para carnicerias y despensas con venta por peso que buscan modernizarse mediante terminales tactiles e integraciones fisicas.',
    capabilities: [
      'Soporte nativo para operar mediante terminales tactiles (Point-of-Sale).',
      'Integracion fluida con balanzas electronicas para evitar ingresos manuales.',
      'Funcionamiento local estable respaldado por una WebApp en la nube con backup automatico.',
      'Control exaustivo de stock para productos frescos, cortes de carne y perecederos.',
    ],
    segment: 'Carnicerias / alimentos frescos',
    repoUrl: 'https://github.com/Def-Software-Argenitna/MeatManager-instalable',
    imageUrl: '/meatmanager_mockup.png',
  },
];

const SalesFeatures = [
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
      'Control absoluto de tu stock en multiples depositos con seguimiento de entradas, salidas y mercaderia critica.',
  },
  {
    title: 'Facturacion automatizada',
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
      'Emision de comprobantes y procesos comerciales mas ordenados para disminuir tiempos y errores administrativos.',
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
      'Multiples medios de pago y una operacion mas fluida para cobrar mejor, mas rapido y con mayor trazabilidad.',
  },
  {
    title: 'Controles de caja',
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
      'Aperturas, cierres y arqueos mas confiables para reducir desorden operativo y detectar desajustes a tiempo.',
  },
  {
    title: 'Usuarios y permisos',
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
      'Perfiles personalizados para que cada persona acceda solo a lo que necesita y la operacion quede mas protegida.',
  },
  {
    title: 'Analitica comercial',
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
      'Indicadores listos para entender que productos rotan mejor, donde se pierde margen y como tomar decisiones con mas criterio.',
  },
];

const BusinessOutcomes = [
  {
    title: 'Menos tareas manuales',
    description:
      'Unificamos venta, control y seguimiento para que el equipo trabaje mas rapido y con menos errores operativos.',
  },
  {
    title: 'Mas control del negocio',
    description:
      'Cada modulo esta pensado para darte visibilidad sobre mercaderia, caja, usuarios y movimiento comercial.',
  },
  {
    title: 'Mejor experiencia para el cliente',
    description:
      'Procesos mas agiles en el mostrador se traducen en menos espera, mejor atencion y mas ventas por turno.',
  },
];

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
            <article
              key={product.name}
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

              {product.imageUrl && (
                <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img
                    src={product.imageUrl}
                    alt={`Captura de pantalla de ${product.name}`}
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div className="product-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contacto" className="modern-btn demo-btn">
                  Quiero este software
                </Link>
                <Link to="/plataforma" className="modern-btn secondary-btn">
                  Ver capacidades
                </Link>
                {product.repoUrl && (
                  <a
                    href={product.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modern-btn"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: '8px' }}
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </article>
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
