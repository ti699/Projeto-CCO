# 🚀 COMO RODAR O PROJETO CCO

## Opção 1: Usar o Script Automático (RECOMENDADO)

### Windows:
```bash
# Duplo-clique em:
iniciar.bat
```

Isso abrirá automaticamente:
- 1 terminal para Backend (Node.js)
- 1 terminal para Frontend (React/Vite)

---

## Opção 2: Rodar Manualmente (2 terminais)

### Terminal 1 - Backend (Node.js)
```bash
cd backend
npm run dev
```

Esperado:
```
> sistema-cco-backend@1.0.0 dev
> nodemon server.js

[nodemon] 3.0.2
[nodemon] to restart at any time, type `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,json
Started on port 5000
```

### Terminal 2 - Frontend (React/Vite)
```bash
npm run dev
```

Esperado:
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## URLs do Projeto

| Componente | URL | Porta |
|-----------|-----|-------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:5000/api | 5000 |

---

## Funcionalidades Implementadas

### 1. Relatórios ✅
- Acesse: http://localhost:5173/relatorios
- Gera relatório de fechamento de plantão
- Download em formato .txt
- Pronto para WhatsApp/Email

### 2. Gestão de Clientes ✅
- Acesse: http://localhost:5173/clientes
- Listar clientes
- Editar cliente (botão Edit)
- Deletar cliente (botão Lixeira)
- Ver detalhes (botão Eye)

### 3. Edição de Cliente ✅
- Acesse: http://localhost:5173/clientes/editar/1
- Editar todos os campos
- Salvar alterações
- Validações

### 4. Detalhes do Cliente ✅
- Acesse: http://localhost:5173/clientes/1
- Ver informações completas
- Veículos cadastrados
- Ocorrências recentes
- Botão de exclusão

---

## 🔧 Estrutura do Projeto

```
Projeto-CCO/
├── backend/                    ← Node.js + Express
│   ├── routes/
│   │   ├── clientes.js
│   │   ├── ocorrencias.js
│   │   └── relatorios.js
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── src/                        ← React + Vite
│   ├── pages/
│   │   ├── Clientes/
│   │   ├── Relatorios.jsx      ← NOVO! Página atualizada
│   │   └── ...
│   ├── services/
│   │   ├── api.js
│   │   └── relatorioUtils.js   ← NOVO! Funções de relatório
│   ├── components/
│   ├── App.jsx
│   └── main.jsx
│
├── iniciar.bat                 ← Script para rodar tudo
├── package.json
└── vite.config.js
```

---

## 🐛 Se der erro...

### Erro: "npm command not found"
- Instale Node.js: https://nodejs.org/
- Reinicie o terminal

### Erro: "Port 5000 already in use"
- Outro processo está usando a porta
- Matalize: `netstat -ano | findstr :5000` (Windows)
- Ou mude a porta em `backend/server.js`

### Erro: "Cannot find module"
- Rode novamente: `npm install`
- Delete `node_modules` e `package-lock.json`
- Rode: `npm install` novamente

### Erro: "VITE: port 5173 not available"
- Outro projeto está rodando
- Mude a porta em `vite.config.js`

---

## 📊 O que você verá

### Na Página de Relatórios
```
Título: "Relatórios"
Descrição: "Relatórios dinâmicos e exportações"

[Configurações de Relatório]
  Nome do Monitor: [input]
  Data do Plantão: [calendar]
  [Baixar Relatório] [Visualizar]

[Contador] Total de ocorrências: X

[Cards com opções]
  - Relatório de Ocorrências
  - Visualizar em Texto
  - Relatório de Performance
```

### Na Gestão de Clientes
```
Título: "Gestão de Clientes"

[Tabela com colunas]
Cliente | Contato | Telefone | Endereço | Nível SLA | Ações
   ↓        ↓          ↓          ↓           ↓       👁️ ✏️ 🗑️
```

---

## ✨ Dicas Úteis

1. **Desenvolvimento em tempo real**: Vite recarrega automaticamente ao salvar
2. **Backend com hot-reload**: Nodemon reinicia ao salvar
3. **Console no navegador**: F12 para ver logs e erros
4. **React DevTools**: Instale a extensão para debug
5. **Documentação**: Veja `DOCUMENTACAO_TECNICA.md`

---

## 📱 Testar Funcionalidades

### Testar Relatório
1. Acesse: http://localhost:5173/relatorios
2. Preencha nome do monitor
3. Selecione data
4. Clique "Baixar Relatório"
5. Arquivo .txt será baixado ✅

### Testar Edição
1. Acesse: http://localhost:5173/clientes
2. Clique ícone Edit
3. Modifique um campo
4. Clique "Salvar Alterações"
5. Veja confirmação ✅

### Testar Exclusão
1. Acesse: http://localhost:5173/clientes
2. Clique ícone Lixeira
3. Confirme exclusão
4. Cliente desaparece ✅

---

**Pronto para rodar! 🚀**

Dúvidas? Consulte a documentação ou os logs do console.
