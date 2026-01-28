# 🎯 Configuração Email ccorelatorios@gmail.com - Guia Visual

## 📌 Seu Email
```
EMAIL_USER=ccorelatorios@gmail.com
```

## ⚠️ Problema Encontrado
```
❌ "A configuração que você está procurando não está disponível para sua conta"
```

**Causa:** Autenticação em 2 Fatores não está ativada nessa conta.

---

## ✅ SOLUÇÃO - 3 PASSOS SIMPLES

### **PASSO 1️⃣: Ativar Autenticação em 2 Fatores (2FA)**

1. Faça login em: **https://myaccount.google.com/**
2. Clique em **"Segurança"** (lado esquerdo)
3. Role até **"Autenticação em 2 etapas"**
4. Clique em **"Iniciar a configuração"**
5. Siga as instruções:
   - Confirme sua senha
   - Adicione seu telefone
   - Confirme o código SMS/App

⏱️ Tempo: ~10 minutos

---

### **PASSO 2️⃣: Gerar Senha de App**

⚠️ **Só funciona DEPOIS de completar o Passo 1!**

1. Acesse: **https://myaccount.google.com/apppasswords**
2. Você será pedido para fazer login novamente (normal)
3. Escolha:
   - **App:** "Email"
   - **Dispositivo:** "Windows Computer"
4. Clique em **"Gerar"**

5. **Google vai mostrar uma senha assim:**
   ```
   abcd efgh ijkl mnop
   ```

6. **Copie TUDO** (inclua os espaços)

---

### **PASSO 3️⃣: Colar no Arquivo `.env`**

Abra: `backend/.env`

Procure esta seção:
```env
# --- Configuração de Email ---
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=ccorelatorios@gmail.com
EMAIL_PASSWORD=COLE_AQUI_A_SENHA_DE_16_CARACTERES
EMAIL_FROM=noreply@astroturviagens.com
```

**Substitua:** `COLE_AQUI_A_SENHA_DE_16_CARACTERES`

**Pela senha do Google** (exemplo completo):
```env
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

✅ **Salve o arquivo!**

---

## 🧪 TESTAR A CONFIGURAÇÃO

No terminal, dentro da pasta `backend/`:

```bash
npm run test:email
```

### Sucesso! ✅
```
✅ EMAIL ENVIADO COM SUCESSO!
📧 Message ID: <id-da-mensagem>
✅ Sua configuração de email está funcionando corretamente!
```

### Erro? ❌
O script vai mostrar a causa exata e como resolver!

---

## 🚀 PRONTO PARA USAR!

Agora quando você clicar em **"Finalizar Plantão"**:
- ✅ Relatório é gerado
- ✅ Email é enviado para ti@astroturviagens.com
- ✅ Arquivo JSON é baixado
- ✅ Notificação de sucesso aparece

---

## 📋 CHECKLIST RÁPIDO

- [ ] Fiz login em: https://myaccount.google.com/
- [ ] Habilitei "Autenticação em 2 etapas"
- [ ] Acessei: https://myaccount.google.com/apppasswords
- [ ] Selecionei "Email" e "Windows Computer"
- [ ] Copiei a senha de 16 caracteres
- [ ] Atualizei `backend/.env` com a senha
- [ ] Executei `npm run test:email` e recebi ✅
- [ ] Email de teste chegou em ccorelatorios@gmail.com

---

## 🆘 ALGO DEU ERRADO?

Consulte: `GMAIL_CONFIG_PASSO_A_PASSO.md`

Ele contém:
- Soluções para erros comuns
- Alternativas de email
- Guia detalhado com prints

---

**Qualquer dúvida:** Execute `npm run test:email` para diagnóstico automático! 🎉
