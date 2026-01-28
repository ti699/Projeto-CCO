# ⚡ QUICK START - Email ccorelatorios@gmail.com

## 🚀 TL;DR (Muito Longo; Não Li)

1. **Ative 2FA** em sua conta Google: https://myaccount.google.com/security
2. **Gere Senha de App** aqui: https://myaccount.google.com/apppasswords
3. **Cole no `.env`**: `EMAIL_PASSWORD=sua-senha-16-caracteres`
4. **Teste**: `npm run test:email`
5. **Pronto!** ✅

---

## 📱 PASSO A PASSO VISUALIZADO

```
┌────────────────────────────────────────────┐
│  PASSO 1: ATIVAR 2FA                       │
├────────────────────────────────────────────┤
│  myaccount.google.com > Segurança >        │
│  Autenticação em 2 etapas > Iniciar        │
│                                            │
│  ✅ 2FA ATIVADO                            │
└────────────────────────────────────────────┘
                      ↓
┌────────────────────────────────────────────┐
│  PASSO 2: GERAR SENHA                      │
├────────────────────────────────────────────┤
│  myaccount.google.com/apppasswords >       │
│  Email + Windows Computer > Gerar          │
│                                            │
│  📋 Copia: abcd efgh ijkl mnop             │
└────────────────────────────────────────────┘
                      ↓
┌────────────────────────────────────────────┐
│  PASSO 3: COLAR NO .env                    │
├────────────────────────────────────────────┤
│  backend/.env                              │
│  EMAIL_PASSWORD=abcd efgh ijkl mnop        │
│                                            │
│  ✅ Arquivo Salvo                          │
└────────────────────────────────────────────┘
                      ↓
┌────────────────────────────────────────────┐
│  PASSO 4: TESTAR                           │
├────────────────────────────────────────────┤
│  npm run test:email                        │
│                                            │
│  ✅ EMAIL ENVIADO COM SUCESSO!             │
└────────────────────────────────────────────┘
                      ↓
                    🎉
        PRONTO PARA USAR NO DASHBOARD!
```

---

## 📝 ARQUIVO `.env` - FINAL

```env
# --- Configuração de Email ---
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=ccorelatorios@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM=noreply@astroturviagens.com
```

---

## 🧪 TESTE AGORA

```bash
cd backend
npm run test:email
```

### ✅ Sucesso
```
✅ EMAIL ENVIADO COM SUCESSO!
```

### ❌ Erro?
O próprio comando `test:email` mostra a solução! 🤖

---

## 📚 DOCUMENTAÇÃO DISPONÍVEL

- **CONFIG_EMAIL_VISUAL.md** ← Comece por aqui (mais visual)
- **CHECKLIST_INTERATIVO.md** ← Se quiser seguir checklist
- **GMAIL_CONFIG_PASSO_A_PASSO.md** ← Guia técnico completo
- **VISUAL_GUIDE_GMAIL.md** ← Instruções com exemplos

---

## 🎯 PRONTO!

Agora quando você clicar em "Finalizar Plantão":

✅ Relatório é gerado  
✅ Email é enviado para ti@astroturviagens.com  
✅ Arquivo JSON é baixado  
✅ Notificação de sucesso aparece  

---

**Tempo Total:** ⏱️ ~20 minutos (10 min ativando 2FA + 2 min gerando senha + 1 min configurando + 1 min testando)

**Dificuldade:** ⭐ Muito fácil

**Status:** 🚀 Pronto para começar!
