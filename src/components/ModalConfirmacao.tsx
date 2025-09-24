import React from 'react';
import {
  Warning,
  Check,
  X
} from 'phosphor-react';

interface ModalConfirmacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  tipo?: 'perigo' | 'sucesso' | 'aviso';
  isLoading?: boolean;
}

export const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensagem,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  tipo = 'perigo',
  isLoading = false
}) => {
  if (!isOpen) return null;

  const getTipoConfig = () => {
    switch (tipo) {
      case 'perigo':
        return {
          icon: Warning,
          iconColor: 'text-red-400',
          confirmButtonClass: 'bg-red-600 hover:bg-red-700 text-white',
          iconBg: 'bg-red-600/20'
        };
      case 'sucesso':
        return {
          icon: Check,
          iconColor: 'text-green-400',
          confirmButtonClass: 'bg-green-600 hover:bg-green-700 text-white',
          iconBg: 'bg-green-600/20'
        };
      case 'aviso':
        return {
          icon: Warning,
          iconColor: 'text-yellow-400',
          confirmButtonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white',
          iconBg: 'bg-yellow-600/20'
        };
      default:
        return {
          icon: Warning,
          iconColor: 'text-red-400',
          confirmButtonClass: 'bg-red-600 hover:bg-red-700 text-white',
          iconBg: 'bg-red-600/20'
        };
    }
  };

  const config = getTipoConfig();
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
      {/* Container do modal */}
      <div className="bg-glass border border-glass rounded-2xl p-6 md:p-8 max-w-md w-full backdrop-blur-md animate-scale-in">
        {/* Ícone */}
        <div className={`${config.iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
          <IconComponent size={32} weight="fill" className={config.iconColor} />
        </div>

        {/* Título */}
        <h2 className="text-white font-sans-black text-xl md:text-2xl font-black text-center mb-4">
          {titulo}
        </h2>

        {/* Mensagem */}
        <p className="text-text-secondary font-sans text-base md:text-lg text-center mb-8 leading-relaxed">
          {mensagem}
        </p>

        {/* Botões */}
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Botão Confirmar */}
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`${config.confirmButtonClass} border-0 rounded-[24px] p-4 md:p-6 flex flex-row gap-3 md:gap-[14px] items-center justify-center h-[60px] md:h-[70px] relative overflow-hidden backdrop-blur-xs cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Check size={24} weight="fill" className="flex-shrink-0" />
            <div className="text-center font-sans-bold text-lg md:text-xl leading-[22px] md:leading-[28px] font-bold relative flex items-center justify-center">
              {isLoading ? 'Processando...' : textoConfirmar}
            </div>
          </button>

          {/* Botão Cancelar */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="bg-black/80 border-0 rounded-[24px] p-4 md:p-6 flex flex-row gap-3 md:gap-[14px] items-center justify-center h-[60px] md:h-[70px] relative overflow-hidden backdrop-blur-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/90 hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={24} weight="fill" className="flex-shrink-0 text-white" />
            <div className="text-white text-center font-sans text-lg md:text-xl leading-[22px] md:leading-[28px] font-normal relative flex items-center justify-center">
              {textoCancelar}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
