# ⚡ SOLUÇÃO RÁPIDA: 3 PASSOS APENAS

## ❌ PROBLEMA
```
Invalid login: Username and Password not accepted
```

## ✅ SOLUÇÃO

### **1️⃣ GERAR NOVA SENHA (2 min)**
```
1. Vá para: https://myaccount.google.com/apppasswords
2. Selecione: Email + Windows Computer
3. Clique: [Gerar]
4. Copie a senha (16 caracteres com espaços)
```

### **2️⃣ COLAR NO `.env` (1 min)**
```
Arquivo: backend/.env

Substitua:
EMAIL_PASSWORD=acup luhc ysnt onii

Pela nova senha:
EMAIL_PASSWORD=abcd efgh ijkl mnop

Salve: Ctrl+S
```

### **3️⃣ TESTAR (1 min)**
```bash
cd backend
npm run test:email
```

**Resultado esperado:**
```
✅ EMAIL ENVIADO COM SUCESSO!
```

---

## 🎯 PRONTO!

Agora o botão "Finalizar Plantão" funciona! 🎉

---

**Guias disponíveis:**
- `GUIA_VISUAL_GERAR_SENHA.md` - Com "screenshots"
- `GERAR_NOVA_SENHA.md` - Guia completo

**Tempo total:** ~4 minutos
