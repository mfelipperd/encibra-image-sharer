import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowBendUpLeft,
  Heart,
  Camera,
  SignOut
} from 'phosphor-react';
import { ModalEnviarFoto } from './ModalEnviarFoto';
import { useAuth } from '../contexts/AuthContext';

interface VerFotosEnviadasProps {
  className?: string;
  onFavoritarFoto?: (index: number) => void;
  onTirarNovaFoto?: () => void;
  onEnviarDaGaleria?: (files: FileList) => void;
}

export const VerFotosEnviadas: React.FC<VerFotosEnviadasProps> = ({
  className = '',
  onFavoritarFoto,
  onTirarNovaFoto,
  onEnviarDaGaleria
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout, usuario } = useAuth();
  
  // Dados mock das fotos enviadas
  const fotosEnviadas = [
    {
      id: 1,
      horario: '09h15',
      tempoAtras: 'Há 2 horas',
      imagem: '/foto0.png',
      curtidas: 12,
      autor: 'Maria Silva'
    },
    {
      id: 2,
      horario: '10h30',
      tempoAtras: 'Há 1 hora',
      imagem: '/foto1.png',
      curtidas: 8,
      autor: 'João Santos'
    },
    {
      id: 3,
      horario: '11h00',
      tempoAtras: 'Há 45 minutos',
      imagem: '/foto2.png',
      curtidas: 15,
      autor: 'Ana Costa'
    },
    {
      id: 4,
      horario: '11h30',
      tempoAtras: 'Há 30 minutos',
      imagem: '/foto3.png',
      curtidas: 6,
      autor: 'Carlos Oliveira'
    },
    {
      id: 5,
      horario: '12h00',
      tempoAtras: 'Há 15 minutos',
      imagem: '/foto0.png',
      curtidas: 22,
      autor: 'Lucia Ferreira'
    },
    {
      id: 6,
      horario: '12h15',
      tempoAtras: 'Há 10 minutos',
      imagem: '/foto1.png',
      curtidas: 4,
      autor: 'Pedro Lima'
    }
  ];

  return (
    <div className={`bg-background p-4 pb-[140px] flex flex-col gap-4 items-center justify-start h-screen relative overflow-hidden animate-fade-in ${className}`}>
      {/* Imagem de fundo */}
      <img 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 scale-100 blur-[57.98px] object-cover z-[1] pointer-events-none w-[988px] h-[988px] flex-shrink-0 animate-scale-in" 
        src="/fundo.png" 
        alt="Fundo" 
      />

      {/* Header */}
      <div className="flex flex-row items-center justify-between self-stretch flex-shrink-0 h-fit min-h-[60px] md:min-h-[70px] lg:min-h-[80px] relative z-[15] mb-3 md:mb-4 lg:mb-6 p-2 md:p-3 lg:p-4 w-full box-border animate-slide-in-left">
        <div className="flex flex-col gap-1 md:gap-2 items-start justify-center flex-shrink-0 relative h-fit w-auto flex-1 self-center">
          <div 
            className="bg-glass border border-glass rounded-xl md:rounded-2xl flex flex-row gap-1 md:gap-1.5 items-center justify-center w-auto relative backdrop-blur-md cursor-pointer transition-colors duration-300 ease-in-out self-start px-2 py-1 md:px-3 md:py-2" 
            onClick={() => navigate('/')}
          >
            <ArrowBendUpLeft size={8} weight="regular" className="flex-shrink-0 w-2 h-2 md:w-3 md:h-3 aspect-square text-white" />
            <div className="text-white text-left font-sans text-[10px] md:text-xs leading-none font-normal relative flex items-center justify-start">Voltar</div>
          </div>
          <div className="flex flex-col gap-[1px] md:gap-1 items-start justify-center flex-shrink-0 relative self-start">
            <div className="text-text-secondary text-left font-sans text-[10px] md:text-sm leading-none font-normal relative flex items-center justify-start">
              Olá, {usuario?.nome || user?.displayName || 'Usuário'}
            </div>
            <div className="text-white text-left font-sans-black text-base md:text-xl lg:text-2xl leading-none font-black relative flex items-center justify-start">Fotos Enviadas</div>
          </div>
        </div>
        
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <img 
            className="flex-shrink-0 w-auto h-[50px] md:h-[60px] lg:h-[70px] object-contain max-w-[150px] md:max-w-[180px] lg:max-w-[200px] z-[20] self-center" 
            src="/logo.png" 
            alt="Logo" 
          />
          
          {/* Botão de Logout */}
          <div 
            className="bg-glass border border-glass rounded-xl md:rounded-2xl flex flex-row gap-1 md:gap-1.5 items-center justify-center w-auto relative backdrop-blur-md cursor-pointer transition-colors duration-300 ease-in-out px-2 py-1 md:px-3 md:py-2 hover:bg-white/20" 
            onClick={logout}
          >
            <SignOut size={8} weight="regular" className="flex-shrink-0 w-2 h-2 md:w-3 md:h-3 aspect-square text-white" />
            <div className="text-white text-left font-sans text-[10px] md:text-xs leading-none font-normal relative flex items-center justify-start">Sair</div>
          </div>
        </div>
      </div>

      {/* Container das fotos */}
      <div className="bg-glass-light border border-glass-light rounded-lg p-4 md:p-5 lg:p-6 flex flex-col gap-4 md:gap-5 lg:gap-6 items-start justify-start flex-1 w-full max-w-[400px] md:max-w-[440px] lg:max-w-[500px] min-h-0 relative overflow-y-auto overflow-x-hidden backdrop-blur-sm z-[5] mb-5 md:mb-6 lg:mb-6 max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-140px)] lg:max-h-[calc(100vh-160px)] animate-slide-in-right">
        {fotosEnviadas.map((foto, index) => (
          <div
            key={foto.id}
            className="rounded-[5px] flex flex-col gap-[10px] items-start justify-end self-stretch flex-shrink-0 h-40 md:h-[209px] relative shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden"
            style={{
              background: `url(${foto.imagem}) center`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Info do tempo */}
            <div className="bg-gradient-to-br from-black to-transparent p-[10px] flex flex-col gap-0 items-start justify-end flex-shrink-0 w-[246px] h-[43px] relative backdrop-blur-[3.85px]">
              <div className="text-text-muted text-left font-sans-bold text-xs leading-none font-bold relative flex items-center justify-start">{foto.horario}</div>
              <div className="text-white text-left font-sans text-xs leading-none font-normal relative flex items-center justify-start">{foto.tempoAtras}</div>
            </div>
            
            {/* Info do autor */}
            <div className="bg-gradient-to-br from-black to-transparent p-[10px] flex flex-col gap-0 items-start justify-end flex-shrink-0 w-[246px] h-[43px] absolute left-0 bottom-0 backdrop-blur-[3.85px]">
              <div className="text-text-muted text-left font-sans-bold text-xs leading-none font-bold relative flex items-center justify-start">Por: {foto.autor}</div>
              <div className="text-white text-left font-sans text-xs leading-none font-normal relative flex items-center justify-start">{foto.curtidas} curtidas</div>
            </div>

            {/* Botão de ação */}
            <div className="bg-gradient-to-br from-black to-transparent p-[10px] flex flex-row gap-[5px] items-center justify-start flex-shrink-0 w-[246px] h-[43px] absolute right-[-246px] bottom-0 origin-[0_0] rotate-0 scale-x-[-1] backdrop-blur-[3.85px]">
              <div className="flex flex-row gap-[8px] items-center justify-center flex-shrink-0 relative">
                {/* Botão Favoritar */}
                <div 
                  className="bg-glass border border-glass rounded-[61.48px] flex flex-row gap-2 items-center justify-between flex-shrink-0 backdrop-blur-sm cursor-pointer transition-colors duration-300 ease-in-out px-[10px] py-[5px]" 
                  onClick={() => onFavoritarFoto?.(index)}
                >
                  <p className="text-accent text-right font-sans text-[9px] leading-none font-normal scale-x-[-1]">Favoritar</p>
                  <Heart size={15} weight="regular" className="flex-shrink-0 w-[15px] h-[15px] text-accent scale-x-[-1]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de animação */}
      <img
        className="opacity-30 flex-shrink-0 w-[300px] h-[800px] absolute left-2 -top-5 overflow-visible z-[2] pointer-events-none animate-slide-in-left"
        src="/fundo-grafismo-animacao.svg"
        alt="Gráfico de animação"
      />

      {/* Botão de ação principal */}
      <div className="bg-transparent p-2 md:p-2.5 lg:p-3 flex flex-col gap-2 md:gap-2.5 lg:gap-3 items-center justify-center flex-shrink-0 w-full max-w-[400px] md:max-w-[440px] lg:max-w-[500px] fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-5 lg:bottom-6 backdrop-blur-lg z-[100] animate-slide-up">
        <div 
          className="bg-primary border-0 rounded-[24px] p-4 md:p-6 lg:p-6 flex flex-row gap-[10px] md:gap-[14px] lg:gap-[14px] items-center justify-center self-stretch flex-shrink-0 h-[50px] md:h-[60px] lg:h-[60px] relative overflow-hidden backdrop-blur-xs cursor-pointer transition-all duration-300 ease-in-out hover:bg-primary-hover hover:-translate-y-0.5" 
          onClick={() => setIsModalOpen(true)}
        >
          <Camera size={20} weight="fill" className="flex-shrink-0 text-[#212121]" />
          <div className="text-[#212121] text-center font-sans-bold text-base md:text-xl lg:text-xl leading-[22px] md:leading-[28px] lg:leading-[28px] font-bold relative flex items-center justify-center">Enviar Foto</div>
        </div>
      </div>

      {/* Modal */}
      <ModalEnviarFoto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTirarNovaFoto={() => {
          console.log('Tirar nova foto');
          onTirarNovaFoto?.();
        }}
        onEnviarDaGaleria={(files) => {
          console.log('Arquivos selecionados da galeria:', files);
          Array.from(files).forEach(file => {
            console.log('Arquivo:', file.name, 'Tamanho:', file.size, 'Tipo:', file.type);
          });
          onEnviarDaGaleria?.(files);
        }}
      />
    </div>
  );
};
