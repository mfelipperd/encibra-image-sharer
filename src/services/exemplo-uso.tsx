// EXEMPLO DE COMO USAR OS SERVIÇOS
// Este arquivo é apenas para demonstração e pode ser removido

import React, { useState } from 'react';
import { useFotos, useUploadFoto, useToggleCurtida, useDeletarFoto } from './hooks';
import { FotoUpload } from './types';

export const ExemploUsoServicos: React.FC = () => {
  const [usuarioId] = useState('usuario-exemplo'); // Em produção, viria da autenticação

  // Queries
  const { data: fotos, isLoading, error } = useFotos({ limit: 10 });
  
  // Mutations
  const uploadFoto = useUploadFoto();
  const toggleCurtida = useToggleCurtida();
  const deletarFoto = useDeletarFoto();

  const handleUploadFoto = async (file: File) => {
    const fotoUpload: FotoUpload = {
      file,
      nome: file.name,
      autor: 'Usuário Exemplo'
    };

    try {
      await uploadFoto.mutateAsync(fotoUpload);
      console.log('Foto enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar foto:', error);
    }
  };

  const handleCurtir = async (fotoId: string) => {
    try {
      await toggleCurtida.mutateAsync({ fotoId, usuarioId });
      console.log('Curtida atualizada!');
    } catch (error) {
      console.error('Erro ao curtir:', error);
    }
  };

  const handleDeletar = async (fotoId: string) => {
    try {
      await deletarFoto.mutateAsync({ fotoId, autorId: usuarioId });
      console.log('Foto deletada!');
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  if (isLoading) return <div>Carregando fotos...</div>;
  if (error) return <div>Erro ao carregar fotos: {error.message}</div>;

  return (
    <div>
      <h2>Exemplo de Uso dos Serviços</h2>
      <div>
        {fotos?.map((foto) => (
          <div key={foto.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <img src={foto.url} alt={foto.nome} style={{ width: '100px', height: '100px' }} />
            <p>Autor: {foto.autor}</p>
            <p>Curtidas: {foto.curtidas}</p>
            <button onClick={() => handleCurtir(foto.id)}>
              {foto.favoritada ? 'Descurtir' : 'Curtir'}
            </button>
            <button onClick={() => handleDeletar(foto.id)}>
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
