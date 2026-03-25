export default function EstadoSistema() {
  const servicios = [
    { nombre: 'Dashboard y punto de venta', estado: 'Operativo', color: '#00ff88' },
    { nombre: 'API principal (REST / GraphQL)', estado: 'Operativo', color: '#00ff88' },
    { nombre: 'Motor de facturación electrónica', estado: 'Operativo', color: '#00ff88' },
    { nombre: 'Sincronizador multitienda', estado: 'Degradado', color: '#ffd700' },
    { nombre: 'Pasarelas de cobro', estado: 'Operativo', color: '#00ff88' },
  ];

  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '3rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Estado de la red</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Monitoreo en tiempo real de nuestra infraestructura cloud.
          </p>
        </div>
      </section>

      <section className="new-info-section" style={{ paddingTop: '0' }}>
        <div className="glass-panel reveal" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>Todos los sistemas están estables</h2>
              <p style={{ color: 'var(--text-dim)', margin: '0.5rem 0 0 0' }}>Actualizado hace 2 minutos.</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0, 255, 136, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {servicios.map((servicio) => (
              <div key={servicio.nombre} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>{servicio.nombre}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: servicio.color, fontWeight: 700 }}>{servicio.estado}</span>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: servicio.color, boxShadow: `0 0 8px ${servicio.color}` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
