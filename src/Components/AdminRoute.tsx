import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';

const ADMIN_EMAILS = [
  'valentinmuzzio1@gmail.com',
  'valentinmuzzio585@gmail.com',
];

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;

  if (!ADMIN_EMAILS.includes(currentUser.email ?? '')) {
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
      </div>
    );
  }

  return <>{children}</>;
}
