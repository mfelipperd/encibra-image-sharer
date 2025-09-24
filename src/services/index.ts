// Exportar todos os serviços
export { FuncionalidadesService } from './funcionalidades.service';
export * from './hooks';
export * from './types';

// Re-exportar configurações do Firebase para conveniência
export { db, storage, auth, analytics } from '../config/firebase';
export { queryClient } from '../config/react-query';
