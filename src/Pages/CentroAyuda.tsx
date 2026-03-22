export default function CentroAyuda() {
  const faqs = [
    { q: "¿Cómo migro mi catálogo de productos actual?", a: "Puedes importar tus artículos masivamente utilizando nuestra plantilla en formato Excel (.xlsx). El sistema mapea las columnas automáticamente en menos de 2 minutos." },
    { q: "¿El módulo de ventas funciona sin internet?", a: "Sí, el Punto de Venta (POS) posee tecnología offline-first. Seguirás facturando con normalidad y los datos se sincronizarán en la nube apenas vuelva la conexión." },
    { q: "¿Cómo integro la facturación electrónica?", a: "Ofrecemos conexión directa con los principales entes recaudadores (AFIP, SII, SUNAT, etc.). Solo necesitas cargar tu certificado digital en el panel de Configuración Fiscal." },
    { q: "¿Puedo limitar qué sucursales ve cada empleado?", a: "Absolutamente. El administrador puede crear roles y establecer qué módulos y qué almacenes específicos puede ver cada cuenta de usuario." }
  ];

  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '3rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Centro de Ayuda</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', marginBottom: '3rem' }}>
            Respuestas rápidas para acompañar el crecimiento de tu comercio.
          </p>
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Ej: Cómo configurar mi impresora térmica..." 
              style={{ width: '100%', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border-glass-hover)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '1.1rem', outline: 'none' }} 
            />
            <button className="modern-btn nav-btn" style={{ position: 'absolute', right: '10px', top: '10px', height: 'calc(100% - 20px)' }}>Buscar</button>
          </div>
        </div>
      </section>

      <section className="new-info-section" style={{ paddingTop: '2rem' }}>
        <div className="section-header reveal">
          <h2>Preguntas Frecuentes</h2>
        </div>
        <div className="info-grid reveal" style={{ gridTemplateColumns: 'minmax(300px, 800px)', justifyContent: 'center' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="glass-panel" style={{ padding: '2rem', textAlign: 'left', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                {faq.q}
              </h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, paddingLeft: '30px' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
