import React from 'react';
import { X, GoogleLogo } from 'phosphor-react';
import { useAuth } from '../contexts/AuthContext';

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalLogin: React.FC<ModalLoginProps> = ({
  isOpen,
  onClose
}) => {
  const { login, isLoading } = useAuth();

  if (!isOpen) return null;

  const handleLogin = async () => {
    try {
      await login();
      onClose();
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]">
      {/* Botão fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-[201]"
      >
        <X size={24} weight="regular" />
      </button>

      {/* Conteúdo do modal */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="bg-glass border border-glass rounded-2xl p-8 md:p-12 max-w-md w-full backdrop-blur-md">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[100px] bg-black rounded-[110px] blur-[50px] opacity-30"></div>
            <img 
              className="relative w-[120px] h-[80px] mb-4" 
              src="/logo.png" 
              alt="Logo" 
            />
          </div>

          {/* Título */}
          <h2 className="text-white font-sans-black text-2xl md:text-3xl font-black mb-4">
            Bem-vindo!
          </h2>
          
          <p className="text-text-secondary font-sans text-base md:text-lg mb-8">
            Faça login para enviar e gerenciar suas fotos da festa
          </p>

          {/* Botão de login */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="bg-white border-0 rounded-[24px] p-4 md:p-6 flex flex-row gap-3 md:gap-[14px] items-center justify-center w-full h-[60px] md:h-[70px] relative overflow-hidden backdrop-blur-xs cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
              <>
                <GoogleLogo size={24} weight="fill" className="flex-shrink-0 text-[#4285F4]" />
                <div className="text-gray-800 text-center font-sans-bold text-lg md:text-xl leading-[22px] md:leading-[28px] font-bold relative flex items-center justify-center">
                  Entrar com Google
                </div>
              </>
            )}
          </button>

          {/* Informações adicionais */}
          <div className="mt-6 text-text-muted text-xs text-center">
            Ao fazer login, você concorda com nossos termos de uso
          </div>
        </div>
      </div>
    </div>
  );
};
