export default function Contacto() {
  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '3rem', paddingTop: '10rem' }}>
        <div className="hero-panel reveal" style={{ padding: '0', background: 'none', border: 'none', boxShadow: 'none' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', marginBottom: '1rem', lineHeight: 1.1 }}>Contacto comercial</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Hablemos hoy sobre cómo estandarizar los procesos de tu sucursal.
          </p>
        </div>
      </section>

      <section id="contacto" className="new-info-section" style={{ paddingTop: '0' }}>
        <div className="glass-panel reveal" style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 3rem' }}>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" placeholder="Ej. Juan" required />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input type="text" placeholder="Ej. Pérez" required />
              </div>
            </div>
            <div className="form-group">
              <label>Razón social / Comercio</label>
              <input type="text" placeholder="Nombre de la factura" />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" placeholder="hola@tuempresa.com" required />
            </div>
            <div className="form-group">
              <label>Mensaje detallado</label>
              <textarea rows={5} placeholder="Cuéntanos cuántas sucursales tienes y qué módulo necesitas..." required></textarea>
            </div>
            <button type="submit" className="modern-btn main-btn" style={{ width: '100%', marginTop: '1.5rem', padding: '1.2rem' }}>Enviar solicitud</button>
          </form>
        </div>
      </section>
    </main>
  );
}
