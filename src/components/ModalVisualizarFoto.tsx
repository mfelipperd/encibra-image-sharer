import React from 'react';
import { X, Heart, Trash, Download } from 'phosphor-react';
import type { Foto } from '../services/types';

interface ModalVisualizarFotoProps {
  isOpen: boolean;
  onClose: () => void;
  foto: Foto | null;
  onToggleCurtida?: (foto: Foto) => void;
  onDeletarFoto?: (foto: Foto) => void;
  onDownloadFoto?: (foto: Foto) => void;
  showActions?: boolean;
  isMinhaFoto?: boolean;
  isFavoritada?: boolean;
}

export const ModalVisualizarFoto: React.FC<ModalVisualizarFotoProps> = ({
  isOpen,
  onClose,
  foto,
  onToggleCurtida,
  onDeletarFoto,
  onDownloadFoto,
  showActions = true,
  isMinhaFoto = false,
  isFavoritada = false
}) => {
  if (!isOpen || !foto) return null;

  const handleDownload = () => {
    if (onDownloadFoto) {
      onDownloadFoto(foto);
    } else {
      // Download padrão
      const link = document.createElement('a');
      link.href = foto.url;
      link.download = foto.nome || `foto-${foto.id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[400] flex items-center justify-center p-4">
      {/* Botão fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-[401] bg-black/50 rounded-full p-2"
      >
        <X size={24} weight="regular" />
      </button>

      {/* Container da imagem */}
      <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center">
        {/* Imagem */}
        <img
          src={foto.url}
          alt={`Foto de ${foto.autor}`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />

        {/* Overlay com informações */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
          {/* Informações da foto */}
          <div className="text-white mb-4">
            <div className="font-sans-bold text-lg mb-2">
              Por: {foto.autor}
            </div>
            <div className="font-sans text-sm text-gray-300">
              {new Date(foto.timestamp).toLocaleString('pt-BR')}
            </div>
            <div className="font-sans text-sm text-gray-300">
              {foto.curtidas} curtidas
            </div>
          </div>

          {/* Botões de ação */}
          {showActions && (
            <div className="flex flex-row gap-3">
              {/* Botão Download */}
              <button
                onClick={handleDownload}
                className="bg-glass border border-glass rounded-[24px] p-3 flex flex-row gap-2 items-center justify-center backdrop-blur-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/20"
              >
                <Download size={20} weight="regular" className="flex-shrink-0 text-white" />
                <div className="text-white text-center font-sans text-sm font-normal">
                  Download
                </div>
              </button>

              {/* Botão Curtir/Descurtir */}
              {onToggleCurtida && (
                <button
                  onClick={() => onToggleCurtida(foto)}
                  className="bg-glass border border-glass rounded-[24px] p-3 flex flex-row gap-2 items-center justify-center backdrop-blur-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/20"
                >
                  <Heart 
                    size={20} 
                    weight={isFavoritada ? "fill" : "regular"} 
                    className={`flex-shrink-0 ${isFavoritada ? 'text-red-500' : 'text-white'}`} 
                  />
                  <div className="text-white text-center font-sans text-sm font-normal">
                    {isFavoritada ? 'Desfavoritar' : 'Favoritar'}
                  </div>
                </button>
              )}

              {/* Botão Apagar (apenas para minhas fotos) */}
              {isMinhaFoto && onDeletarFoto && (
                <button
                  onClick={() => onDeletarFoto(foto)}
                  className="bg-red-600/20 border border-red-600/30 rounded-[24px] p-3 flex flex-row gap-2 items-center justify-center backdrop-blur-md cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-600/30"
                >
                  <Trash size={20} weight="regular" className="flex-shrink-0 text-red-400" />
                  <div className="text-red-400 text-center font-sans text-sm font-normal">
                    Apagar
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
