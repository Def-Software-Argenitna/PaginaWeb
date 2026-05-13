import { Link } from 'react-router-dom';

const PricingPlans = [
  {
    name: 'Licencia Web',
    price: 'Desde $...',
    desc: 'La solución ideal para comenzar a digitalizar tu operación gastronómica.',
    features: [
      '1 usuario habilitado',
      'Gestión de comandas',
      'Módulo de facturación*',
      'Conexión con 1 comandera',
      'Carta digital con QR',
      'Estadísticas de ventas',
      'Gestión de Mesas y Stock'
    ],
    popular: false,
  },
  {
    name: 'Avanzado',
    price: 'Desde $...',
    desc: 'Control total para negocios en crecimiento con múltiples necesidades.',
    features: [
      'Usuarios ilimitados',
      'Módulo de stock, costos y recetas',
      'Mesas ilimitadas',
      'Múltiples comanderas',
      'Múltiples cartas',
      'Reportes y métricas avanzados',
      'Integración con apps de delivery'
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'Desde $...',
    desc: 'Para empresas que buscan integración total y gestión multisuccursal.',
    features: [
      'Acceso a la API para integraciones',
      'Facturación masiva vía Web',
      'Gestión Multilocal',
      'Centro de Producción',
      'Tienda online con pedidos ilimitados',
      'Soporte corporativo prioritario',
      'Módulos personalizados'
    ],
    popular: false,
  },
];

export default function Planes() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '4rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Planes</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '720px', margin: '0 auto' }}>
            Simplificá tu operación con una solución integral, fácil de usar y moderna.
            Seleccioná el plan que mejor se adapte a tu local.
          </p>
        </div>
      </section>

      <section className="new-info-section" style={{ position: 'relative', zIndex: 10, paddingTop: '0' }}>
        <div className="pricing-grid">
          {PricingPlans.map((plan, index) => (
            <div key={plan.name} className={`pricing-card glass-panel reveal ${plan.popular ? 'popular' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
              <div className="pricing-tier">{plan.name}</div>

              <div className="pricing-desc">{plan.desc}</div>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link to="/contacto" className="modern-btn main-btn" style={{ width: '100%', marginTop: 'auto' }}>
                {plan.name === 'Enterprise' ? 'Contactar ventas' : 'Comenzar prueba'}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
