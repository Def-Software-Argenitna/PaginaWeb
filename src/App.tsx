import './Css/Modern.css';
import TypewriterHero from './Components/TypewriterHero';
import AtmosphericBackground from './Components/AtmosphericBackground';

const Features = [
  {
    title: "IA Generativa",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00f2ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Algoritmos inteligentes que optimizan cada decisión en tiempo real."
  },
  {
    title: "Cloud Native",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 19C15.57 19 14 17.43 14 15.5C14 13.57 15.57 12 17.5 12C19.43 12 21 13.57 21 15.5C21 17.43 19.43 19 17.5 19Z" stroke="#00f2ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 19C4.79 19 3 17.21 3 15C3 12.79 4.79 11 7 11C7.26 11 7.51 11.02 7.76 11.07C8.61 8.67 10.89 7 13.5 7C16.81 7 19.5 9.69 19.5 13C19.5 13.26 19.48 13.51 19.43 13.76" stroke="#00f2ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Infraestructura robusta en la nube con disponibilidad del 99.9%."
  },
  {
    title: "Data Analytics",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21H3V3" stroke="#00f2ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 7L13 15L9 11L3 17" stroke="#00f2ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: "Visualización de datos avanzada para una visión clara de su negocio."
  }
];

function App() {
  return (
    <div className="new-modern-shell">
      <AtmosphericBackground />
      
      <header className="new-modern-header">
        <div className="new-header-content">
          <div className="brand-logo">DS</div>
          <span className="brand-title">DEF Software</span>
          <nav style={{ marginLeft: 'auto', display: 'flex', gap: '2rem' }}>
            <a href="#features" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tecnología</a>
            <a href="#info" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Soluciones</a>
            <a href="#contacto" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Contacto</a>
          </nav>
        </div>
      </header>

      <main className="new-main-content">
        <section className="new-hero-section">
          <div className="hero-panel glass-panel">
            <div className="hero-eyebrow">Soluciones de Próxima Generación</div>
            <TypewriterHero />
            <p style={{ color: '#a0a0b0', fontSize: '1.2rem', maxWidth: '600px', margin: '1.5rem auto 3rem' }}>
              Impulsamos la transformación digital con herramientas avanzadas diseñadas para el futuro empresarial.
            </p>
            <div className="hero-actions">
              <a href="#contacto" className="modern-btn main-btn">Comenzar Ahora</a>
              <a href="#features" className="modern-btn secondary-btn">Explorar tecnología</a>
            </div>
          </div>
        </section>

        <section id="features" className="new-info-section">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Ecosistema Tecnológico</h2>
            <p style={{ color: '#a0a0b0', maxWidth: '600px', margin: '0 auto' }}>Nuestro stack tecnológico está diseñado para ofrecer el máximo rendimiento y escalabilidad.</p>
          </div>
          <div className="info-grid">
            {Features.map((f, i) => (
              <div key={i} className="info-card glass-panel">
                <div className="icon-wrapper" style={{ marginBottom: '1rem' }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="info" className="new-info-section" style={{ background: 'rgba(0,0,0,0.2)', padding: '8rem 2rem', borderRadius: '40px' }}>
          <div className="info-grid">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: '2rem' }}>Gestión Integral sin Límites</h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: '#00f2ff' }}></div>
                  <span>Control de inventario inteligente con alertas 24/7.</span>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: '#00f2ff' }}></div>
                  <span>Reportes financieros automatizados y detallados.</span>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: '#00f2ff' }}></div>
                  <span>Multi-plataforma: Accede desde cualquier lugar.</span>
                </li>
              </ul>
            </div>
            <div className="glass-panel" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(0, 242, 255, 0.05), rgba(112, 0, 255, 0.05))', borderStyle: 'dashed' }}>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
                <h3>Escalabilidad Asegurada</h3>
                <p>Nuestra plataforma crece con su empresa, desde startups hasta grandes corporaciones.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-panel glass-panel" id="contacto">
            <h2 style={{ background: 'linear-gradient(to right, #fff, #00f2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ¿Listo para el siguiente nivel?
            </h2>
            <p style={{ color: '#a0a0b0', fontSize: '1.1rem', marginBottom: '3rem' }}>
              Agenda una sesión personalizada con nuestros expertos y descubre cómo podemos transformar tu negocio.
            </p>
            <a href="mailto:info@defsoftware.com" className="modern-btn main-btn">Solicitar una Consultoría</a>
          </div>
        </section>
      </main>

      <footer className="new-footer">
        <div style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '2px', color: '#fff' }}>DEF SOFTWARE</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <a href="#" style={{ color: '#a0a0b0' }}>LinkedIn</a>
          <a href="#" style={{ color: '#a0a0b0' }}>Twitter</a>
          <a href="#" style={{ color: '#a0a0b0' }}>GitHub</a>
        </div>
        <span>© {new Date().getFullYear()} DEF Software. Forjando el futuro digital.</span>
      </footer>
    </div>
  );
}

export default App;