import React from 'react';
import './Botao.css';

interface BotaoProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  larguraCompleta?: boolean;
}

export const Botao: React.FC<BotaoProps> = ({ 
  className = '', 
  children, 
  onClick, 
  type = 'button',
  larguraCompleta = false
}) => {
  const classes = `botao ${larguraCompleta ? 'botao-largura-completa' : ''} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
};
