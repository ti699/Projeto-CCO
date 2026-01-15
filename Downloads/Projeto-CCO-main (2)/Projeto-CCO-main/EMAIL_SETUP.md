# 📧 Configuração de Email - Sistema CCO

## Como Configurar o Envio de Emails

O Sistema CCO agora envia relatórios de plantão por email para `ti@astroturviagens.com` e outros destinatários quando você clica no botão "Finalizar Plantão".

### 📋 Pré-requisitos

- Conta de email (recomendado: Gmail)
- Aplicação backend rodando com `nodemailer` instalado (já incluído)

### 🔧 Configuração com Gmail

Se você usar Gmail, siga estes passos:

#### 1. **Ativar Autenticação de 2 Fatores (se ainda não ativada)**
   - Acesse: https://myaccount.google.com/security
   - Ative "2-Step Verification"

#### 2. **Gerar uma App Password**
   - Acesse: https://myaccount.google.com/apppasswords
   - Selecione "Mail" e "Windows Computer"
   - Copie a senha gerada (será algo como: `abcd efgh ijkl mnop`)

#### 3. **Atualizar o arquivo `.env`**
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=seu-email@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   EMAIL_FROM=noreply@astroturviagens.com
   ```

### 🔧 Configuração com Outro Provedor de Email

Se usar outro provedor (Outlook, SendGrid, etc.):

```
EMAIL_HOST=smtp.seuservidor.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu-email@seudominio.com
EMAIL_PASSWORD=sua-senha
EMAIL_FROM=seu-email@seudominio.com
```

### 📤 Destinatários de Email

Os emails são enviados para:
- `ti@astroturviagens.com`
- `admin@astroturviagens.com` (adicione mais conforme necessário)

Para adicionar mais destinatários, edite `backend/config/email.js` na função `enviarRelatorioPlan`:

```javascript
const emailsDestino = [
  'ti@astroturviagens.com',
  'admin@astroturviagens.com',
  'seu-email@astroturviagens.com'  // Adicione aqui
];
```

### ✅ Testando a Configuração

1. Reinicie o backend: `npm run dev`
2. No Dashboard, clique em "Finalizar Plantão"
3. Preencha as observações (opcional)
4. Clique em "Finalizar"
5. Verifique a caixa de entrada do email configurado

### 📧 O que é Enviado?

Quando você finaliza o plantão, um email é enviado contendo:

- **Resumo estatístico** do dia:
  - Total de ocorrências
  - Concluídas, em andamento e pendentes
  - Ocorrências com atraso
  - Trocas de veículo

- **Tabela detalhada** com todas as ocorrências

- **Observações** do plantão (se preenchidas)

- **Anexo JSON** com os dados completos para arquivamento

### ❌ Solução de Problemas

**Email não é enviado:**
- Verifique se as credenciais no `.env` estão corretas
- Confira se o porta (587) é a correta para seu provider
- Veja os logs do servidor para mensagens de erro

**Erro de autenticação no Gmail:**
- Use uma **App Password**, não a senha da sua conta
- Desabilite "Less secure app access" (se ainda estiver habilitado) ou use a App Password

**Email vai para Spam:**
- Adicione `noreply@astroturviagens.com` à sua lista de contatos confiáveis
- Verifique se o domínio de origem está configurado corretamente

### 🔒 Segurança

- **Nunca** commit credenciais de email no GitHub
- Use variáveis de ambiente (`.env`) para armazenar senhas
- Para produção, use um serviço de email profissional (SendGrid, AWS SES, etc.)

---

**Desenvolvido em Janeiro de 2026** 📅
