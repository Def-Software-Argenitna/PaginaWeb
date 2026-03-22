export default function SobreNosotros() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '4rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Nuestra Misión</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Empoderar al comercio local con la misma infraestructura que disponen las corporaciones multinacionales.
          </p>
        </div>
      </section>

      <section id="sobre-nosotros" className="new-info-section" style={{ paddingTop: '2rem' }}>
        <div className="glass-panel reveal" style={{ padding: '3rem', textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto' }}>
            Fundada en 2024, DEF Commerce nació de la necesidad de simplificar la facturación y el inventario para equipos ágiles evitando planillas eternas. Hoy procesamos más de 10 millones de transacciones semanales, brindando sistemas súper rápidos, respaldos ininterrumpibles y expansión fluida para cualquier tamaño de punto de venta.
          </p>
        </div>
      </section>

      <section id="casos-exito" className="new-info-section" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '40px', padding: '6rem 2rem', marginBottom: '6rem' }}>
        <div className="section-header reveal">
          <h2>Impacto Medible</h2>
          <p>La estabilidad de nuestros módulos permitió transformar estos números en la realidad de nuestros clientes.</p>
        </div>
        <div className="info-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', textAlign: 'center' }}>
          <div className="glass-panel" style={{ padding: '3rem 2rem' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>+500</div>
            <p style={{ color: 'var(--text-dim)' }}>Comercios Activos Diarios</p>
          </div>
          <div className="glass-panel" style={{ padding: '3rem 2rem' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>99.9%</div>
            <p style={{ color: 'var(--text-dim)' }}>Disponibilidad (SLA Oficial)</p>
          </div>
          <div className="glass-panel" style={{ padding: '3rem 2rem' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>2M+</div>
            <p style={{ color: 'var(--text-dim)' }}>Facturas Trazadas al Mes</p>
          </div>
        </div>
      </section>
    </main>
  );
}
