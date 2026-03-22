import './Css/App.css';
import './Css/Modern.css';
import ContactForm from './Components/ContactForm';
import TypewriterHero from './Components/TypewriterHero';
import ParallaxBackground from './Components/ParallaxBackground';
import Logo from './Imagenes/fondo-final.png';

const benefits = [
  'Control de stock por productos, lotes, bandejas o categorías.',
  'Precios, listas y promociones actualizadas en segundos.',
  'Ventas en mostrador con tickets, caja y reportes diarios.',
  'Indicadores claros para comprar mejor y reducir merma.',
];

const modules = [
  {
    description:
      'Seguimiento de ingresos, producción, fraccionamiento, vencimientos y movimientos por sucursal.',
  },
  {
    title: 'Ventas y caja',
    description:
      'Punto de venta ágil, control de caja, múltiples medios de pago y comprobantes listos para emitir.',
  },
  {
    title: 'Compras y proveedores',
    description:
      'Reposición inteligente, costos por producto y comparativa de proveedores para sostener margen.',
  },
  {
    title: 'Reportes gerenciales',
    description:
      'Rentabilidad, productos más vendidos, merma, rendimiento y tablero con datos para decidir rápido.',
  },
];

const sectors = [
  'Comercios de alimentos',
  'Minoristas',
  'Locales con productos frescos',
  'Supermercados pequeños',
  'Tiendas especializadas',
  'Locales con una o varias sucursales',
];

const steps = [
  'Relevamos tu operación y definimos el circuito comercial.',
  'Configuramos artículos, precios, usuarios y reportes.',
  'Capacitamos al equipo y acompañamos la puesta en marcha.',
];

const plans = [
  {
    title: 'Demo guiada',
    description:
      'Presentacion comercial y funcional para evaluar el circuito de ventas, stock, caja y reportes segun tu tipo de negocio.',
    badge: 'Primer paso',
    features: ['Relevamiento inicial', 'Demo personalizada', 'Definicion de alcance'],
  },
  {
    title: 'Licencia definitiva',
    description:
      'Implementacion del sistema instalable con configuracion, puesta en marcha y acceso a la base centralizada.',
    badge: 'Mas elegido',
    features: ['Instalacion rapida', 'Compra simple', 'Capacitacion operativa'],
  },
  {
    title: 'Acompanamiento continuo',
    description:
      'Soporte, ajustes, crecimiento por sucursales y evolucion del sistema a medida del negocio.',
    badge: 'Escalable',
    features: ['Soporte postventa', 'Escala por sucursal', 'Actualizaciones y mejoras'],
  },
];


function App() {

  return (
    <div className="page-shell">
      <ParallaxBackground />
      <header className="main-header">
        <div className="header-content">
          <img src={Logo} alt="Def Software" className="header-logo" />
          <span className="header-title">DEF Software</span>
        </div>
      </header>
      <section className="hero-section modern-bg">
        <div className="hero-content modern-hero">
          <div className="hero-copy modern-copy">
            <div className="eyebrow">Soluciones tecnológicas para comercios</div>
            <TypewriterHero />
            <div className="hero-actions">
              <a href="#contacto" className="primary-action modern-btn">
                Solicitar una demo
              </a>
              <a href="#planes" className="secondary-action modern-btn">
                Ver opciones de adquisición
              </a>
            </div>
            <div className="hero-metrics">
              <article>
                <strong>Instalable</strong>
                <span>sin hardware complejo</span>
              </article>
              <article>
                <strong>Centralizado</strong>
                <span>con backup automático</span>
              </article>
              <article>
                <strong>Escalable</strong>
                <span>para uno o varios puntos de venta</span>
              </article>
            </div>
          </div>
          <div className="hero-form-panel" id="contacto">
            <ContactForm />
          </div>
        </div>
      </section>

      <main className="content-grid">
        <section className="info-section highlight-section">
          <div>
            <span className="section-tag">Que resuelve</span>
            <h2>Una operacion ordenada, vendible y facil de implementar.</h2>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit) => (
              <article key={benefit} className="benefit-card">
                <span className="benefit-index">•</span>
                <p>{benefit}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section" id="modulos">
          <div className="section-heading">
            <span className="section-tag">Modulos</span>
            <h2>Herramientas pensadas para el ritmo real del negocio.</h2>
            <p>
              No es un sistema generico: prioriza control operativo, reposicion, precios, caja y trazabilidad.
            </p>
          </div>
          <div className="modules-grid">
            {modules.map((module) => (
              <article key={module.title} className="module-card">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section architecture-strip">
          <div>
            <span className="section-tag">Infraestructura</span>
            <h2>Software instalable con base centralizada y backup automatico.</h2>
          </div>
          <p>
            El sistema se instala rapidamente en equipos de trabajo sin requerimientos altos de hardware.
            La informacion se mantiene en un servidor centralizado, lo que facilita la administracion,
            protege la operacion y asegura respaldos automaticos de la base de datos.
          </p>
        </section>

        <section className="info-section" id="planes">
          <div className="section-heading">
            <span className="section-tag">Planes y adquisicion</span>
            <h2>Una demo para evaluar. Una compra simple para implementar.</h2>
            <p>
              Armamos esta seccion como base comercial para que luego afinemos precios, alcances y
              condiciones segun tu estrategia de venta.
            </p>
          </div>
          <div className="plans-grid">
            {plans.map((plan) => (
              <article key={plan.title} className="plan-card">
                <span className="plan-badge">{plan.badge}</span>
                <h3>{plan.title}</h3>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a href="#contacto" className="plan-action">
                  Solicitar informacion
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section split-section">
          <article className="sector-panel">
            <span className="section-tag">Rubros</span>
            <h2>Ideal para comercios con productos frescos y rotacion constante.</h2>
            <div className="sector-list">
              {sectors.map((sector) => (
                <span key={sector}>{sector}</span>
              ))}
            </div>
          </article>

          <article className="process-panel">
            <span className="section-tag">Implementacion</span>
            <h2>Te acompañamos en cada etapa.</h2>
            <ol>
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        </section>

        <section className="info-section cta-strip">
          <div>
            <span className="section-tag">Demo personalizada</span>
            <h2>Mostranos tu operacion y te presentamos una propuesta concreta para implementarla.</h2>
          </div>
          <a href="#contacto" className="primary-action">
            Quiero una demo y propuesta comercial
          </a>
        </section>
      </main>
    </div>
  );
}

export default App;