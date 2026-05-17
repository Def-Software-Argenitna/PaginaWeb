import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../Context/useAuth';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setIsAdmin(false);
      return;
    }
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'config', 'admins'));
        if (!snap.exists()) { setIsAdmin(false); return; }
        const emails: string[] = snap.data().emails ?? [];
        setIsAdmin(emails.includes(currentUser.email ?? ''));
      } catch {
        setIsAdmin(false);
      }
    })();
  }, [currentUser]);

  if (!currentUser) return <Navigate to="/login" replace />;

  if (isAdmin === null) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', gap: '1rem', color: 'var(--text-dim)',
        fontFamily: 'var(--font-manrope)',
      }}>
        <div style={{
          width: 28, height: 28, border: '2px solid rgba(255,255,255,0.15)',
          borderTopColor: 'var(--accent-cyan)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        Verificando permisos…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh', gap: '1rem',
        textAlign: 'center', padding: '2rem', fontFamily: 'var(--font-manrope)',
      }}>
        <span style={{ fontSize: '3rem' }}>🔒</span>
        <h2 style={{ color: '#f43f5e', margin: 0, fontSize: '1.75rem' }}>Acceso denegado</h2>
        <p style={{ color: 'var(--text-dim)', margin: 0 }}>
          No tenés permisos para acceder al panel de administración.
        </p>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', margin: 0 }}>
          Contactá al administrador del sistema para solicitar acceso.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
