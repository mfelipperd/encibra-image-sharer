import React, { useState } from 'react';
import { BotaoEnviarFoto } from './BotaoEnviarFoto';
import { ModalEnviarFoto } from './ModalEnviarFoto';
import { ModalLogin } from './ModalLogin';
import { useAuthModal } from '../hooks/useAuthModal';

interface InicioProps {
  className?: string;
}

export const Inicio: React.FC<InicioProps> = ({ 
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { requireAuth, isLoginModalOpen, closeLoginModal } = useAuthModal();
  return (
    <div className={`bg-background min-h-screen relative overflow-hidden flex items-center justify-center p-3 animate-fade-in ${className}`}>
      {/* Imagem de fundo com blur */}
      <img 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 w-[988px] h-[988px] md:w-[600px] md:h-[600px] object-cover blur-[58px] opacity-60 z-[1] animate-scale-in" 
        src="/fundo.png" 
        alt="Fundo" 
      />
      
      {/* Container principal */}
      <div className="relative z-[10] flex flex-col items-center justify-center gap-6 p-[84px_24px] md:p-[60px_20px] w-[439px] max-w-[439px] md:w-full md:max-w-[439px] animate-slide-in-left">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center pb-[30px] relative">
          {/* Efeito de blur atrás do logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[313px] h-[140px] bg-black rounded-[110px] blur-[50px]"></div>
          <img 
            className="relative w-[200px]" 
            src="/logo.png" 
            alt="Logo" 
          />
        </div>
        
        {/* Texto */}
        <div className="flex flex-col gap-6 items-center justify-start w-[393px] max-w-[393px] md:w-full md:max-w-[393px]">
          <div className="text-white text-center">
            <span className="font-sans text-[26.997617721557617px] leading-[38.11px] md:text-[22px] md:leading-[32px] font-normal">
              Bem-vindo a nossa
              <br />
            </span>
            <span className="font-sans-black text-[36px] leading-[36px] md:text-[28px] md:leading-[28px] font-black">
              Galeria de Fotos
            </span>
          </div>
          
          <div className="text-white text-justify font-sans text-lg leading-[123%] md:text-base font-normal w-full">
            Envie suas fotos da festa de 60 anos da Encibra e ajude a criar um
            álbum coletivo cheio de memórias especiais.
            <br />
            <br />
            Todas as imagens ficam disponíveis para os convidados, tornando a
            celebração ainda mais divertida e inesquecível!
          </div>
        </div>
        
        {/* Botão principal */}
        <BotaoEnviarFoto 
          className="w-full"
          onClick={() => requireAuth(() => setIsModalOpen(true))}
        />
        
        {/* Menu de itens */}
        <div className="flex flex-col gap-3 items-center justify-center w-[393px] max-w-[393px] md:w-full md:max-w-[393px]">
          <div 
            className="bg-glass border border-glass rounded-[61.48px] p-6 flex items-center justify-center w-full h-[60px] backdrop-blur-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-white/20 user-select-none text-decoration-none"
            onClick={() => requireAuth(() => window.location.href = '/my-photos')}
          >
            <div className="text-[#d6d6d6] text-center font-sans text-[19.719999313354492px] leading-[27.84px] md:text-base font-normal">
              Minhas Fotos
            </div>
          </div>
          
          <div 
            className="bg-glass border border-glass rounded-[61.48px] p-6 flex items-center justify-center w-full h-[60px] backdrop-blur-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-white/20 user-select-none text-decoration-none"
            onClick={() => requireAuth(() => window.location.href = '/shared-photos')}
          >
            <div className="text-[#d6d6d6] text-center font-sans text-[19.719999313354492px] leading-[27.84px] md:text-base font-normal">
              Ver fotos enviadas
            </div>
          </div>
        </div>
      </div>
      
      {/* Gráfico de animação */}
      <img
        className="absolute left-3 -top-[522px] w-[416px] h-[1032px] opacity-20 z-[2]"
        src="/fundo-grafismo-animacao.svg"
        alt="Gráfico de animação"
      />

      {/* Modal de Envio de Foto */}
      <ModalEnviarFoto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTirarNovaFoto={() => {
          console.log('Tirar nova foto');
        }}
        onEnviarDaGaleria={(files) => {
          console.log('Arquivos selecionados da galeria:', files);
          Array.from(files).forEach(file => {
            console.log('Arquivo:', file.name, 'Tamanho:', file.size, 'Tipo:', file.type);
          });
        }}
      />

      {/* Modal de Login */}
      <ModalLogin
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
      />
    </div>
  );
};
