# 🔥 Firebase Troubleshooting - CORS e Domínios Autorizados

## 🚨 Problemas Identificados

### 1. **CORS Errors do Firestore**
```
Fetch API cannot load https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel
due to access control checks.
```

### 2. **Erro 404 nas rotas**
```
Failed to load resource: the server responded with a status of 404 (my-photos, line 0)
```

## 🛠️ Soluções

### **Solução 1: Configurar Domínios Autorizados no Firebase**

#### **Passo 1: Firebase Console**
1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Selecione o projeto `encibra-image-shower`

#### **Passo 2: Authentication - Authorized Domains**
1. **Authentication** → **Settings** → **Authorized domains**
2. Adicione estes domínios:
   ```
   localhost
   127.0.0.1
   encibra-party-images.vercel.app
   encibra-image-shower.firebaseapp.com
   ```

#### **Passo 3: Firestore - CORS Configuration**
1. **Firestore Database** → **Settings** → **Web API**
2. Verifique se o domínio está listado em "Web API"

### **Solução 2: Configurar Storage Rules**

#### **Passo 1: Storage Rules**
1. **Storage** → **Rules**
2. Verifique se as regras estão assim:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /fotos/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /{allPaths=**} {
         allow read: if true;
       }
     }
   }
   ```

### **Solução 3: Configurar Firestore Rules**

#### **Passo 1: Firestore Rules**
1. **Firestore Database** → **Rules**
2. Verifique se as regras estão assim:
   ```javascript
   rules_version='2'
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.time < timestamp.date(2025, 10, 24);
       }
     }
   }
   ```

### **Solução 4: Redeploy da Vercel**

Após configurar os domínios no Firebase:

```bash
vercel --prod
```

## 🔍 Verificações Adicionais

### **1. Variáveis de Ambiente**
Verifique se todas as variáveis estão configuradas na Vercel:
```bash
vercel env ls
```

### **2. Teste Local**
Teste localmente para verificar se o problema é específico da produção:
```bash
npm run dev
```

### **3. Console do Firebase**
Verifique se há erros no console do Firebase:
- **Authentication** → **Users**
- **Firestore Database** → **Data**
- **Storage** → **Files**

## 📱 URLs para Testar

- **Produção**: https://encibra-party-images.vercel.app
- **Local**: http://localhost:5173

## 🚨 Se o problema persistir

1. **Aguarde 5-10 minutos** após configurar os domínios
2. **Limpe o cache do navegador**
3. **Teste em modo incógnito**
4. **Verifique se o Firebase está ativo** no console

## 📞 Suporte

Se ainda houver problemas:
1. Verifique os logs do Firebase Console
2. Teste as regras de segurança
3. Confirme que todas as variáveis de ambiente estão corretas
