export default function SobreNosotros() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '4rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Nuestra misión</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Empoderar al comercio local con la misma infraestructura que hoy utilizan las grandes compañías.
          </p>
        </div>
      </section>

      <section id="sobre-nosotros" className="new-info-section" style={{ paddingTop: '2rem' }}>
        <div className="glass-panel reveal" style={{ padding: '3rem', textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto' }}>
            Fundada en 2024, DEF Software nació de la necesidad de simplificar la facturación y el inventario para equipos ágiles, evitando planillas eternas. Hoy procesamos millones de transacciones semanales, brindando sistemas rápidos, respaldos ininterrumpibles y una expansión fluida para cualquier tamaño de punto de venta.
          </p>
        </div>
      </section>
    </main>
  );
}
