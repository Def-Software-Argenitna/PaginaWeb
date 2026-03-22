export default function Documentacion() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '3rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Documentación API</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Integra el motor comercial DEF a tus propias plataformas e-commerce, apps móviles o ERPs legados utilizando nuestra API REST.
          </p>
        </div>
      </section>

      <section className="new-info-section" style={{ paddingTop: '0' }}>
        <div className="glass-panel reveal" style={{ maxWidth: '900px', margin: '0 auto', padding: '0', overflow: 'hidden' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderBottom: '1px solid var(--border-glass-hover)' }}>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>Autenticación Bearer</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>Todas las peticiones a la API deben incluir el encabezado de autorización usando un Bearer Token generado desde el panel de administrador comercial.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)' }}>
              <div style={{ width: '40%', padding: '2rem', borderRight: '1px solid var(--border-glass)' }}>
                <h3 style={{ color: '#fff', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ padding: '4px 8px', background: 'var(--accent-cyan)', color: '#000', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>POST</span>
                  /v1/facturas
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6 }}>Emite una nueva factura y sincroniza la transacción directamente contra el servidor de AFIP/SII.</p>
              </div>
              <div style={{ width: '60%', background: '#0d0d10', padding: '2rem' }}>
                <pre style={{ margin: 0, color: '#a9a9b8', fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
{`{
  "cliente_doc": "30123456789",
  "items": [
    {
      "sku": "DEF-991",
      "cantidad": 2,
      "precio_unitario": 1450.00
    }
  ],
  "metodo_pago": "tarjeta_credito"
}`}
                </pre>
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ width: '40%', padding: '2rem', borderRight: '1px solid var(--border-glass)' }}>
                <h3 style={{ color: '#fff', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ padding: '4px 8px', background: '#00ff88', color: '#000', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>GET</span>
                  /v1/stock/:sku
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.6 }}>Retorna la cantidad exacta en almacén global, segmentada por depósitos y sucursales.</p>
              </div>
              <div style={{ width: '60%', background: '#0d0d10', padding: '2rem' }}>
                <pre style={{ margin: 0, color: '#00ff88', fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
{`{
  "status": "success",
  "data": {
    "sku": "DEF-991",
    "total_disponible": 140,
    "depositos": [
      { "id": 1, "qty": 100 },
      { "id": 2, "qty": 40 }
    ]
  }
}`}
                </pre>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
