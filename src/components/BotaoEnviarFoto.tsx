import React, { useRef } from 'react';
import { Camera } from 'phosphor-react';

interface BotaoEnviarFotoProps {
  onClick?: () => void;
  onFileSelect?: (files: FileList) => void;
  className?: string;
  children?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
}

export const BotaoEnviarFoto: React.FC<BotaoEnviarFotoProps> = ({ 
  onClick, 
  onFileSelect,
  className = '',
  children = 'Enviar foto',
  accept = 'image/*',
  multiple = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (onFileSelect) {
      fileInputRef.current?.click();
    } else if (onClick) {
      onClick();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && onFileSelect) {
      onFileSelect(files);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`bg-primary border-0 rounded-full p-6 flex items-center gap-3 cursor-pointer transition-all duration-300 ease-in-out shadow-[0_4px_8px_rgba(0,0,0,0.15)] font-sans h-[60px] justify-center hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)] active:translate-y-0 active:shadow-[0_2px_4px_rgba(0,0,0,0.15)] focus:outline-none focus:shadow-[0_4px_8px_rgba(0,0,0,0.15),0_0_0_3px_rgba(255,215,0,0.3)] ${className}`}
      >
        <Camera size={20} weight="fill" className="text-black flex-shrink-0" />
        <span className="text-black font-semibold text-base leading-[1.2] flex-shrink-0">{children}</span>
      </button>
      
      {onFileSelect && (
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      )}
    </>
  );
};
