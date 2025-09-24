import React, { useRef, useState } from 'react';
import {
  Camera,
  ImageSquare,
  X,
  Spinner
} from 'phosphor-react';
import { useAuth } from '../contexts/AuthContext';
import { useUploadFoto } from '../services/hooks';

interface ModalEnviarFotoProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
}

export const ModalEnviarFoto: React.FC<ModalEnviarFotoProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user, usuario } = useAuth();
  const uploadFoto = useUploadFoto();

  if (!isOpen) return null;

  const handleTirarNovaFoto = () => {
    // Abre a câmera do dispositivo
    cameraInputRef.current?.click();
  };

  const handleEnviarDaGaleria = () => {
    // Abre a galeria de arquivos
    fileInputRef.current?.click();
  };

  const uploadFile = async (file: File) => {
    console.log('🚀 Iniciando upload do arquivo:', file.name, 'Tamanho:', file.size);
    
    if (!user) {
      console.error('❌ Usuário não autenticado (Firebase Auth)');
      return;
    }
    
    // Usar dados do Firebase Auth se os dados do Firestore não estiverem disponíveis
    const nomeUsuario = usuario?.nome || user.displayName || user.email?.split('@')[0] || 'Usuário';

    console.log('👤 Usuário autenticado:', user.uid);
    console.log('👤 Dados do usuário:', usuario);

    try {
      const fotoUpload = {
        file,
        nome: file.name,
        autor: nomeUsuario
      };

      console.log('📤 Dados do upload:', fotoUpload);

      const result = await uploadFoto.mutateAsync({
        fotoUpload,
        autorId: user.uid
      });

      console.log('✅ Foto enviada com sucesso! Resultado:', result);
    } catch (error) {
      console.error('❌ Erro ao enviar foto:', error);
      console.error('❌ Detalhes do erro:', error);
      throw error; // Re-throw para que uploadFiles possa tratar
    }
  };

  const uploadFiles = async (files: FileList) => {
    console.log('🚀 Iniciando upload de múltiplos arquivos:', files.length);
    
    if (!user) {
      console.error('❌ Usuário não autenticado (Firebase Auth)');
      return;
    }

    setIsUploading(true);
    const results = [];
    const errors = [];

    try {
      // Processar cada arquivo
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`📤 Enviando arquivo ${i + 1}/${files.length}:`, file.name);
        
        try {
          const result = await uploadFile(file);
          results.push(result);
          console.log(`✅ Arquivo ${i + 1} enviado com sucesso`);
        } catch (error) {
          console.error(`❌ Erro no arquivo ${i + 1}:`, error);
          errors.push({ file: file.name, error });
        }
      }

              console.log(`🎉 Upload concluído! ${results.length} sucessos, ${errors.length} erros`);
              
              if (errors.length > 0) {
                console.warn('⚠️ Alguns arquivos falharam:', errors);
              }

              // Fechar modal e executar callback de sucesso
              onClose();
              if (onUploadSuccess) {
                onUploadSuccess();
              }
    } catch (error) {
      console.error('❌ Erro geral no upload múltiplo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadFiles(files);
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
                  Enviar Fotos
                </h2>
                <p className="text-text-secondary font-sans text-base md:text-lg">
                  Escolha como você quer enviar suas fotos
                </p>
                <p className="text-text-muted font-sans text-sm mt-2">
                  Você pode selecionar múltiplas fotos de uma vez
                </p>
      </div>

      {/* Botões de ação na base da tela */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6">
        <div className="flex flex-col gap-3 md:gap-4">
                  {/* Botão Tirar Nova Foto */}
                  <button
                    onClick={handleTirarNovaFoto}
                    disabled={isUploading}
                    className="bg-primary border-0 rounded-[24px] p-4 md:p-6 flex flex-row gap-3 md:gap-[14px] items-center justify-center h-[60px] md:h-[70px] relative overflow-hidden backdrop-blur-xs cursor-pointer transition-all duration-300 ease-in-out hover:bg-primary-hover hover:-translate-y-0.5 shadow-lg animate-stagger-up disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ animationDelay: '0.2s' }}
                  >
                    {isUploading ? (
                      <Spinner size={24} weight="bold" className="flex-shrink-0 text-[#212121] animate-spin" />
                    ) : (
                      <Camera size={24} weight="fill" className="flex-shrink-0 text-[#212121]" />
                    )}
                    <div className="text-[#212121] text-center font-sans-bold text-lg md:text-xl leading-[22px] md:leading-[28px] font-bold relative flex items-center justify-center">
                      {isUploading ? 'Enviando...' : 'Tirar fotos'}
                    </div>
                  </button>

                  {/* Botão Enviar da Galeria */}
                  <button
                    onClick={handleEnviarDaGaleria}
                    disabled={isUploading}
                    className="bg-black/80 border-0 rounded-[24px] p-4 md:p-6 flex flex-row gap-3 md:gap-[14px] items-center justify-center h-[60px] md:h-[70px] relative overflow-hidden backdrop-blur-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-black/90 hover:-translate-y-0.5 shadow-lg animate-stagger-up disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ animationDelay: '0.4s' }}
                  >
                    {isUploading ? (
                      <Spinner size={24} weight="bold" className="flex-shrink-0 text-white animate-spin" />
                    ) : (
                      <ImageSquare size={24} weight="fill" className="flex-shrink-0 text-white" />
                    )}
                    <div className="text-white text-center font-sans text-lg md:text-xl leading-[22px] md:leading-[28px] font-normal relative flex items-center justify-center">
                      {isUploading ? 'Enviando...' : 'Enviar da Galeria'}
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
        multiple={true}
        onChange={handleCameraCapture}
        style={{ display: 'none' }}
      />
    </div>
  );
};
