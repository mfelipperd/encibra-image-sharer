import React, { type ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useAuthModal } from '../hooks/useAuthModal';
import { ModalLogin } from './ModalLogin';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { isLoginModalOpen, closeLoginModal } = useAuthModal();

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="bg-background min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Você precisa fazer login para acessar esta página</div>
        </div>
        <ModalLogin
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
        />
      </>
    );
  }

  return <>{children}</>;
};
