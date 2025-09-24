export interface Foto {
  id: string;
  url: string;
  autor: string;
  autorId: string;
  timestamp: Date;
  curtidas: number;
  usuariosQueCurtiram: string[];
  favoritada: boolean;
  tamanho: number;
  nome: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  fotoPerfil?: string;
  fotosEnviadas: string[];
  fotosFavoritadas: string[];
  createdAt: Date;
}

export interface FotoUpload {
  file: File;
  nome: string;
  autor: string;
}

export interface FotoUpdate {
  curtidas?: number;
  usuariosQueCurtiram?: string[];
  favoritada?: boolean;
}

export interface QueryResult<T> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
}

export interface PaginationParams {
  limit: number;
  lastDoc?: any;
}
