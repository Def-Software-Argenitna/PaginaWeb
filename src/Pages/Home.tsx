import { Link } from 'react-router-dom';
import TypewriterHero from '../Components/TypewriterHero';

const SalesFeatures = [
  {
    title: 'Gestión de inventario',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    description: 'Control absoluto de tu stock en múltiples depósitos. Sincronización instantánea de entradas y salidas.',
  },
  {
    title: 'Facturación automatizada',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    description: 'Emisión de comprobantes fiscales con un clic. Reportes integrados con los sistemas de recaudación.',
  },
  {
    title: 'Gestión de cobros',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="12" y1="2" x2="12" y2="6"></line>
      </svg>
    ),
    description: 'Múltiples métodos de pago, integración con terminales, conciliación bancaria y gestión de cuentas corrientes.',
  },
  {
    title: 'Controles de caja',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
        <line x1="8" y1="20" x2="8" y2="10"></line>
      </svg>
    ),
    description: 'Aperturas y cierres de caja ciegos, arqueos trazables paso a paso para evitar cualquier fuga de dinero.',
  },
  {
    title: 'Usuarios y permisos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    description: 'Perfiles personalizados: vendedor, supervisor, encargado y administrador. Tú decides quién ve cada módulo.',
  },
  {
    title: 'Analítica de ventas',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    description: 'Dashboards en la palma de tu mano. Rentabilidad, productos más vendidos y métricas comparativas.',
  },
];

export default function Home() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section">
        <div className="hero-panel reveal">
          <TypewriterHero />
          <p style={{ color: 'var(--text-dim)', fontSize: '1.25rem', maxWidth: '650px', margin: '1.5rem auto 3.5rem', lineHeight: 1.6 }}>
            Sistema de gestión integral para comercios. Controla tu inventario, agiliza tus ventas y automatiza la facturación diaria desde una plataforma 100% intuitiva y segura.
          </p>
          <div className="hero-actions">
            <a href="#demo" className="modern-btn main-btn" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Empezar gratis</a>
            <Link to="/planes" className="modern-btn secondary-btn" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>Ver planes</Link>
          </div>
        </div>
      </section>

      <section className="new-info-section">
        <div className="section-header reveal">
          <h2>Soluciones de ventas y control</h2>
          <p>Todas las herramientas que necesitas para digitalizar, proteger y escalar las operaciones diarias de tu negocio.</p>
        </div>
        <div className="info-grid">
          {SalesFeatures.map((feature, index) => (
            <div key={feature.title} className="info-card glass-panel reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="icon-wrapper">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section" id="demo">
        <div className="cta-panel reveal">
          <h2>Descarga la demo hoy mismo.</h2>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Experimenta el futuro del software de gestión comercial. Instala la versión de prueba en segundos y descubre el impacto real en tu productividad.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
  );
}
