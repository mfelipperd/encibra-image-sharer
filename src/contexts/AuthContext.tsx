import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { useCriarUsuario, useUsuario } from '../services/hooks';
import type { Usuario } from '../services/types';

interface AuthContextType {
  user: User | null;
  usuario: Usuario | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  console.log('🔄 AuthProvider renderizado, user:', user?.uid, 'isLoading:', isLoading);
  
  const criarUsuario = useCriarUsuario();
  // Temporariamente desabilitado para testar
  // const { data: usuario } = useUsuario(user?.uid || '');
  const usuario = null; // Mock temporário

  const isAuthenticated = !!user;

  useEffect(() => {
    console.log('🔧 Configurando listener do Firebase Auth...');
    let isUnmounted = false;
    let lastUserId: string | null = null;
    let callCount = 0;
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      callCount++;
      console.log(`🔐 Firebase Auth callback #${callCount}:`, firebaseUser?.uid || 'null');
      
      if (isUnmounted) return;
      
      const currentUserId = firebaseUser?.uid || null;
      
      // Evitar processar se o usuário não mudou
      if (lastUserId === currentUserId) {
        console.log('🔄 Usuário não mudou, ignorando callback');
        return;
      }
      
      lastUserId = currentUserId;
      console.log('✅ Processando mudança de usuário:', currentUserId || 'null');
      
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => {
      console.log('🧹 Limpando listener do Firebase Auth...');
      isUnmounted = true;
      unsubscribe();
    };
  }, []);

  // Separar a lógica de criação de usuário em um useEffect diferente
  // Temporariamente desabilitado para testar
  // useEffect(() => {
  //   if (user && !usuario && !criarUsuario.isPending && !criarUsuario.isSuccess) {
  //     console.log('🔧 Criando usuário no Firestore...', user.uid);
  //     criarUsuarioIfNotExists(user);
  //   }
  // }, [user, usuario, criarUsuario.isPending, criarUsuario.isSuccess]);

  const criarUsuarioIfNotExists = async (firebaseUser: User) => {
    try {
      const novoUsuario: Omit<Usuario, 'id'> = {
        nome: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário',
        email: firebaseUser.email || '',
        fotoPerfil: firebaseUser.photoURL || undefined,
        fotosEnviadas: [],
        fotosFavoritadas: [],
        createdAt: new Date()
      };

      await criarUsuario.mutateAsync(novoUsuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    usuario: usuario || null,
    isLoading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
