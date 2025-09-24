import React, { useRef } from 'react';
import {
  Camera,
  ImageSquare,
  X
} from 'phosphor-react';

interface ModalEnviarFotoProps {
  isOpen: boolean;
  onClose: () => void;
  onTirarNovaFoto: () => void;
  onEnviarDaGaleria: (files: FileList) => void;
}

export const ModalEnviarFoto: React.FC<ModalEnviarFotoProps> = ({
  isOpen,
  onClose,
  onTirarNovaFoto,
  onEnviarDaGaleria
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleTirarNovaFoto = () => {
    // Abre a câmera do dispositivo
    cameraInputRef.current?.click();
  };

  const handleEnviarDaGaleria = () => {
    // Abre a galeria de arquivos
    fileInputRef.current?.click();
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onTirarNovaFoto();
      onClose();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onEnviarDaGaleria(files);
      onClose();
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

      {/* Título no centro */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-white font-sans-black text-2xl md:text-3xl font-black mb-2">
          Enviar Foto
        </h2>
        <p className="text-text-secondary font-sans text-base md:text-lg">
          Escolha como você quer enviar sua foto
        </p>
      </div>

      {/* Botões de ação na base da tela */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6">
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Botão Tirar Nova Foto */}
          <button
            onClick={handleTirarNovaFoto}
            className="bg-primary border-0 rounded-[24px] p-4 md:p-6 flex flex-row gap-3 md:gap-[14px] items-center justify-center h-[60px] md:h-[70px] relative overflow-hidden backdrop-blur-xs cursor-pointer transition-all duration-300 ease-in-out hover:bg-primary-hover hover:-translate-y-0.5 shadow-lg animate-stagger-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Camera size={24} weight="fill" className="flex-shrink-0 text-[#212121]" />
            <div className="text-[#212121] text-center font-sans-bold text-lg md:text-xl leading-[22px] md:leading-[28px] font-bold relative flex items-center justify-center">
              Tirar nova foto
            </div>
          </button>

          {/* Botão Enviar da Galeria */}
          <button
            onClick={handleEnviarDaGaleria}
            className="bg-black/80 border-0 rounded-[24px] p-4 md:p-6 flex flex-row gap-3 md:gap-[14px] items-center justify-center h-[60px] md:h-[70px] relative overflow-hidden backdrop-blur-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/90 hover:-translate-y-0.5 shadow-lg animate-stagger-up"
            style={{ animationDelay: '0.4s' }}
          >
            <ImageSquare size={24} weight="fill" className="flex-shrink-0 text-white" />
            <div className="text-white text-center font-sans text-lg md:text-xl leading-[22px] md:leading-[28px] font-normal relative flex items-center justify-center">
              Enviar da Galeria
            </div>
          </button>
        </div>
      </div>

      {/* Inputs ocultos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={true}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCameraCapture}
        style={{ display: 'none' }}
      />
    </div>
  );
};
