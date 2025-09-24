import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  orderBy, 
  limit, 
  startAfter,
  where,
  increment,
  arrayUnion,
  arrayRemove,
  Timestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { Foto, Usuario, FotoUpload, PaginationParams } from './types';

// Collections
const FOTOS_COLLECTION = 'fotos';
const USUARIOS_COLLECTION = 'usuarios';

export class FuncionalidadesService {
  // ==================== FOTOS ====================
  
  /**
   * Upload de uma nova foto
   */
  static async uploadFoto(fotoUpload: FotoUpload): Promise<string> {
    try {
      // 1. Upload da imagem para o Storage
      const storageRef = ref(storage, `fotos/${Date.now()}_${fotoUpload.file.name}`);
      const uploadResult = await uploadBytes(storageRef, fotoUpload.file);
      const downloadURL = await getDownloadURL(uploadResult.ref);

      // 2. Salvar metadados no Firestore
      const fotoData: Omit<Foto, 'id'> = {
        url: downloadURL,
        autor: fotoUpload.autor,
        autorId: '', // Será preenchido quando implementarmos autenticação
        timestamp: new Date(),
        curtidas: 0,
        usuariosQueCurtiram: [],
        favoritada: false,
        tamanho: fotoUpload.file.size,
        nome: fotoUpload.nome
      };

      const docRef = await addDoc(collection(db, FOTOS_COLLECTION), {
        ...fotoData,
        timestamp: Timestamp.fromDate(fotoData.timestamp)
      });

      return docRef.id;
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
      throw error;
    }
  }

  /**
   * Buscar todas as fotos (com paginação)
   */
  static async getFotos(params: PaginationParams = { limit: 10 }): Promise<Foto[]> {
    try {
      let q = query(
        collection(db, FOTOS_COLLECTION),
        orderBy('timestamp', 'desc'),
        limit(params.limit)
      );

      if (params.lastDoc) {
        q = query(
          collection(db, FOTOS_COLLECTION),
          orderBy('timestamp', 'desc'),
          startAfter(params.lastDoc),
          limit(params.limit)
        );
      }

      const querySnapshot = await getDocs(q);
      const fotos: Foto[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fotos.push({
          id: doc.id,
          url: data.url,
          autor: data.autor,
          autorId: data.autorId,
          timestamp: data.timestamp.toDate(),
          curtidas: data.curtidas || 0,
          usuariosQueCurtiram: data.usuariosQueCurtiram || [],
          favoritada: data.favoritada || false,
          tamanho: data.tamanho,
          nome: data.nome
        });
      });

      return fotos;
    } catch (error) {
      console.error('Erro ao buscar fotos:', error);
      throw error;
    }
  }

  /**
   * Buscar fotos de um usuário específico
   */
  static async getFotosDoUsuario(autorId: string): Promise<Foto[]> {
    try {
      const q = query(
        collection(db, FOTOS_COLLECTION),
        where('autorId', '==', autorId),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const fotos: Foto[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fotos.push({
          id: doc.id,
          url: data.url,
          autor: data.autor,
          autorId: data.autorId,
          timestamp: data.timestamp.toDate(),
          curtidas: data.curtidas || 0,
          usuariosQueCurtiram: data.usuariosQueCurtiram || [],
          favoritada: data.favoritada || false,
          tamanho: data.tamanho,
          nome: data.nome
        });
      });

      return fotos;
    } catch (error) {
      console.error('Erro ao buscar fotos do usuário:', error);
      throw error;
    }
  }

  /**
   * Buscar fotos favoritadas por um usuário
   */
  static async getFotosFavoritadas(usuarioId: string): Promise<Foto[]> {
    try {
      const q = query(
        collection(db, FOTOS_COLLECTION),
        where('usuariosQueCurtiram', 'array-contains', usuarioId),
        orderBy('timestamp', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const fotos: Foto[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fotos.push({
          id: doc.id,
          url: data.url,
          autor: data.autor,
          autorId: data.autorId,
          timestamp: data.timestamp.toDate(),
          curtidas: data.curtidas || 0,
          usuariosQueCurtiram: data.usuariosQueCurtiram || [],
          favoritada: true, // Já que está na lista de favoritas
          tamanho: data.tamanho,
          nome: data.nome
        });
      });

      return fotos;
    } catch (error) {
      console.error('Erro ao buscar fotos favoritadas:', error);
      throw error;
    }
  }

  /**
   * Curtir/descurtir uma foto
   */
  static async toggleCurtida(fotoId: string, usuarioId: string): Promise<{ curtidas: number; favoritada: boolean }> {
    try {
      const fotoRef = doc(db, FOTOS_COLLECTION, fotoId);
      const fotoDoc = await getDoc(fotoRef);

      if (!fotoDoc.exists()) {
        throw new Error('Foto não encontrada');
      }

      const fotoData = fotoDoc.data();
      const usuariosQueCurtiram = fotoData.usuariosQueCurtiram || [];
      const isFavoritada = usuariosQueCurtiram.includes(usuarioId);

      if (isFavoritada) {
        // Descurtir
        await updateDoc(fotoRef, {
          curtidas: increment(-1),
          usuariosQueCurtiram: arrayRemove(usuarioId)
        });
      } else {
        // Curtir
        await updateDoc(fotoRef, {
          curtidas: increment(1),
          usuariosQueCurtiram: arrayUnion(usuarioId)
        });
      }

      return {
        curtidas: isFavoritada ? fotoData.curtidas - 1 : fotoData.curtidas + 1,
        favoritada: !isFavoritada
      };
    } catch (error) {
      console.error('Erro ao curtir foto:', error);
      throw error;
    }
  }

  /**
   * Deletar uma foto
   */
  static async deletarFoto(fotoId: string, autorId: string): Promise<void> {
    try {
      // Verificar se o usuário é o autor da foto
      const fotoRef = doc(db, FOTOS_COLLECTION, fotoId);
      const fotoDoc = await getDoc(fotoRef);

      if (!fotoDoc.exists()) {
        throw new Error('Foto não encontrada');
      }

      const fotoData = fotoDoc.data();
      if (fotoData.autorId !== autorId) {
        throw new Error('Você não tem permissão para deletar esta foto');
      }

      // Deletar do Storage
      const storageRef = ref(storage, fotoData.url);
      await deleteObject(storageRef);

      // Deletar do Firestore
      await deleteDoc(fotoRef);
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      throw error;
    }
  }

  // ==================== USUÁRIOS ====================

  /**
   * Criar um novo usuário
   */
  static async criarUsuario(usuario: Omit<Usuario, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, USUARIOS_COLLECTION), {
        ...usuario,
        createdAt: Timestamp.fromDate(usuario.createdAt)
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  /**
   * Buscar usuário por ID
   */
  static async getUsuario(usuarioId: string): Promise<Usuario | null> {
    try {
      const usuarioDoc = await getDoc(doc(db, USUARIOS_COLLECTION, usuarioId));
      
      if (!usuarioDoc.exists()) {
        return null;
      }

      const data = usuarioDoc.data();
      return {
        id: usuarioDoc.id,
        nome: data.nome,
        email: data.email,
        fotoPerfil: data.fotoPerfil,
        fotosEnviadas: data.fotosEnviadas || [],
        fotosFavoritadas: data.fotosFavoritadas || [],
        createdAt: data.createdAt.toDate()
      };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  /**
   * Atualizar dados do usuário
   */
  static async atualizarUsuario(usuarioId: string, updates: Partial<Usuario>): Promise<void> {
    try {
      const usuarioRef = doc(db, USUARIOS_COLLECTION, usuarioId);
      await updateDoc(usuarioRef, updates);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }
}
