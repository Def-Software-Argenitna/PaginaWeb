import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './Css/Modern.css';
<<<<<<< HEAD
import TypewriterHero from './Components/TypewriterHero';
=======
import AtmosphericBackground from './Components/AtmosphericBackground';
import Home from './Pages/Home';
import Planes from './Pages/Planes';
import Contacto from './Pages/Contacto';
import SobreNosotros from './Pages/SobreNosotros';
import Plataforma from './Pages/Plataforma';
import CasosExito from './Pages/CasosExito';
import CentroAyuda from './Pages/CentroAyuda';
import EstadoSistema from './Pages/EstadoSistema';
import Documentacion from './Pages/Documentacion';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
>>>>>>> a2f598fa505f9fe90980f4d459b110131b6340c2

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [logoError, setLogoError] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.reveal:not(.active)');
      hiddenElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [pathname]);

  const fallbackLogo = (
    <>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
      <span style={{ fontWeight: 800, fontSize: '1.4rem', color: '#fff' }}>DEF<span style={{ fontWeight: 300, color: 'var(--text-dim)' }}>Software</span></span>
    </>
  );

  return (
<<<<<<< HEAD
    <div className="page-shell new-modern-shell">
      <header className="main-header new-modern-header">
        <div className="header-content new-header-content">
          <span className="brand-logo">DS</span>
          <span className="brand-title">DEF Software</span>
=======
    <div className="new-modern-shell">
      <ScrollToTop />
      <AtmosphericBackground />
      <div className="content-veil"></div>

      <header className="new-modern-header">
        <div className="new-header-content reveal">
          <Link to="/" className="brand-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!logoError ? (
              <img src="/logo.png" alt="Def Software" style={{ height: '50px', objectFit: 'contain' }} onError={() => setLogoError(true)} />
            ) : fallbackLogo}
          </Link>
          <nav className="nav-links">
            <Link to="/plataforma">Plataforma</Link>
            <Link to="/planes">Planes y Precios</Link>
            <Link to="/sobre-nosotros">Sobre Nosotros</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="modern-btn nav-btn">Ingresar</Link>
          </div>
>>>>>>> a2f598fa505f9fe90980f4d459b110131b6340c2
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plataforma" element={<Plataforma />} />
        <Route path="/planes" element={<Planes />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/casos-exito" element={<CasosExito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/centro-ayuda" element={<CentroAyuda />} />
        <Route path="/estado-sistema" element={<EstadoSistema />} />
        <Route path="/documentacion" element={<Documentacion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>

      <footer className="new-footer">
        <div className="footer-content reveal">
          <div className="footer-col" style={{ paddingRight: '2rem' }}>
            <Link to="/" className="brand-logo" style={{ textDecoration: 'none', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {!logoError ? (
                <img src="/logo.png" alt="Def Software" style={{ height: '60px', objectFit: 'contain' }} onError={() => setLogoError(true)} />
              ) : fallbackLogo}
            </Link>
            <p>Forjando el futuro digital con software de gestión comercial. Optimización, diseño y facturación en un solo lugar.</p>
          </div>
          <div className="footer-col">
            <h4>Producto</h4>
            <div className="footer-links">
              <Link to="/plataforma">Plataforma</Link>
              <Link to="/planes">Precios</Link>
              <Link to="/contacto">Descargar</Link>
            </div>
          </div>
<<<<<<< HEAD
        </section>

        {/* Sección Sobre Nosotros */}
        <section className="info-section new-info-section" id="sobre">
          <div className="info-grid">
            <div className="info-card glass-panel">
              <h3>¿Quiénes somos?</h3>
              <p>Somos un equipo apasionado por la tecnología y la eficiencia, ayudando a negocios a crecer con herramientas simples y potentes.</p>
=======
          <div className="footer-col">
            <h4>Compañía</h4>
            <div className="footer-links">
              <Link to="/sobre-nosotros">Sobre Nosotros</Link>
              <Link to="/casos-exito">Casos de Éxito</Link>
              <Link to="/contacto">Contacto</Link>
>>>>>>> a2f598fa505f9fe90980f4d459b110131b6340c2
            </div>
<<<<<<< HEAD
            <div className="info-card glass-panel">
              <h3>Nuestra misión</h3>
              <p>Facilitar la gestión y el control de tu negocio, para que puedas enfocarte en lo que realmente importa: tus clientes.</p>
=======
          </div>
          <div className="footer-col">
            <h4>Soporte</h4>
            <div className="footer-links">
              <Link to="/centro-ayuda">Centro de Ayuda</Link>
              <Link to="/documentacion">Documentación API</Link>
              <Link to="/estado-sistema">Estado del Sistema</Link>
>>>>>>> a2f598fa505f9fe90980f4d459b110131b6340c2
            </div>
<<<<<<< HEAD
          </div>
        </section>

        {/* Sección Beneficios */}
        <section className="info-section new-info-section" id="beneficios">
          <h2 className="section-title">Beneficios clave</h2>
          <div className="info-grid">
            <div className="info-card glass-panel">
              <h3>Simple y visual</h3>
              <p>Interfaz intuitiva, sin complicaciones. Todo lo que necesitas, a un clic.</p>
            </div>
            <div className="info-card glass-panel">
              <h3>Soporte cercano</h3>
              <p>Te acompañamos en cada paso, con atención personalizada y rápida.</p>
            </div>
            <div className="info-card glass-panel">
              <h3>Actualizaciones constantes</h3>
              <p>El sistema evoluciona con tu negocio, siempre actualizado y seguro.</p>
            </div>
=======
>>>>>>> a2f598fa505f9fe90980f4d459b110131b6340c2
          </div>
<<<<<<< HEAD
        </section>

        {/* Sección Cómo funciona */}
        <section className="info-section new-info-section" id="funciona">
          <h2 className="section-title">¿Cómo funciona?</h2>
          <div className="info-grid">
            <div className="info-card glass-panel">
              <h3>1. Diagnóstico</h3>
              <p>Analizamos tu operación y necesidades para ofrecerte la mejor solución.</p>
            </div>
            <div className="info-card glass-panel">
              <h3>2. Implementación</h3>
              <p>Configuramos el sistema y capacitamos a tu equipo para un arranque sin problemas.</p>
            </div>
            <div className="info-card glass-panel">
              <h3>3. Acompañamiento</h3>
              <p>Seguimos a tu lado para que aproveches al máximo cada herramienta.</p>
            </div>
          </div>
        </section>

        {/* Sección Testimonios */}
        <section className="info-section new-info-section" id="testimonios">
          <h2 className="section-title">Testimonios</h2>
          <div className="info-grid">
            <div className="info-card glass-panel">
              <p>“Desde que usamos DEF Software, todo es más simple y rápido. El soporte es excelente.”</p>
              <span className="testimonial-author">— Ana, Supermercado El Sol</span>
            </div>
            <div className="info-card glass-panel">
              <p>“La implementación fue fácil y el sistema se adapta a nuestro crecimiento.”</p>
              <span className="testimonial-author">— Martín, Tienda Natural</span>
            </div>
          </div>
        </section>

        {/* Sección Contacto */}
        <section className="cta-section" id="contacto">
          <div className="cta-panel glass-panel">
            <h2>¿Listo para modernizar tu gestión?</h2>
            <a href="mailto:info@defsoftware.com" className="modern-btn main-btn">Contactar ahora</a>
          </div>
        </section>
      </main>
      <footer className="main-footer new-footer">
        <span>© {new Date().getFullYear()} DEF Software. Todos los derechos reservados.</span>
=======
        </div>
        <div className="footer-bottom reveal">
          <p>&copy; {new Date().getFullYear()} DEF Commerce. Todos los derechos reservados.</p>
        </div>
>>>>>>> a2f598fa505f9fe90980f4d459b110131b6340c2
      </footer>
    </div>
  );
}

export default App;