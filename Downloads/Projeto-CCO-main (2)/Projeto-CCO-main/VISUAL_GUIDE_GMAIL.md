# 📸 GUIDE COM INSTRUÇÕES VISUAL - Configurar ccorelatorios@gmail.com

## 🔐 PASSO 1: ATIVAR 2FA (AUTENTICAÇÃO EM 2 FATORES)

### Screenshot 1: Google Account Security
```
URL: https://myaccount.google.com/
┌─────────────────────────────────────────┐
│  Google Conta                           │
├─────────────────────────────────────────┤
│  [Left Menu]                            │
│  ├─ Pessoal                             │
│  ├─ Segurança  ← CLIQUE AQUI            │
│  ├─ Privacidade                         │
│  └─ Preferências                        │
└─────────────────────────────────────────┘
```

### Screenshot 2: Segurança - Autenticação em 2 Etapas
```
URL: https://myaccount.google.com/security
┌──────────────────────────────────────────┐
│  Segurança                               │
├──────────────────────────────────────────┤
│  Sua senha                               │
│                                          │
│  Autenticação em 2 etapas               │
│  Status: Desativado                      │
│  [Iniciar a configuração] ← CLIQUE AQUI │
│                                          │
│  Senhas de app                           │
│  ...                                     │
└──────────────────────────────────────────┘
```

### Passo a passo de 2FA:
```
1️⃣  Escolha método de recuperação (telefone)
2️⃣  Confirme seu número de telefone
3️⃣  Receba código via SMS ou aplicativo
4️⃣  Confirme o código
5️⃣  2FA ATIVADO! ✅
```

---

## 🔑 PASSO 2: GERAR SENHA DE APP

### Screenshot 3: App Passwords (APÓS ativar 2FA!)
```
URL: https://myaccount.google.com/apppasswords
┌────────────────────────────────────┐
│  Senhas de app                      │
├────────────────────────────────────┤
│                                    │
│  Selecione o app e o dispositivo: │
│                                    │
│  App: [Email ▼]                   │
│  Dispositivo: [Windows Computer ▼] │
│                                    │
│  [Gerar] ← CLIQUE AQUI             │
│                                    │
└────────────────────────────────────┘
```

### Screenshot 4: Senha Gerada
```
┌────────────────────────────────────┐
│  Sua senha de app                  │
├────────────────────────────────────┤
│                                    │
│  abcd efgh ijkl mnop              │
│                                    │
│  [Copiar]  [Fechar]                │
│                                    │
│  ⚠️  Use esta senha apenas para    │
│     este app. Não compartilhe!     │
│                                    │
└────────────────────────────────────┘
```

**COPIE A SENHA INTEIRA COM OS ESPAÇOS! 👆**

---

## 📝 PASSO 3: CONFIGURAR NO `.env`

### Abra o arquivo
```
📁 Projeto-CCO
 └─ 📁 backend
     └─ 📄 .env  ← ABRA ESTE ARQUIVO
```

### Localize esta seção:
```env
# --- Configuração de Email ---
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=ccorelatorios@gmail.com
EMAIL_PASSWORD=COLE_AQUI_A_SENHA_DE_16_CARACTERES  ← AQUI!
EMAIL_FROM=noreply@astroturviagens.com
```

### Substitua por (exemplo):
```env
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

**IMPORTANTE:**
- Copie EXATAMENTE como aparece no Google
- Inclua os espaços
- Salve o arquivo

---

## 🧪 PASSO 4: TESTAR

### No terminal (PowerShell / CMD):
```powershell
cd c:\Users\Sofia\CCO\Projeto-CCO-1\backend
npm run test:email
```

### Resultado esperado:
```
═══════════════════════════════════════════════════════
🔍 TESTE DE CONFIGURAÇÃO DE EMAIL - Sistema CCO
═══════════════════════════════════════════════════════

📧 Credenciais Detectadas:
   HOST: smtp.gmail.com
   PORT: 587
   USER: ccorelatorios@gmail.com
   FROM: noreply@astroturviagens.com

📤 Enviando email de teste...
   Aguarde 5-10 segundos...

═══════════════════════════════════════════════════════
✅  EMAIL ENVIADO COM SUCESSO!
═══════════════════════════════════════════════════════

📧 Message ID: <CAIYcS...@mail.gmail.com>
✅ Sua configuração de email está funcionando corretamente!

🎉 Você pode usar a função "Finalizar Plantão" normalmente!

═══════════════════════════════════════════════════════
```

---

## 🎉 PRONTO!

Agora você pode:

1. Abrir o Dashboard
2. Clicar em "Finalizar Plantão"
3. Preencher observações (opcional)
4. Clicar em "Finalizar"
5. Email é enviado automaticamente para:
   - ti@astroturviagens.com
   - admin@astroturviagens.com

---

## ❌ SE RECEBER ERRO NO TEST

**Erro: "Invalid login"**
```
❌ Credenciais inválidas
✅ Solução: Gere uma NOVA senha de app e copie novamente
```

**Erro: "ENOTFOUND"**
```
❌ Sem conexão com internet ou host incorreto
✅ Solução: Verifique internet e que EMAIL_HOST=smtp.gmail.com
```

**Erro: "2FA" ou "Two-factor"**
```
❌ 2FA não está ativado
✅ Solução: Complete o Passo 1 corretamente
```

**Se tiver dúvida:** Execute `npm run test:email` novamente para diagnóstico detalhado!

---

## 📌 RESUMO RÁPIDO

| Passo | O que fazer | Time |
|-------|-----------|------|
| 1️⃣ | Ativar 2FA em myaccount.google.com | 10 min |
| 2️⃣ | Gerar Senha de App | 2 min |
| 3️⃣ | Colar em backend/.env | 1 min |
| 4️⃣ | Testar com `npm run test:email` | 1 min |
| ✅ | PRONTO! | **14 min** |

---

**Status:** 🚀 PRONTO PARA USAR  
**Data:** Janeiro 2026  
**Email:** ccorelatorios@gmail.com
