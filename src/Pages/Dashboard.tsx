import { useState } from 'react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('licencia');

  return (
    <main className="new-main-content" style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', padding: '0 2rem' }}>
        
        {/* Sidebar Nav */}
        <div className="glass-panel reveal" style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', height: 'fit-content' }}>
          <div style={{ padding: '0 1rem', marginBottom: '1.5rem' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Portal Privado</p>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginTop: '0.5rem' }}>Mi Comercio</h3>
          </div>
          
          <button onClick={() => setActiveTab('licencia')} className={`modern-btn ${activeTab === 'licencia' ? 'main-btn' : 'secondary-btn'}`} style={{ border: 'none', textAlign: 'left', justifyContent: 'flex-start', padding: '0.8rem 1rem', background: activeTab === 'licencia' ? 'var(--accent-cyan)' : 'transparent', color: activeTab === 'licencia' ? '#000' : '#fff' }}>
            Estado de Licencia
          </button>
          <button onClick={() => setActiveTab('pagos')} className={`modern-btn ${activeTab === 'pagos' ? 'main-btn' : 'secondary-btn'}`} style={{ border: 'none', textAlign: 'left', justifyContent: 'flex-start', padding: '0.8rem 1rem', background: activeTab === 'pagos' ? 'var(--accent-cyan)' : 'transparent', color: activeTab === 'pagos' ? '#000' : '#fff' }}>
            Métodos de Pago
          </button>
          <button onClick={() => setActiveTab('facturas')} className={`modern-btn ${activeTab === 'facturas' ? 'main-btn' : 'secondary-btn'}`} style={{ border: 'none', textAlign: 'left', justifyContent: 'flex-start', padding: '0.8rem 1rem', background: activeTab === 'facturas' ? 'var(--accent-cyan)' : 'transparent', color: activeTab === 'facturas' ? '#000' : '#fff' }}>
            Mis Facturas
          </button>
          <button onClick={() => setActiveTab('soporte')} className={`modern-btn ${activeTab === 'soporte' ? 'main-btn' : 'secondary-btn'}`} style={{ border: 'none', textAlign: 'left', justifyContent: 'flex-start', padding: '0.8rem 1rem', background: activeTab === 'soporte' ? 'var(--accent-cyan)' : 'transparent', color: activeTab === 'soporte' ? '#000' : '#fff' }}>
            Tickets de Soporte
          </button>
        </div>

        {/* Action Panel */}
        <div className="glass-panel reveal" style={{ padding: '3rem', minHeight: '600px' }}>
          
          {activeTab === 'licencia' && (
            <div className="reveal active">
              <h2 style={{ color: '#fff', marginBottom: '2rem' }}>Resumen de Suscripción</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--accent-cyan)' }}>
                  <p style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Plan Actual</p>
                  <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>Profesional</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></div>
                    <span style={{ color: '#00ff88', fontWeight: 600 }}>Totalmente Operativo</span>
                  </div>
                </div>
                <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                  <p style={{ color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Próxima Renovación</p>
                  <h3 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem' }}>28 Días</h3>
                  <p style={{ color: '#a9a9b8' }}>Se cobrarán $129 USD el 20 de Octubre.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pagos' && (
            <div className="reveal active">
              <h2 style={{ color: '#fff', marginBottom: '2rem' }}>Métodos de Pago</h2>
              <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: '#fff', color: '#000', padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.8rem' }}>VISA</div>
                  <div>
                    <h4 style={{ color: '#fff', margin: 0 }}>Tarjeta de Crédito terminada en 4242</h4>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Expira 12/28</span>
                  </div>
                </div>
                <span style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', cursor: 'pointer' }}>Editar</span>
              </div>
              <button className="modern-btn secondary-btn" style={{ marginTop: '2rem' }}>+ Agregar nuevo método</button>
            </div>
          )}

          {activeTab === 'facturas' && (
            <div className="reveal active">
              <h2 style={{ color: '#fff', marginBottom: '2rem' }}>Facturación Histórica</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', color: '#fff' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <th style={{ padding: '1rem', color: 'var(--text-dim)' }}>Fecha</th>
                      <th style={{ padding: '1rem', color: 'var(--text-dim)' }}>Monto</th>
                      <th style={{ padding: '1rem', color: 'var(--text-dim)' }}>Estado</th>
                      <th style={{ padding: '1rem', color: 'var(--text-dim)' }}>PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1,2,3].map((n) => (
                      <tr key={n} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem' }}>20 Septiembre 2024</td>
                        <td style={{ padding: '1rem' }}>$129.00</td>
                        <td style={{ padding: '1rem' }}><span style={{ padding: '4px 8px', background: 'rgba(0, 255, 136, 0.1)', color: '#00ff88', borderRadius: '4px', fontSize: '0.85rem' }}>Pagado</span></td>
                        <td style={{ padding: '1rem' }}><button style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer' }}>Descargar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'soporte' && (
            <div className="reveal active">
              <h2 style={{ color: '#fff', marginBottom: '2rem' }}>Centro de Tickets</h2>
              <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>Genera consultas técnicas directas hacia nuestros ejecutivos. Los planes Profesionales y Enterprise tienen prioridad alta (SLA &lt; 2 horas).</p>
              
              <form className="contact-form" onSubmit={(e) => e.preventDefault()} style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                <div className="form-group">
                  <label>Asunto del Ticket</label>
                  <input type="text" placeholder="Ej: Error al conectar impresora IP" />
                </div>
                <div className="form-group">
                  <label>Descripción detallada</label>
                  <textarea rows={4} placeholder="Describe qué estabas haciendo y qué esperabas ver..."></textarea>
                </div>
                <button className="modern-btn main-btn" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>Abrir Ticket Prioritario</button>
              </form>
            </div>
          )}

        </div>
      </div>

    </main>
  );
}
