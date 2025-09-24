# Configuração de Variáveis de Ambiente

## 🚨 IMPORTANTE: Segurança

As chaves do Firebase foram movidas para variáveis de ambiente por segurança. Você precisa configurar as variáveis antes de executar o projeto.

## 📋 Configuração Local

### 1. Criar arquivo `.env.local`

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```bash
# Firebase Configuration - LOCAL DEVELOPMENT
VITE_FIREBASE_API_KEY=AIzaSyAwP5q6kbREHTgUyPqHwIZ7ljI_phzwibg
VITE_FIREBASE_AUTH_DOMAIN=encibra-image-shower.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=encibra-image-shower
VITE_FIREBASE_STORAGE_BUCKET=encibra-image-shower.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=857787146736
VITE_FIREBASE_APP_ID=1:857787146736:web:404515889b2b6558ad7d35
```

### 2. Verificar se está funcionando

Execute o projeto localmente:

```bash
npm run dev
```

## 🌐 Configuração na Vercel

### 1. Acessar o Dashboard da Vercel

1. Vá para [vercel.com](https://vercel.com)
2. Acesse seu projeto `encibra-party-images`
3. Vá em **Settings** → **Environment Variables**

### 2. Adicionar as Variáveis

Adicione as seguintes variáveis de ambiente:

| Nome | Valor |
|------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyAwP5q6kbREHTgUyPqHwIZ7ljI_phzwibg` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `encibra-image-shower.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `encibra-image-shower` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `encibra-image-shower.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `857787146736` |
| `VITE_FIREBASE_APP_ID` | `1:857787146736:web:404515889b2b6558ad7d35` |

### 3. Configurar Ambientes

Para cada variável, marque:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

### 4. Fazer Redeploy

Após adicionar as variáveis, faça um redeploy:

```bash
vercel --prod
```

## 🔒 Segurança

- ✅ Arquivo `.env.local` está no `.gitignore` (não será commitado)
- ✅ Arquivo `env.example` serve como template
- ✅ Chaves sensíveis não estão mais no código fonte
- ✅ Variáveis são carregadas apenas no cliente (Vite)

## 🚨 Próximos Passos

1. **Criar** o arquivo `.env.local` localmente
2. **Configurar** as variáveis na Vercel
3. **Fazer redeploy** para aplicar as mudanças
4. **Testar** se tudo está funcionando

## 📞 Suporte

Se houver problemas, verifique:
- Se todas as variáveis estão configuradas
- Se os valores estão corretos
- Se o redeploy foi feito após configurar as variáveis
