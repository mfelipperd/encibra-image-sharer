import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FuncionalidadesService } from './funcionalidades.service';
import type { Usuario, FotoUpload, PaginationParams } from './types';

// Query Keys
export const queryKeys = {
  fotos: ['fotos'] as const,
  fotosUsuario: (usuarioId: string) => ['fotos', 'usuario', usuarioId] as const,
  fotosFavoritadas: (usuarioId: string) => ['fotos', 'favoritadas', usuarioId] as const,
  usuario: (usuarioId: string) => ['usuario', usuarioId] as const,
};

// ==================== QUERIES ====================

/**
 * Hook para buscar todas as fotos
 */
export function useFotos(params?: PaginationParams) {
  return useQuery({
    queryKey: [...queryKeys.fotos, params],
    queryFn: () => {
      console.log('📸 Buscando fotos com params:', params);
      return FuncionalidadesService.getFotos(params);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

/**
 * Hook para buscar fotos de um usuário
 */
export function useFotosUsuario(usuarioId: string) {
  return useQuery({
    queryKey: queryKeys.fotosUsuario(usuarioId),
    queryFn: () => FuncionalidadesService.getFotosDoUsuario(usuarioId),
    enabled: !!usuarioId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook para buscar fotos favoritadas
 */
export function useFotosFavoritadas(usuarioId: string) {
  return useQuery({
    queryKey: queryKeys.fotosFavoritadas(usuarioId),
    queryFn: () => FuncionalidadesService.getFotosFavoritadas(usuarioId),
    enabled: !!usuarioId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook para buscar dados de um usuário
 */
export function useUsuario(usuarioId: string) {
  return useQuery({
    queryKey: queryKeys.usuario(usuarioId),
    queryFn: () => {
      console.log('🔍 Buscando usuário:', usuarioId);
      return FuncionalidadesService.getUsuario(usuarioId);
    },
    enabled: !!usuarioId && usuarioId.length > 0, // Verificação mais robusta
    staleTime: 15 * 60 * 1000, // 15 minutes (aumentado)
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// ==================== MUTATIONS ====================

/**
 * Hook para upload de foto
 */
export function useUploadFoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fotoUpload, autorId }: { fotoUpload: FotoUpload; autorId: string }) => 
      FuncionalidadesService.uploadFoto(fotoUpload),
    onSuccess: (_, variables) => {
      console.log('✅ Upload realizado, invalidando queries...');
      // Invalidar queries relacionadas às fotos
      queryClient.invalidateQueries({ queryKey: queryKeys.fotos });
      queryClient.invalidateQueries({ queryKey: queryKeys.fotosUsuario(variables.autorId) });
    },
    onError: (error) => {
      console.error('Erro no upload da foto:', error);
    },
  });
}

/**
 * Hook para curtir/descurtir foto
 */
export function useToggleCurtida() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fotoId, usuarioId }: { fotoId: string; usuarioId: string }) =>
      FuncionalidadesService.toggleCurtida(fotoId, usuarioId),
    onSuccess: (_, variables) => {
      console.log('❤️ Curtida atualizada, invalidando queries...');
      // Invalidar todas as queries de fotos
      queryClient.invalidateQueries({ queryKey: queryKeys.fotos });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.fotosFavoritadas(variables.usuarioId) 
      });
    },
    onError: (error) => {
      console.error('Erro ao curtir foto:', error);
    },
  });
}

/**
 * Hook para deletar foto
 */
export function useDeletarFoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fotoId, autorId }: { fotoId: string; autorId: string }) =>
      FuncionalidadesService.deletarFoto(fotoId, autorId),
    onSuccess: () => {
      // Invalidar todas as queries de fotos
      queryClient.invalidateQueries({ queryKey: queryKeys.fotos });
    },
    onError: (error) => {
      console.error('Erro ao deletar foto:', error);
    },
  });
}

/**
 * Hook para criar usuário
 */
export function useCriarUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (usuario: Omit<Usuario, 'id'>) => 
      FuncionalidadesService.criarUsuario(usuario),
    onSuccess: (usuarioId) => {
      // Invalidar query do usuário
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.usuario(usuarioId) 
      });
    },
    onError: (error) => {
      console.error('Erro ao criar usuário:', error);
    },
  });
}

/**
 * Hook para atualizar usuário
 */
export function useAtualizarUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ usuarioId, updates }: { 
      usuarioId: string; 
      updates: Partial<Usuario> 
    }) => FuncionalidadesService.atualizarUsuario(usuarioId, updates),
    onSuccess: (_, variables) => {
      // Invalidar query do usuário
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.usuario(variables.usuarioId) 
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar usuário:', error);
    },
  });
}
