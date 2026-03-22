import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFakeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Credenciales incorrectas o cuenta inexistente.');
    }
    setLoading(false);
  };

  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '3rem', paddingTop: '10rem', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="glass-panel reveal" style={{ maxWidth: '400px', margin: '0 auto', padding: '3rem 2rem', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>Iniciar Sesión</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>Accede al panel de control de tu comercio.</p>
            {error && <div style={{ padding: '0.8rem', background: 'rgba(255,50,50,0.1)', color: '#ff6b6b', borderRadius: '8px', border: '1px solid #ff6b6b', marginTop: '1rem' }}>{error}</div>}
          </div>
          
          <form className="contact-form" onSubmit={handleFakeLogin}>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" placeholder="admin@tuempresa.com" required style={{ padding: '0.8rem' }} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" placeholder="••••••••" required style={{ padding: '0.8rem' }} value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem', marginBottom: '0.5rem' }}>
              <a href="#" style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', textDecoration: 'none' }}>¿Olvidaste tu contraseña?</a>
            </div>

            <button disabled={loading} type="submit" className="modern-btn main-btn" style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>{loading ? 'Validando...' : 'Ingresar al Sistema'}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
