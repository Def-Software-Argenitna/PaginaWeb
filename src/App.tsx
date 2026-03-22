import { useState } from 'react';
import './Css/App.css';
import ContactForm from './Components/ContactForm';
import Logo from './Imagenes/fondo-final.png';

const videoList = ['/fondo-video2.mp4', '/fondo-video6.mp4', '/fondo-video9.mp4'];

const benefits = [
  'Control de stock por cortes, piezas, bandejas y fiambres con una operatoria simple.',
  'Precios, listas y promociones actualizadas en segundos para actuar con rapidez comercial.',
  'Ventas en mostrador con tickets, caja y reportes diarios sin fricciones para el equipo.',
  'Indicadores de margen, rotacion y merma para decidir con informacion confiable.',
];

const modules = [
  {
    title: 'Stock y trazabilidad',
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
  'Carnicerías',
  'Fiambrerías',
  'Pollerías',
  'Granjas',
  'Rotiserías',
  'Locales con una o varias sucursales',
];

const steps = [
  'Relevamos tu operación y definimos el circuito comercial más conveniente para tu negocio.',
  'Configuramos artículos, precios, usuarios, puestos de venta y reportes de gestión.',
  'Capacitamos al equipo y acompañamos la puesta en marcha hasta que la operación quede estable.',
];

const advantages = [
  {
    title: 'Instalacion simple',
    description: 'El software es instalable y se implementa sin exigir cambios complejos en tu infraestructura.',
  },
  {
    title: 'Bajo requerimiento de hardware',
    description: 'Funciona correctamente en equipos de trabajo habituales, sin necesidad de PCs de alta gama.',
  },
  {
    title: 'Servidor centralizado',
    description: 'La información se consolida en un servidor central, con respaldo automático y mayor continuidad operativa.',
  },
];

const plans = [
  {
    name: 'Demo guiada',
    price: 'Sin cargo',
    description:
      'Instancia comercial inicial para conocer el sistema, revisar tu circuito de trabajo y validar el alcance funcional.',
    features: [
      'Presentacion personalizada del sistema',
      'Relevamiento del negocio y necesidades',
      'Recomendacion de configuracion inicial',
    ],
    action: 'Solicitar demo',
    href: '#contacto',
    featured: false,
  },
  {
    name: 'Licencia operativa',
    price: 'A medida',
    description:
      'Propuesta comercial para poner el sistema en marcha con instalacion, parametrizacion y acompanamiento inicial.',
    features: [
      'Sistema instalable en tu operacion diaria',
      'Configuracion de puestos, usuarios y rubros',
      'Puesta en marcha asistida',
    ],
    action: 'Quiero una propuesta',
    href: '#contacto',
    featured: true,
  },
  {
    name: 'Escalado multisucursal',
    price: 'A convenir',
    description:
      'Para empresas que necesitan administracion centralizada, control consolidado y mayor volumen operativo.',
    features: [
      'Base centralizada con respaldo automatico',
      'Control por sucursal o punto de venta',
      'Esquema comercial adaptable al crecimiento',
    ],
    action: 'Hablar con ventas',
    href: '#contacto',
    featured: false,
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  return (
    <div className="page-shell">
      <section className="hero-section">
        <video
          key={videoList[currentIndex]}
          className="hero-video"
          autoPlay
          muted
          playsInline
          onEnded={handleEnded}
        >
          <source src={videoList[currentIndex]} type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-copy">
            <div className="eyebrow">DEF Software para comercios de alimentos</div>
            <img src={Logo} alt="Def Software" className="hero-logo" />
            <h1>Software de gestion para carnicerias, fiambrerias y locales que necesitan control real.</h1>
            <p className="hero-description">
              Una plataforma comercial y operativa para administrar ventas, stock, compras, precios y
              reportes con criterio profesional. Pensada para negocios con productos frescos, rotacion
              diaria y necesidad de informacion segura.
            </p>

            <p className="hero-supporting-copy">
              Solicitar una demo es simple, y avanzar a la compra definitiva tambien: relevamos tu
              operatoria, proponemos la licencia adecuada y dejamos el sistema listo para trabajar.
            </p>

            <div className="hero-actions">
              <a href="#contacto" className="primary-action">
                Solicitar una demo
              </a>
              <a href="#planes" className="secondary-action">
                Ver planes
              </a>
            </div>

            <div className="hero-metrics">
              <article>
                <strong>+ control</strong>
                <span>sobre stock y costos</span>
              </article>
              <article>
                <strong>+ velocidad</strong>
                <span>en caja y mostrador</span>
              </article>
              <article>
                <strong>+ margen</strong>
                <span>con mejores decisiones</span>
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
            <h2>Una gestion comercial ordenada, medible y lista para crecer.</h2>
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
              No es un sistema generico: prioriza control operativo, reposicion, precios y trazabilidad.
            </p>

        <section className="info-section" id="planes">
          <div className="section-heading plans-heading">
            <span className="section-tag">Planes y adquisicion</span>
            <h2>Un recorrido comercial simple: demo, propuesta y puesta en marcha.</h2>
            <p>
              Dejamos preparada una base para que luego afinemos precios. La idea es que adquirir una demo
              o avanzar a una compra definitiva sea un proceso claro y rapido.
            </p>
          </div>

          <div className="plans-grid">
            {plans.map((plan) => (
              <article key={plan.name} className={`plan-card${plan.featured ? ' plan-card-featured' : ''}`}>
                <div className="plan-header">
                  <span className="plan-name">{plan.name}</span>
                  <strong>{plan.price}</strong>
                </div>
                <p className="plan-description">{plan.description}</p>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a href={plan.href} className={plan.featured ? 'primary-action' : 'secondary-action'}>
                  {plan.action}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section advantages-section">
          <div className="section-heading">
            <span className="section-tag">Infraestructura</span>
            <h2>Implementacion practica, operacion liviana y datos protegidos.</h2>
            <p>
              La solución está pensada para incorporarse sin complejidad técnica innecesaria y con respaldo
              continuo de la información operativa.
            </p>
          </div>
          <div className="advantages-grid">
            {advantages.map((advantage) => (
              <article key={advantage.title} className="advantage-card">
                <h3>{advantage.title}</h3>
                <p>{advantage.description}</p>
              </article>
            ))}
          </div>
        </section>
          </div>
          <div className="modules-grid">
            {modules.map((module) => (
              <article key={module.title} className="module-card">
            <h2>Solicita una demostracion y recibe una propuesta adaptada a tu operatoria.</h2>
                <p>{module.description}</p>
              </article>
            Solicitar asesoramiento comercial
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
            <h2>Mostranos como trabajas y te mostramos como ordenarlo.</h2>
          </div>
          <a href="#contacto" className="primary-action">
            Quiero hablar con un asesor
          </a>
        </section>
      </main>
    </div>
  );
}

export default App;