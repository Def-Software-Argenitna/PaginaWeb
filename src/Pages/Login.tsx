import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth logic before Firebase is linked
    navigate('/dashboard');
  };

  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '3rem', paddingTop: '10rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="glass-panel reveal" style={{ maxWidth: '400px', margin: '0 auto', padding: '3rem 2rem', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>Iniciar Sesión</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Accede al panel de control de tu comercio.</p>
          </div>
          
          <form className="contact-form" onSubmit={handleFakeLogin}>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" placeholder="admin@tuempresa.com" required style={{ padding: '0.8rem' }} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" placeholder="••••••••" required style={{ padding: '0.8rem' }} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
              <a href="#" style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', textDecoration: 'none' }}>¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="modern-btn main-btn" style={{ width: '100%' }}>Ingresar al Sistema</button>
          </form>
        </div>
      </section>
    </main>
  );
}
