import { Link } from 'react-router-dom';

const PricingPlans = [
  {
    name: 'Startup',
    price: '$49',
    desc: 'Perfecto para pequeños comercios y negocios emergentes.',
    features: ['Hasta 5 sucursales', 'Módulo de facturación', 'Stock básico', 'Cierres de caja fijos', 'Soporte general'],
    popular: false,
  },
  {
    name: 'Profesional',
    price: '$129',
    desc: 'Para empresas en crecimiento que necesitan control total.',
    features: ['Sucursales ilimitadas', 'Facturación automática', 'Stock multicabezal', 'Permisos de usuarios', 'Soporte prioritario 24/7'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Soluciones a medida para franquicias corporativas.',
    features: ['Despliegue On-Premise', 'Kioscos interactivos API', 'SLA 99.99% garantizado', 'Integraciones bancarias', 'Capacitación in situ'],
    popular: false,
  },
];

export default function Planes() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '4rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Planes inversores</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Escalabilidad garantizada. Escoge el modelo que potencie la etapa actual de tu desarrollo comercial.
          </p>
        </div>
      </section>

      <section className="new-info-section" style={{ position: 'relative', zIndex: 10, paddingTop: '0' }}>
        <div className="pricing-grid">
          {PricingPlans.map((plan, index) => (
            <div key={plan.name} className={`pricing-card glass-panel reveal ${plan.popular ? 'popular' : ''}`} style={{ transitionDelay: `${index * 0.15}s` }}>
              <div className="pricing-tier">{plan.name}</div>
              <div className="pricing-price">{plan.price}<span>/mes</span></div>
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
