import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './Css/Modern.css';
import AtmosphericBackground from './Components/AtmosphericBackground';
import Home from './Pages/Home';
import Contacto from './Pages/Contacto';
import SobreNosotros from './Pages/SobreNosotros';
import Plataforma from './Pages/Plataforma';
import CasosExito from './Pages/CasosExito';
import CentroAyuda from './Pages/CentroAyuda';
import EstadoSistema from './Pages/EstadoSistema';
import Documentacion from './Pages/Documentacion';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import CatalogoLicencias from './Pages/CatalogoLicencias';
import PoliticaPrivacidadApp from './Pages/PoliticaPrivacidadApp';
import EliminacionDatosApp from './Pages/EliminacionDatosApp';
import SoporteTecnico from './Pages/SoporteTecnico';
import AdminTickets from './Pages/AdminTickets';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminRoute from './Components/AdminRoute';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Logo({ height = '40px' }: { height?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width={height}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--accent-cyan)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.4))' }}
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
      <span style={{ 
        fontWeight: 800, 
        fontSize: '1.4rem', 
        color: '#fff',
        letterSpacing: '0.5px',
        fontFamily: 'var(--font-manrope)'
      }}>
        DEF<span style={{ fontWeight: 300, color: 'var(--text-dim)' }}>Software</span>
      </span>
    </div>
  );
}

function App() {
  const { pathname } = useLocation();
  const isHiddenLegalRoute = pathname.startsWith('/app/');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 },
    );

    const timer = window.setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.reveal:not(.active)');
      hiddenElements.forEach((element) => observer.observe(element));
    }, 100);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div className="new-modern-shell">
      <ScrollToTop />
      <AtmosphericBackground />
      <div className="content-veil"></div>

      {!isHiddenLegalRoute && (
        <header className="new-modern-header">
          <div className="new-header-content reveal active">
            <Link
              to="/"
              className="brand-logo"
              onClick={() => {
                // Scroll to top
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                // Replay video
                window.dispatchEvent(new CustomEvent('replay-background-video'));
              }}
              style={{
                textDecoration: 'none',
              }}
            >
              <Logo />
            </Link>
            <nav className="nav-links">
              <div className="nav-item-dropdown">
                <div className="dropdown-trigger">
                  <Link to="/">Productos</Link>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div className="dropdown-menu">
                  <Link to="/plataforma" className="dropdown-item">
                    <span>Punto de Venta</span>
                    <span>Software de gestión comercial</span>
                  </Link>
                  <Link to="/#kioskmanager" className="dropdown-item">
                    <span>KioskManager</span>
                    <span>App móvil para gestión de inventario</span>
                  </Link>
                  <Link to="/#meatmanager" className="dropdown-item">
                    <span>MeatManager</span>
                    <span>Plataforma 100% Web para carnicerías</span>
                  </Link>
                </div>
              </div>



              <div className="nav-item-dropdown">
                <div className="dropdown-trigger">
                  <Link to="/">Integraciones</Link>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div className="dropdown-menu">
                  <Link to="/" className="dropdown-item">
                    <span>Pagos (PROXIMAMENTE!!!)</span>
                    <span>Tarjetas de débito/crédito, Mercado Pago, Cuenta DNI, etc</span>
                  </Link>
                  <Link to="/catalogo-licencias" className="dropdown-item">
                    <span>Catalogo de Licencias</span>
                    <span>Explora y gestiona tus suscripciones</span>
                  </Link>
                </div>
              </div>

              <div className="nav-item-dropdown">
                <div className="dropdown-trigger">
                  <Link to="/">Adicionales</Link>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div className="dropdown-menu">
                  <Link to="/" className="dropdown-item">
                    <span>Módulo Móvil</span>
                    <span>Gestión en movimiento</span>
                  </Link>
                  <Link to="/" className="dropdown-item">
                    <span>Monitor de Cocina</span>
                    <span>Control de pedidos en tiempo real</span>
                  </Link>
                  <Link to="/" className="dropdown-item">
                    <span>Facturación Electrónica (PROXIMAMENTE!!!)</span>
                  </Link>
                </div>
              </div>

              <div className="nav-item-dropdown">
                <div className="dropdown-trigger">
                  <Link to="/soporte-tecnico">Soporte</Link>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div className="dropdown-menu">
                  <Link to="/centro-ayuda" className="dropdown-item">
                    <span>Centro de ayuda</span>
                    <span>Guías y preguntas frecuentes</span>
                  </Link>
                  <Link to="/estado-sistema" className="dropdown-item">
                    <span>Estado del sistema</span>
                    <span>Monitoreo en tiempo real</span>
                  </Link>
                  <Link to="/soporte-tecnico" className="dropdown-item">
                    <span>Soporte Técnico</span>
                    <span>Reportar errores y fallas del sistema</span>
                  </Link>
                </div>
              </div>




            </nav>
            <div className="auth-buttons">
              <Link to="/login" className="modern-btn nav-btn">
                Ingresar
              </Link>
            </div>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plataforma" element={<Plataforma />} />
        <Route path="/catalogo-licencias" element={<CatalogoLicencias />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/casos-exito" element={<CasosExito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/centro-ayuda" element={<CentroAyuda />} />
        <Route path="/estado-sistema" element={<EstadoSistema />} />
        <Route path="/documentacion" element={<Documentacion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/soporte-tecnico" element={<SoporteTecnico />} />
        <Route path="/app/privacy/meatmanager-mobile" element={<PoliticaPrivacidadApp />} />
        <Route path="/app/data-deletion/meatmanager-mobile" element={<EliminacionDatosApp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tickets"
          element={
            <AdminRoute>
              <AdminTickets />
            </AdminRoute>
          }
        />
      </Routes>

      {!isHiddenLegalRoute && (
        <footer className="new-footer">
          <div className="footer-content reveal">
            <div className="footer-col" style={{ paddingRight: '2rem' }}>
              <Link
                to="/"
                className="brand-logo"
                style={{
                  textDecoration: 'none',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Logo height="60px" />
              </Link>
              <p>
                Forjando el futuro digital con software de gestión comercial. Optimización,
                diseño y facturación en un solo lugar.
              </p>
            </div>

            <div className="footer-col">
              <h4>Producto</h4>
              <div className="footer-links">
                <Link to="/plataforma">Plataforma</Link>
                <Link to="/contacto">Descargar</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4>Compañía</h4>
              <div className="footer-links">
                <Link to="/sobre-nosotros">Sobre nosotros</Link>
                <Link to="/casos-exito">Casos de éxito</Link>
                <Link to="/contacto">Contacto</Link>
              </div>
            </div>

            <div className="footer-col">
              <h4>Soporte</h4>
              <div className="footer-links">
                <Link to="/centro-ayuda">Centro de ayuda</Link>
                <Link to="/documentacion">Documentación API</Link>
                <Link to="/estado-sistema">Estado del sistema</Link>
                <Link to="/soporte-tecnico">Soporte Técnico</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom reveal">
            <p>&copy; {new Date().getFullYear()} DEF Software. Todos los derechos reservados.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
