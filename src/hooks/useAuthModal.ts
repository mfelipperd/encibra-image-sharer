import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useAuthModal = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const requireAuth = (callback?: () => void) => {
    if (isAuthenticated) {
      callback?.();
    } else {
      openLoginModal();
    }
  };

  return {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    requireAuth,
    isAuthenticated
  };
};
