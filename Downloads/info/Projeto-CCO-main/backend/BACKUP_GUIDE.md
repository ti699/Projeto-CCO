# Backup e Restauração do Banco de Dados

## 📦 Fazer Backup

Execute o arquivo `backup-database.bat` para criar um backup completo do banco de dados.

O backup será salvo na pasta `backup/` com data e hora no nome do arquivo.

```bash
# Windows
backup-database.bat
```

## 🔄 Restaurar Backup

Para restaurar um backup:

1. Execute `restore-database.bat`
2. Digite o caminho do arquivo de backup ou arraste o arquivo para a janela
3. Confirme a operação

**⚠️ ATENÇÃO:** Restaurar um backup irá SUBSTITUIR todos os dados atuais!

## 📁 Localização dos Backups

Os backups ficam salvos em: `backend/backup/`

Formato do nome: `backup_AAAAMMDD_HHMMSS.sql`

## 🔒 Segurança

- Arquivos de backup contêm dados sensíveis
- NÃO envie backups para o GitHub
- A pasta `backup/` já está configurada no `.gitignore`

## ☁️ Backup para GitHub

Se quiser versionar os dados no GitHub, você tem 2 opções:

### Opção 1: Dados de Exemplo (Recomendado)
Criar um arquivo `seed.sql` apenas com dados de exemplo/teste para desenvolvimento.

### Opção 2: Banco de Dados Online
Usar um serviço de banco de dados online:
- **Supabase** (gratuito)
- **Railway** (gratuito com limites)
- **Render** (gratuito com limites)
- **ElephantSQL** (PostgreSQL gratuito)

## 📊 Status Atual

✅ **29 clientes** cadastrados
✅ **2 usuários** cadastrados  
✅ **6 veículos** cadastrados

Os dados estão sendo salvos corretamente no PostgreSQL!
