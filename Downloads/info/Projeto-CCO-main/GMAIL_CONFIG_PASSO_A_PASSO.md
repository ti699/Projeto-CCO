# 🔐 Guia Completo: Configurar Email Gmail para o Sistema CCO

## ❌ Problema: "Senhas de app não disponível"

Se você vê a mensagem:
> "A configuração que você está procurando não está disponível para sua conta"

Significa que sua conta precisa de configuração prévia.

---

## ✅ Solução: Passo a Passo

### **PASSO 1: Habilitar Autenticação de 2 Fatores**

1. Vá para: https://myaccount.google.com/
2. Clique em **"Segurança"** (no lado esquerdo)
3. Role até encontrar **"Autenticação em 2 etapas"**
4. Clique em **"Iniciar a configuração"**
5. Siga as instruções (vai pedir seu telefone)
6. Confirme o código recebido no SMS/App Autenticador

⏱️ **Tempo:** ~5-10 minutos

---

### **PASSO 2: Gerar Senha de App**

**Importante:** Só funciona DEPOIS de habilitar 2FA!

1. Vá para: https://myaccount.google.com/apppasswords
2. Você será pedido para fazer login novamente
3. Selecione:
   - **App:** "Email"
   - **Dispositivo:** "Windows Computer" (ou seu SO)
4. Clique em **"Gerar"**
5. Você receberá uma senha com 16 caracteres:
   ```
   abcd efgh ijkl mnop
   ```
6. **Copie essa senha** (inclua os espaços!)

---

### **PASSO 3: Configurar no Arquivo `.env`**

Edite `backend/.env` e atualize:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=ccorelatorios@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM=noreply@astroturviagens.com
```

**Importante:**
- `EMAIL_USER` = seu email Gmail completo
- `EMAIL_PASSWORD` = a senha de 16 caracteres gerada no Google
- Inclua os espaços da senha!

---

### **PASSO 4: Teste a Configuração**

No terminal, dentro da pasta `backend/`:

```bash
npm run test:email
```

Se receber a mensagem:
```
✅ EMAIL ENVIADO COM SUCESSO!
```

Significa que está funcionando! 🎉

---

## 🆘 Se Ainda Não Funcionar

### Erro: "Less secure app access"

1. Vá para: https://myaccount.google.com/lesssecureapps
2. Selecione **"Ativar acesso a apps menos seguros"** (pode aparecer desativado)
3. Se mesmo assim não funcionar, use "Senhas de app" (acima)

### Erro: "Invalid credentials"

- Verifique se a senha de app tem 16 caracteres (com espaços)
- Verifique se incluiu os espaços na password
- Copie direto do Google, sem modificações
- Reinicie o backend após alterar `.env`

### Erro: "Connection refused"

- Verifique se `EMAIL_HOST` e `EMAIL_PORT` estão corretos
- Gmail USA: `smtp.gmail.com:587`
- Verifique conexão com internet

---

## 📋 Checklist de Configuração

- [ ] Fiz login em: https://myaccount.google.com/
- [ ] Habilitei "Autenticação em 2 etapas"
- [ ] Gerei "Senha de app" em: https://myaccount.google.com/apppasswords
- [ ] Copiei a senha com espaços (16 caracteres)
- [ ] Atualizei `backend/.env` com as credenciais
- [ ] Executei `npm run test:email` com sucesso
- [ ] Recebi email de teste em ccorelatorios@gmail.com

---

## 🎯 Solução Alternativa: Usar Outro Provedor

Se os passos acima não funcionarem, você pode usar:

### **Option 1: SendGrid (Recomendado)**
- Grátis: 100 emails/dia
- Não precisa de 2FA
- Configure: https://sendgrid.com/

### **Option 2: Mailtrap (Para Teste)**
- Sandbox seguro para testes
- Configure: https://mailtrap.io/

### **Option 3: Amazon SES**
- Profissional
- Configure: https://aws.amazon.com/ses/

---

## 🔄 Para Mudar de Email

Se quiser usar outro email Gmail:

1. **Use credenciais do novo email**
2. **Ative 2FA nesse novo email**
3. **Gere "Senha de app" para ele**
4. **Atualize `.env`**
5. **Teste com `npm run test:email`**

---

## ✅ Status Esperado Após Configuração

```
📧 Credenciais:
   HOST: smtp.gmail.com
   PORT: 587
   USER: ccorelatorios@gmail.com
   FROM: noreply@astroturviagens.com

📤 Enviando email de teste...

✅ EMAIL ENVIADO COM SUCESSO!
📧 Message ID: <mensagem-id>
✅ Sua configuração de email está funcionando corretamente!
```

---

**Data:** Janeiro 2026  
**Suporte:** Verifique EMAIL_SETUP.md para mais detalhes
