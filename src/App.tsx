
import './Css/App.css';
import './Css/Modern.css';
import TypewriterHero from './Components/TypewriterHero';
import ParticlesBackground from './Components/ParticlesBackground';


function App() {
  return (
    <div className="page-shell new-modern-shell">
      <ParticlesBackground />
      <header className="main-header new-modern-header">
        <div className="header-content new-header-content">
          <span className="brand-logo">DS</span>
          <span className="brand-title">DEF Software</span>
        </div>
      </header>
      <main className="main-content new-main-content">
        <section className="hero-section new-hero-section">
          <div className="hero-panel glass-panel">
            <div className="hero-eyebrow">Soluciones tecnológicas para negocios modernos</div>
            <TypewriterHero />
            <div className="hero-actions">
              <a href="#contacto" className="modern-btn main-btn">Solicitar demo</a>
              <a href="#info" className="modern-btn secondary-btn">Ver más</a>
            </div>
          </div>
        </section>
        <section className="info-section new-info-section" id="info">
          <div className="info-grid">
            <div className="info-card glass-panel">
              <h3>Gestión integral</h3>
              <p>Controla ventas, stock y reportes en tiempo real desde cualquier lugar.</p>
            </div>
            <div className="info-card glass-panel">
              <h3>Automatización</h3>
              <p>Reduce errores y tareas repetitivas con procesos inteligentes.</p>
            </div>
            <div className="info-card glass-panel">
              <h3>Escalable y seguro</h3>
              <p>Ideal para un local o una cadena, con respaldo automático y acceso seguro.</p>
            </div>
          </div>
        </section>
        <section className="cta-section">
          <div className="cta-panel glass-panel">
            <h2>¿Listo para modernizar tu gestión?</h2>
            <a href="#contacto" className="modern-btn main-btn">Solicitar una demo</a>
          </div>
        </section>
      </main>
      <footer className="main-footer new-footer">
        <span>© {new Date().getFullYear()} DEF Software. Todos los derechos reservados.</span>
      </footer>
    </div>
  );
}

export default App;