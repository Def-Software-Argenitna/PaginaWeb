import React, { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (email: string, pass: string) => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnimatedLoader, setShowAnimatedLoader] = useState(true);
  const [loaderText, setLoaderText] = useState('Autenticando...');

  function login(email: string, pass: string) {
    return signInWithEmailAndPassword(auth, email, pass);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const minDelay = new Promise((resolve) => setTimeout(resolve, 1500));

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      await minDelay;
      setLoaderText(user ? '¡Autenticado!' : 'Listo');

      setTimeout(() => {
        setShowAnimatedLoader(false);
      }, 600);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {showAnimatedLoader && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transition: 'opacity 0.5s ease', opacity: loading ? 1 : 0.8 }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '2rem' }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid rgba(0, 242, 255, 0.2)', borderTopColor: 'var(--accent-cyan)', animation: 'spin 1s linear infinite' }}></div>
          </div>
          <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '2px' }}>{loaderText}</h2>
        </div>
      )}
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      {(!loading || !showAnimatedLoader) && children}
    </AuthContext.Provider>
  );
}
