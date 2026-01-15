# 📦 Versionamento de Dados no GitHub

## 🎯 Visão Geral

Este projeto mantém **TODOS os dados** versionados no GitHub através do arquivo `database/dados-iniciais.sql`.

## 📤 Como Atualizar os Dados no GitHub

Sempre que você fizer alterações importantes (novos clientes, veículos, usuários, etc) e quiser salvá-las no GitHub:

### Opção 1: Script Automático
```bash
# Execute o script
backend\exportar-dados-github.bat

# Depois faça commit
git add backend/database/dados-iniciais.sql
git commit -m "Atualizar dados do sistema"
git push
```

### Opção 2: Manual
```bash
# Exportar dados
pg_dump -U postgres -d sistema_cco --data-only --inserts -f backend/database/dados-iniciais.sql

# Fazer commit
git add backend/database/dados-iniciais.sql
git commit -m "Atualizar dados do sistema"
git push
```

## 📥 Como Restaurar os Dados do GitHub

Quando você clonar o projeto em outro computador ou quiser restaurar os dados:

### Opção 1: Script Automático
```bash
# Execute o script
backend\importar-dados-github.bat
```

### Opção 2: Manual
```bash
# 1. Criar tabelas (se necessário)
psql -U postgres -d sistema_cco -f backend/database/schema.sql

# 2. Importar dados
psql -U postgres -d sistema_cco -f backend/database/dados-iniciais.sql
```

## 📂 Estrutura de Arquivos

```
backend/
├── database/
│   ├── schema.sql              # Estrutura das tabelas (VAI pro GitHub)
│   └── dados-iniciais.sql      # Dados completos (VAI pro GitHub)
├── backup/                     # Backups locais (NÃO vai pro GitHub)
├── exportar-dados-github.bat   # Exporta dados para GitHub
└── importar-dados-github.bat   # Importa dados do GitHub
```

## ⚠️ Avisos Importantes

1. **Dados Sensíveis**: Os dados estarão PÚBLICOS no GitHub se o repositório for público
2. **Senhas**: Usuários terão senhas hasheadas (seguro)
3. **.env**: Arquivo de configuração com senha do banco NÃO vai pro GitHub
4. **Backups Locais**: Use `backup-database.bat` para backups que ficam apenas no seu PC

## 🔄 Fluxo de Trabalho Recomendado

### Desenvolvimento Local
1. Trabalhe normalmente no sistema
2. Dados salvos no PostgreSQL local
3. Faça backups locais periodicamente

### Publicar no GitHub
1. Execute `exportar-dados-github.bat`
2. Revise as mudanças: `git diff backend/database/dados-iniciais.sql`
3. Commit e push

### Novo Computador
1. Clone o repositório
2. Configure PostgreSQL
3. Execute `importar-dados-github.bat`
4. Pronto!

## 📊 Dados Atuais

✅ 29 clientes
✅ 2 usuários
✅ 6 veículos
✅ Todos os dados estão em `database/dados-iniciais.sql`
