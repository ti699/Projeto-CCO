# 🚀 Guia Rápido de Início - Sistema CCO

## Começando em 5 Minutos

### 1️⃣ Instalar Dependências

```powershell
# Frontend
npm install

# Backend (em outro terminal)
cd backend
npm install
```

### 2️⃣ Configurar Banco de Dados

```powershell
# Criar banco PostgreSQL
psql -U postgres -c "CREATE DATABASE sistema_cco;"

# Executar schema
psql -U postgres -d sistema_cco -f backend/database/schema.sql
```

### 3️⃣ Configurar Variáveis de Ambiente

**Backend (.env):**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sistema_cco
DB_USER=postgres
DB_PASSWORD=sua_senha

JWT_SECRET=mude_este_secret_em_producao
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Sistema CCO
```

### 4️⃣ Iniciar Servidores

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (nova janela)
npm run dev
```

### 5️⃣ Acessar Sistema

🌐 Abra: **http://localhost:3000**

**Login Padrão:**
- Email: `admin@sistemacco.com`
- Senha: `admin123`

## ✅ Verificar Instalação

```powershell
# Testar Backend
curl http://localhost:5000/api/health

# Deve retornar:
# {"status":"ok","message":"Sistema CCO API is running"}
```

## 📝 Próximos Passos

1. ✅ Alterar senha do usuário admin
2. ✅ Cadastrar clientes de teste
3. ✅ Cadastrar veículos
4. ✅ Criar primeira ocorrência
5. ✅ Explorar dashboard e relatórios

## 🆘 Problemas Comuns

### Erro de conexão com banco

```powershell
# Verificar se PostgreSQL está rodando
Get-Service -Name postgresql*

# Iniciar se necessário
Start-Service postgresql-x64-14
```

### Porta 3000 ou 5000 já em uso

```powershell
# Verificar processo na porta
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Matar processo (use o PID da saída acima)
taskkill /PID <numero_do_pid> /F
```

### Dependências não instaladas

```powershell
# Limpar cache e reinstalar
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

## 📚 Recursos Úteis

- [README.md](README.md) - Documentação completa
- [DOCUMENTATION.md](DOCUMENTATION.md) - Documentação técnica
- [backend/database/schema.sql](backend/database/schema.sql) - Schema do banco

## 🎯 Estrutura de Desenvolvimento

```
Sistema CCO/
├── src/                    # Código React
├── backend/               # Código Node.js
│   ├── routes/           # APIs REST
│   ├── config/           # Configurações
│   └── database/         # Scripts SQL
├── package.json          # Deps frontend
└── backend/package.json  # Deps backend
```

## 🔧 Comandos Úteis

```powershell
# Build para produção
npm run build

# Limpar e reinstalar tudo
npm ci

# Verificar erros de lint
npm run lint

# Criar backup do banco
pg_dump -U postgres sistema_cco > backup.sql
```

---

**Pronto!** 🎉 Agora você pode começar a desenvolver!

Dúvidas? Consulte a [documentação completa](README.md).
