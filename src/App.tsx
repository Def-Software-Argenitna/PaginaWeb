import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './Css/Modern.css';
import { applyPageMeta } from './pageMeta';
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

interface NavEntry {
  title: string;
  description: string;
  to?: string;
  /** Todavia no disponible: se muestra sin link y con la etiqueta "Próximamente" */
  soon?: boolean;
}

const NAV: { label: string; items: NavEntry[] }[] = [
  {
    label: 'Productos',
    items: [
      { title: 'Punto de venta', description: 'Software de gestión comercial', to: '/plataforma' },
      { title: 'KioskManager', description: 'App móvil para gestión de inventario', to: '/#kioskmanager' },
      { title: 'MeatManager', description: 'Plataforma 100% web para carnicerías', to: '/#meatmanager' },
    ],
  },
  {
    label: 'Integraciones',
    items: [
      { title: 'Pagos', description: 'Tarjetas de débito y crédito, Mercado Pago, Cuenta DNI y más', soon: true },
      { title: 'Catálogo de licencias', description: 'Explora y gestiona tus suscripciones', to: '/catalogo-licencias' },
    ],
  },
  {
    label: 'Adicionales',
    items: [
      { title: 'Módulo móvil', description: 'Gestión en movimiento', to: '/contacto' },
      { title: 'Monitor de cocina', description: 'Control de pedidos en tiempo real', to: '/contacto' },
      { title: 'Facturación electrónica', description: 'Comprobantes electrónicos desde el punto de venta', soon: true },
    ],
  },
];

function NavItem({ item }: { item: NavEntry }) {
  const body = (
    <>
      <span>
        {item.title}
        {item.soon && <em className="soon-badge">Próximamente</em>}
      </span>
      <span>{item.description}</span>
    </>
  );
  if (item.soon || !item.to) {
    return <div className="dropdown-item is-soon" aria-disabled="true">{body}</div>;
  }
  return <Link to={item.to} className="dropdown-item">{body}</Link>;
}

function App() {
  const { pathname, hash } = useLocation();
  const isHiddenLegalRoute = pathname.startsWith('/app/');
  const [menuOpen, setMenuOpen] = useState(false);

  // el menu de celular se cierra al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, hash]);

  // las paginas legales de la app (/app/...) ponen su propio titulo
  useEffect(() => {
    if (!isHiddenLegalRoute) applyPageMeta(pathname);
  }, [pathname, isHiddenLegalRoute]);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [menuOpen]);

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
              }}
              aria-label="DEF Software, inicio"
              style={{
                textDecoration: 'none',
              }}
            >
              <Logo />
            </Link>
            <nav className="nav-links" aria-label="Principal">
              {NAV.map((group) => (
                <div className="nav-item-dropdown" key={group.label}>
                  <button type="button" className="dropdown-trigger" aria-haspopup="true">
                    <span>{group.label}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div className="dropdown-menu">
                    {group.items.map((item) => <NavItem key={item.title} item={item} />)}
                  </div>
                </div>
              ))}

              <Link to="/soporte-tecnico" className="nav-plain-link">
                Soporte técnico
              </Link>
            </nav>
            <div className="auth-buttons">
              <Link to="/login" className="modern-btn nav-btn">
                Ingresar
              </Link>
              <button
                type="button"
                className={`nav-burger${menuOpen ? ' is-open' : ''}`}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`} hidden={!menuOpen}>
            {NAV.map((group) => (
              <div className="mobile-menu__group" key={group.label}>
                <p className="mobile-menu__label">{group.label}</p>
                {group.items.map((item) => <NavItem key={item.title} item={item} />)}
              </div>
            ))}
            <Link to="/soporte-tecnico" className="mobile-menu__plain">Soporte técnico</Link>
            <Link to="/contacto" className="modern-btn main-btn mobile-menu__cta">Solicitar asesoramiento</Link>
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
                <Link to="/#software">Software</Link>
                <Link to="/catalogo-licencias">Catálogo de licencias</Link>
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
