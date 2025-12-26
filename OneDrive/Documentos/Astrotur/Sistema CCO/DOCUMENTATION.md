# Documentação Técnica - Sistema CCO

## Arquitetura do Sistema

### Frontend (React + Vite)

#### Estrutura de Componentes

**Layout Components:**
- `MainLayout` - Layout principal com Sidebar e Topbar
- `AuthLayout` - Layout para páginas de autenticação
- `Sidebar` - Menu lateral de navegação
- `Topbar` - Barra superior com busca e perfil

**Protected Routes:**
- Utiliza `ProtectedRoute` para proteger rotas autenticadas
- Verifica token JWT antes de renderizar

#### Gerenciamento de Estado

**Context API:**
- `AuthContext` - Gerencia autenticação, usuário logado e tokens
- Métodos: `signIn()`, `signOut()`, `updateUser()`

**Local Storage:**
- `@SistemaCCO:user` - Dados do usuário
- `@SistemaCCO:token` - Token JWT

#### Roteamento

```javascript
/ - Dashboard
/login - Login
/recuperar-senha - Recuperação de senha
/ocorrencias - Lista de ocorrências
/ocorrencias/nova - Nova ocorrência
/ocorrencias/:id - Detalhes da ocorrência
/cadastros/clientes - CRUD de clientes
/cadastros/veiculos - CRUD de veículos
/cadastros/tipos-quebra - CRUD de tipos de quebra
/cadastros/usuarios - CRUD de usuários
/relatorios - Relatórios dinâmicos
/importacao - Importação de planilhas
/configuracoes - Configurações do sistema
```

### Backend (Node.js + Express)

#### Estrutura de Rotas

**Autenticação:**
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Recuperar senha

**Ocorrências:**
- `GET /api/ocorrencias` - Listar todas
- `GET /api/ocorrencias/:id` - Buscar por ID
- `POST /api/ocorrencias` - Criar nova
- `PUT /api/ocorrencias/:id` - Atualizar
- `POST /api/ocorrencias/:id/aprovar` - Aprovar
- `DELETE /api/ocorrencias/:id` - Excluir

**Clientes:**
- `GET /api/clientes` - Listar todos
- `POST /api/clientes` - Criar novo
- `PUT /api/clientes/:id` - Atualizar
- `DELETE /api/clientes/:id` - Excluir (soft delete)

#### Banco de Dados PostgreSQL

**Relacionamentos:**
```
clientes (1) ----< (N) veiculos
clientes (1) ----< (N) ocorrencias
veiculos (1) ----< (N) ocorrencias
tipos_quebra (1) ----< (N) ocorrencias
usuarios (1) ----< (N) ocorrencias (criador)
usuarios (1) ----< (N) ocorrencias (aprovador)
ocorrencias (1) ----< (N) ocorrencia_anexos
ocorrencias (1) ----< (N) ocorrencia_logs
```

**Triggers:**
- `update_updated_at` - Atualiza automaticamente o campo `updated_at`

**Índices:**
- `idx_ocorrencias_cliente` - Performance em buscas por cliente
- `idx_ocorrencias_veiculo` - Performance em buscas por veículo
- `idx_ocorrencias_status` - Performance em filtros de status
- `idx_ocorrencias_data_quebra` - Performance em buscas por data

## Fluxos de Negócio

### 1. Fluxo de Login

```
1. Usuário digita email e senha
2. Frontend envia POST /api/auth/login
3. Backend valida credenciais no banco
4. Backend gera token JWT
5. Frontend armazena token e dados do usuário
6. Redireciona para Dashboard
```

### 2. Fluxo de Criação de Ocorrência

```
1. Usuário acessa /ocorrencias/nova
2. Preenche formulário
3. Frontend envia POST /api/ocorrencias
4. Backend gera número sequencial
5. Backend calcula atraso (se houver)
6. Backend salva no banco
7. Backend cria log de criação
8. Frontend redireciona para /ocorrencias
```

### 3. Fluxo de Aprovação

```
1. Usuário com permissão abre ocorrência
2. Clica em "Aprovar"
3. Frontend envia POST /api/ocorrencias/:id/aprovar
4. Backend atualiza status de aprovação
5. Backend cria log de aprovação
6. Frontend atualiza interface
```

### 4. Fluxo de Geração de PDF

```
1. Usuário clica em "Gerar PDF"
2. Frontend busca dados completos da ocorrência
3. Sistema monta template HTML
4. Biblioteca gera PDF (jsPDF ou Puppeteer)
5. Download automático ou preview
```

## Segurança

### Autenticação

- **JWT (JSON Web Tokens)** com expiração configurável
- **Bcrypt** para hash de senhas (salt rounds: 10)
- **Refresh Tokens** (planejado para Fase 2)

### Autorização

- **Perfis de Usuário:**
  - `monitor` - Acesso básico
  - `administrador` - Acesso total
  - `aprovador` - Pode aprovar ocorrências

### Proteção de Rotas

- Middleware de autenticação JWT
- Validação de permissões por perfil
- Proteção contra SQL Injection (queries parametrizadas)
- CORS configurado para domínios específicos

## Performance

### Frontend

- **Code Splitting** - Lazy loading de rotas
- **Memoization** - React.memo em componentes pesados
- **Debounce** - Em campos de busca
- **Paginação** - Limite de registros por página

### Backend

- **Índices de Banco** - Em colunas frequentemente buscadas
- **Queries Otimizadas** - JOINs eficientes
- **Connection Pooling** - Pool de conexões PostgreSQL
- **Caching** (planejado) - Redis para dados frequentes

## Monitoramento

### Logs

- **Morgan** - Logging de requisições HTTP
- **Console Errors** - Erros capturados e logados
- **Database Logs** - Queries lentas identificadas

### Métricas (Planejado)

- Tempo de resposta das APIs
- Taxa de erro
- Usuários ativos
- Ocorrências criadas por período

## Testes

### Unitários
- Jest + React Testing Library (Frontend)
- Jest + Supertest (Backend)

### Integração
- Testes de fluxo completo
- Testes de API endpoints

### E2E
- Cypress ou Playwright

## Deploy

### Ambientes

**Desenvolvimento:**
- Frontend: localhost:3000
- Backend: localhost:5000
- Database: localhost:5432

**Produção:**
- Frontend: Vercel
- Backend: Railway/Render
- Database: Railway PostgreSQL

### CI/CD (Planejado)

- GitHub Actions
- Build automático
- Testes automáticos
- Deploy automático em merge para main

## Manutenção

### Backup do Banco

```bash
# Backup completo
pg_dump -U postgres sistema_cco > backup_$(date +%Y%m%d).sql

# Restaurar
psql -U postgres sistema_cco < backup_20251226.sql
```

### Migrations

```bash
cd backend
npm run migrate
```

### Atualização de Dependências

```bash
# Frontend
npm update
npm audit fix

# Backend
cd backend
npm update
npm audit fix
```

## Troubleshooting

### Problemas Comuns

**Erro de conexão com banco:**
- Verificar se PostgreSQL está rodando
- Verificar credenciais no .env
- Verificar firewall e porta 5432

**Erro 401 Unauthorized:**
- Token JWT expirado
- Fazer logout e login novamente

**CORS Error:**
- Verificar configuração CORS no backend
- Verificar URL da API no frontend (.env)

## Referências

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io)
- [Tailwind CSS](https://tailwindcss.com)

---

Última atualização: 26/12/2025
