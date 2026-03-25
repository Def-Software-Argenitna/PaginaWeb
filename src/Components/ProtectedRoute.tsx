import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
