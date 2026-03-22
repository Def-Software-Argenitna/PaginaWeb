import './Css/Modern.css';
import TypewriterHero from './Components/TypewriterHero';
import AtmosphericBackground from './Components/AtmosphericBackground';

const Features = [
  {
    title: "IA Generativa Integrada",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Algoritmos inteligentes que optimizan cada decisión de su negocio en tiempo real, prediciendo tendencias y automatizando flujos."
  },
  {
    title: "Arquitectura Cloud Native",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 19C15.57 19 14 17.43 14 15.5C14 13.57 15.57 12 17.5 12C19.43 12 21 13.57 21 15.5C21 17.43 19.43 19 17.5 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 19C4.79 19 3 17.21 3 15C3 12.79 4.79 11 7 11C7.26 11 7.51 11.02 7.76 11.07C8.61 8.67 10.89 7 13.5 7C16.81 7 19.5 9.69 19.5 13C19.5 13.26 19.48 13.51 19.43 13.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Infraestructura global con disponibilidad del 99.99%, escalabilidad instantánea y máxima seguridad de datos."
  },
  {
    title: "Real-time Analytics",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21H3V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 7L13 15L9 11L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Paneles dinámicos hiper-personalizables. Transforme trillones de datos en una visión clara y accionable al instante."
  }
];

const PricingPlans = [
  {
    name: "Startup",
    price: "$49",
    desc: "Perfecto para pequeños equipos y negocios emergentes.",
    features: ["Hasta 5 usuarios", "Dashboard básico", "Soporte por email", "10 GB almacenamiento", "Analíticas semanales"],
    popular: false
  },
  {
    name: "Profesional",
    price: "$129",
    desc: "Para empresas en crecimiento que necesitan control total.",
    features: ["Usuarios ilimitados", "Dashboards personalizados", "Soporte prioritario 24/7", "100 GB almacenamiento", "IA predictiva (Estándar)"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Soluciones a medida para corporaciones y grandes volúmenes.",
    features: ["Despliegue On-Premise o Cloud", "Soporte dedicado", "SLA 99.99% garantizado", "Almacenamiento ilimitado", "Motor de IA nativa"],
    popular: false
  }
];

function App() {
  return (
    <div className="new-modern-shell">
      <AtmosphericBackground />
      
      <header className="new-modern-header">
        <div className="new-header-content">
          <div className="brand-logo" style={{ cursor: 'pointer' }}>
            <img src="/logo.png" alt="Def Software" style={{ height: '50px', objectFit: 'contain' }} />
          </div>
          <nav className="nav-links">
            <a href="#features">Plataforma</a>
            <a href="#planes">Planes</a>
            <a href="#contacto">Contacto</a>
            <a href="#demo" className="modern-btn main-btn nav-btn">Descargar Demo</a>
          </nav>
        </div>
      </header>

      <main className="new-main-content">
        <section className="new-hero-section">
          <div className="hero-panel">
            <TypewriterHero />
            <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '650px', margin: '1.5rem auto 3.5rem', lineHeight: 1.6 }}>
              Sistema de gestión integral para comercios. Controla tu inventario, agiliza tus ventas y automatiza la facturación diaria desde una plataforma 100% intuitiva y segura.
            </p>
            <div className="hero-actions">
              <a href="#demo" className="modern-btn main-btn" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Empezar Gratis</a>
              <a href="#planes" className="modern-btn secondary-btn" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Ver Planes</a>
            </div>
          </div>
        </section>

        <section id="features" className="new-info-section">
          <div className="section-header">
            <h2>Ecosistema de Alto Rendimiento</h2>
            <p>Construido desde cero para ofrecer la máxima velocidad, una interfaz intuitiva y tecnologías revolucionarias integradas directamente en su núcleo.</p>
          </div>
          <div className="info-grid">
            {Features.map((f, i) => (
              <div key={i} className="info-card glass-panel">
                <div className="icon-wrapper">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="planes" className="new-info-section" style={{ position: 'relative', zIndex: 10 }}>
          <div className="section-header">
            <h2>Planes Transparentes</h2>
            <p>Escale sin límites. Elija el plan que mejor se adapte a las necesidades operativas de su empresa hoy, y mejore mañana.</p>
          </div>
          <div className="pricing-grid">
            {PricingPlans.map((plan, i) => (
              <div key={i} className={`pricing-card glass-panel ${plan.popular ? 'popular' : ''}`}>
                <div className="pricing-tier">{plan.name}</div>
                <div className="pricing-price">{plan.price}<span>/mes</span></div>
                <div className="pricing-desc">{plan.desc}</div>
                <ul className="pricing-features">
                  {plan.features.map((feat, j) => (
                    <li key={j}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button className="modern-btn main-btn" style={{ width: '100%', marginTop: 'auto' }}>
                  {plan.name === 'Enterprise' ? 'Contactar Ventas' : 'Comenzar Prueba'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section" id="demo">
          <div className="cta-panel">
            <h2>Descarga la Demo Hoy Mismo.</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Experimente el futuro del software de gestión empresarial. Instale la versión de prueba en segundos y descubra el impacto real en su productividad.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button className="modern-btn demo-btn" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.8rem' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Descargar para Windows
              </button>
              <button className="modern-btn secondary-btn" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                Versión macOS
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="new-footer" id="contacto">
        <div className="footer-content">
          <div className="footer-col" style={{ paddingRight: '2rem' }}>
            <div className="brand-logo" style={{ marginBottom: '1.5rem' }}>
              <img src="/logo.png" alt="Def Software" style={{ height: '60px', objectFit: 'contain' }} />
            </div>
            <p>Forjando el futuro digital con software de gestión comercial. Optimización, diseño y facturación en un solo lugar.</p>
          </div>
          <div className="footer-col">
            <h4>Producto</h4>
            <div className="footer-links">
              <a href="#features">Plataforma</a>
              <a href="#planes">Precios</a>
              <a href="#demo">Descargar</a>
              <a href="#">Actualizaciones</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Compañía</h4>
            <div className="footer-links">
              <a href="#">Sobre Nosotros</a>
              <a href="#">Casos de Éxito</a>
              <a href="#">Soporte</a>
              <a href="#">Contacto</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DEF Software. Todos los derechos reservados.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>Privacidad</a>
            <a href="#" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}>Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;