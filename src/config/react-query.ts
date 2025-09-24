import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false, // Desabilitar todas as queries temporariamente
      staleTime: 10 * 60 * 1000, // 10 minutes (aumentado)
      gcTime: 15 * 60 * 1000, // 15 minutes (aumentado)
      retry: 0, // Sem retry
      refetchOnWindowFocus: false,
      refetchOnMount: false, // Desabilitado para evitar refetch desnecessário
      refetchOnReconnect: false, // Desabilitado temporariamente
      networkMode: 'online', // Só funciona online
    },
    mutations: {
      retry: 0, // Sem retry
    },
  },
});
