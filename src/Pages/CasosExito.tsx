export default function CasosExito() {
  const casos = [
    {
      empresa: 'MegaSuper S.A.',
      rubro: 'Retail y supermercado',
      resultado: '+45% velocidad en línea de cajas',
      texto: 'Desde que integramos DEF Software, las filas de los clientes se acortaron a la mitad. El módulo offline nos salvó en tres caídas de conexión a nivel ciudad.',
      autor: 'Martín R., Gerente de Operaciones',
    },
    {
      empresa: 'Boutique Elegance',
      rubro: 'Indumentaria',
      resultado: 'Inventario perfecto en 3 tiendas',
      texto: 'Antes perdíamos oportunidades de venta por no saber en qué sucursal teníamos la prenda. DEF sincroniza nuestro stock y nos avisa del punto de reposición automáticamente.',
      autor: 'Carla T., Fundadora',
    },
    {
      empresa: 'Distribuidora Atlas',
      rubro: 'Mayorista alimenticio',
      resultado: 'Integración B2B y cuentas corrientes',
      texto: 'El manejo de las cuentas corrientes de nuestros clientes mayoristas y su facturación quincenal ahora nos toma minutos en vez de horas.',
      autor: 'José Z., Director Financiero',
    },
  ];

  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '3rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Casos de éxito</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Descubre cómo diversos sectores del mercado han revolucionado su operatoria junto a nosotros.
          </p>
        </div>
      </section>

      <section className="new-info-section" style={{ paddingTop: '0' }}>
        <div className="info-grid">
          {casos.map((caso, index) => (
            <div key={caso.empresa} className="glass-panel reveal" style={{ padding: '2.5rem', textAlign: 'left', transitionDelay: `${index * 0.15}s` }}>
              <div style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', marginBottom: '0.5rem' }}>{caso.rubro}</div>
              <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '1rem' }}>{caso.empresa}</h3>
              <div style={{ padding: '0.5rem 1rem', background: 'rgba(0, 242, 255, 0.1)', borderLeft: '3px solid var(--accent-cyan)', marginBottom: '1.5rem', color: '#fff', fontWeight: 600 }}>
                {caso.resultado}
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{caso.texto}"
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                {caso.autor}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
