export default function Plataforma() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '3rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Plataforma DEF</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            Explora la arquitectura modular diseñada para manejar el flujo total de tu comercio. Desde el punto de venta hasta la conciliación bancaria.
          </p>
        </div>
      </section>

      <section className="new-info-section" style={{ paddingTop: '0' }}>
        <div className="info-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="glass-panel reveal" style={{ padding: '3rem', display: 'flex', gap: '3rem', alignItems: 'center', textAlign: 'left' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '1rem' }}>Punto de venta (POS) ultrarrápido</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Atiende a tus clientes en segundos. Nuestro módulo POS funciona incluso si pierdes conexión a internet temporalmente. Soporta códigos de barra, balanzas electrónicas, integración con impresoras térmicas y cobro multi-moneda.
              </p>
              <ul style={{ color: 'var(--text-main)', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>✓ Integración fiscal nativa</li>
                <li>✓ Control de apertura y cierre de caja</li>
                <li>✓ Aplicación de descuentos y promociones</li>
              </ul>
            </div>
          </div>

          <div className="glass-panel reveal" style={{ padding: '3rem', display: 'flex', gap: '3rem', alignItems: 'center', textAlign: 'left' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '1rem' }}>Sincronización de inventarios</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Tu mercadería siempre bajo control. Ya sea en un local pequeño o en un depósito de miles de metros cuadrados, visualiza las existencias reales, recibe alertas de stock crítico y gestiona transferencias al instante.
              </p>
              <ul style={{ color: 'var(--text-main)', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>✓ Matriz de talles y colores</li>
                <li>✓ Lote y vencimiento automático</li>
                <li>✓ Proveedores y listas de precios</li>
              </ul>
            </div>
          </div>

          <div className="glass-panel reveal" style={{ padding: '3rem', display: 'flex', gap: '3rem', alignItems: 'center', textAlign: 'left' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '1rem' }}>Inteligencia comercial interna</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                El algoritmo de DEF audita tus métricas. Descubre cuáles son tus artículos de mejor rotación, qué sucursales generan mayor margen y prevé la demanda de los próximos meses utilizando modelos estadísticos.
              </p>
              <ul style={{ color: 'var(--text-main)', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li>✓ Reportes de rentabilidad</li>
                <li>✓ Dashboard de auditoría</li>
                <li>✓ Exportación a Excel y BI Tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
