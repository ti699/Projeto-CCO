# 🎯 Guia Rápido: Finalizar Plantão com Envio de Email

## ✅ O que foi implementado

O botão "Finalizar Plantão" agora:

1. ✅ Gera um relatório detalhado com estatísticas do dia
2. ✅ **Envia o relatório por email** para `ti@astroturviagens.com` e outros
3. ✅ Inclui HTML formatado com tabelas e gráficos no email
4. ✅ Anexa o relatório em JSON para arquivamento
5. ✅ Baixa o relatório em JSON no navegador também
6. ✅ Mostra feedback ao usuário sobre sucesso/erro

---

## 🔧 Passos para Configurar

### Passo 1: Configure as Credenciais de Email

Edite o arquivo `backend/.env` com suas credenciais:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-app-password
EMAIL_FROM=noreply@astroturviagens.com
```

**Para Gmail:**
1. Acesse: https://myaccount.google.com/apppasswords
2. Gere uma "App Password" (será algo como: `abcd efgh ijkl mnop`)
3. Cole essa senha no campo `EMAIL_PASSWORD`

### Passo 2: Teste a Configuração (Opcional)

No terminal, dentro da pasta `backend/`:

```bash
npm run test:email
```

Você receberá um email de teste em alguns segundos.

### Passo 3: Reinicie o Backend

```bash
npm run dev
```

---

## 🚀 Como Usar

1. Vá para o **Dashboard**
2. Clique no botão **"Finalizar Plantão"** (botão vermelho no canto inferior direito)
3. **Preencha as observações** (opcional)
4. Clique em **"Finalizar"**
5. Aguarde a confirmação

### Resultado:

- 📧 Email enviado para `ti@astroturviagens.com`
- 💾 Relatório salvo em `backend/data/relatorios/`
- 📥 Arquivo JSON baixado no navegador
- ✅ Notificação de sucesso (ou aviso se houver erro)

---

## 📧 Conteúdo do Email

O email enviado contém:

- **Data do plantão**
- **Resumo estatístico:**
  - Total de ocorrências
  - Concluídas (✅)
  - Em andamento (⏳)
  - Pendentes (❌)
  - Com atraso
  - Com troca de veículo

- **Tabela detalhada** com todas as ocorrências do dia
- **Observações** do plantão (se preenchidas)
- **Arquivo JSON anexado** com todos os dados

---

## 🛠️ Personalização

### Adicionar Mais Emails Destinatários

Edite `backend/config/email.js`, função `enviarRelatorioPlan`:

```javascript
const emailsDestino = [
  'ti@astroturviagens.com',
  'admin@astroturviagens.com',
  'gerente@astroturviagens.com'  // Adicione aqui
];
```

### Mudar Assunto do Email

Em `backend/config/email.js`:

```javascript
subject: `📋 Relatório de Plantão - ${relatorio.data}`,
// Mude para:
subject: `🚌 Relatório de Operações - ${relatorio.data}`,
```

---

## ❌ Solução de Problemas

| Problema | Solução |
|----------|---------|
| Email não é enviado | Verifique credenciais no `.env` |
| Erro de autenticação | Use App Password (não senha da conta) |
| Email vai para Spam | Adicione o remetente aos contatos confiáveis |
| Sem arquivo anexado | Verifique pasta `backend/data/relatorios/` |
| Relatório vazio | Não há ocorrências registradas hoje |

---

## 📋 Checklist de Implementação

- ✅ Dependência `nodemailer` instalada
- ✅ Arquivo `backend/config/email.js` criado
- ✅ Função de envio integrada ao endpoint `/finalizar-plantao`
- ✅ Variáveis de ambiente configuradas
- ✅ Frontend atualizado com feedback de email
- ✅ Script de teste de email criado
- ✅ Documentação completa incluída

---

**Status:** ✅ FUNCIONAL  
**Data:** Janeiro de 2026  
**Teste:** Execute `npm run test:email` para validar

