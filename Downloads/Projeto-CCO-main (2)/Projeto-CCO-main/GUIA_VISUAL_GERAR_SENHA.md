# 📸 GUIA VISUAL: GERAR NOVA SENHA DE APP - PASSO-A-PASSO

## 🎯 SEU OBJETIVO
Gerar uma **NOVA** senha de app válida para `ccorelatorios@gmail.com`

---

## 📱 PASSO 1: ABRIR A PÁGINA

### Digite na barra de endereço do navegador:
```
https://myaccount.google.com/apppasswords
```

### Você vai ver esta página:

```
┌─────────────────────────────────────────────────────┐
│  Google Conta        [⚙️ Configurações]  [👤 Perfil]│
├─────────────────────────────────────────────────────┤
│                                                     │
│  🔐 Senhas de app                                   │
│                                                     │
│  Selecione o app e o dispositivo:                  │
│                                                     │
│  App:        [Email ▼]                             │
│  Dispositivo: [Windows Computer ▼]                 │
│                                                     │
│              [Gerar]  ← CLIQUE AQUI!               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## ✅ PASSO 2: VERIFICAR SELEÇÕES

Antes de clicar em "Gerar", **verifique:**

### Campo "App":
```
[Email ▼]  ← Deve estar em "Email"
           ou "Mail"
           
Se não:
1. Clique na seta ▼
2. Selecione "Email"
3. Clique fora para fechar
```

### Campo "Dispositivo":
```
[Windows Computer ▼]  ← Deve estar em "Windows Computer"
                      (ou seu sistema operacional)

Se não:
1. Clique na seta ▼
2. Selecione seu SO (Windows, Mac, Linux)
3. Clique fora para fechar
```

---

## 🎬 PASSO 3: CLICAR "GERAR"

Quando TUDO estiver correto:

```
┌────────────────────────────────────┐
│  [Gerar]  ← CLIQUE AQUI!           │
└────────────────────────────────────┘
```

---

## 📋 PASSO 4: GOOGLE VAI MOSTRAR A SENHA

Google vai exibir uma janela assim:

```
┌─────────────────────────────────────────────────────┐
│  🔐 Sua senha de app para Email em Windows         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Copie esta senha e use-a no seu app:              │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  abcd efgh ijkl mnop                          │ │
│  └───────────────────────────────────────────────┘ │
│              ↑                                      │
│     ESTA SENHA AQUI!                               │
│     (16 caracteres + 3 espaços)                    │
│                                                     │
│  [Copiar]  [Fechar]  [Remover]                    │
│                                                     │
│  ⚠️  Importante:                                    │
│  • Use apenas para este app                        │
│  • Não compartilhe esta senha                      │
│  • Google não a mostrará novamente                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 PASSO 5: COPIAR A SENHA

### OPÇÃO A: Botão "Copiar" (Recomendado)
```
1. Clique no botão [Copiar]
2. Google copia automaticamente
3. Pronto!
```

### OPÇÃO B: Copiar Manualmente
```
1. Selecione todo o texto: abcd efgh ijkl mnop
   (Clique 3x para selecionar tudo)

2. Copie: Ctrl+C

3. Pronto!
```

---

## 📝 PASSO 6: ABRIR O ARQUIVO `.env`

### Abra seu editor (VS Code):

```
Arquivo > Abrir Arquivo
ou
Ctrl+O

Procure por:
C:\Users\Sofia\CCO\Projeto-CCO-1\backend\.env

Clique para abrir
```

### Você vai ver:

```
# --- Configuração de Email ---
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=ccorelatorios@gmail.com
EMAIL_PASSWORD=acup luhc ysnt onii  ← ESTA LINHA!
EMAIL_FROM=noreply@astroturviagens.com
```

---

## 🖍️ PASSO 7: SUBSTITUIR A SENHA

### Localize:
```
EMAIL_PASSWORD=acup luhc ysnt onii
                 ^^^^^^^^^^^^^^
                 ESTA PARTE!
```

### Selecione apenas a SENHA (não o EMAIL_PASSWORD=):
```
EMAIL_PASSWORD=acup luhc ysnt onii
               ↑ daqui           ↑
               selecione até aqui
```

### Cole a NOVA senha (Ctrl+V):
```
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Resultado Final:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=ccorelatorios@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop  ✅ ATUALIZADO!
EMAIL_FROM=noreply@astroturviagens.com
```

---

## 💾 PASSO 8: SALVAR O ARQUIVO

### No VS Code:
```
Ctrl+S  ou  Arquivo > Salvar
```

### Você vai ver:
```
Backend/
 └─ .env ✅ (arquivo salvo - sem bolinha)
```

---

## 🧪 PASSO 9: TESTAR NO TERMINAL

### Abra PowerShell:
```
Abra: Windows PowerShell ou CMD
```

### Vá para a pasta backend:
```powershell
cd C:\Users\Sofia\CCO\Projeto-CCO-1\backend
```

### Execute o teste:
```powershell
npm run test:email
```

### Aguarde 5-10 segundos...

---

## ✅ RESULTADO ESPERADO

```
════════════════════════════════════════════════════════════
🔍 TESTE DE CONFIGURAÇÃO DE EMAIL - Sistema CCO
════════════════════════════════════════════════════════════

📧 Credenciais Detectadas:
   HOST: smtp.gmail.com
   PORT: 587
   USER: ccorelatorios@gmail.com
   FROM: noreply@astroturviagens.com

📤 Enviando email de teste...
   Aguarde 5-10 segundos...

════════════════════════════════════════════════════════════
✅  EMAIL ENVIADO COM SUCESSO!
════════════════════════════════════════════════════════════

📧 Message ID: <CAIYcS...@mail.gmail.com>
✅ Sua configuração de email está funcionando corretamente!

🎉 Você pode usar a função "Finalizar Plantão" normalmente!

════════════════════════════════════════════════════════════
```

---

## ❌ SE AINDA RECEBER ERRO

### Erro: "Invalid login: Username and Password not accepted"

1. ✅ Verifique se copou a senha exatamente como Google mostrou
2. ✅ Sem adicionar ou remover espaços
3. ✅ Tente gerar uma NOVA senha:
   - Volte para: https://myaccount.google.com/apppasswords
   - Clique "Remover" na senha anterior
   - Gere uma nova
   - Copie com cuidado

---

## 🎉 SUCESSO!

Quando receber:
```
✅ EMAIL ENVIADO COM SUCESSO!
```

Você está pronto para usar "Finalizar Plantão"! 🚀

---

**Tempo Total:** ⏱️ ~3 minutos  
**Dificuldade:** ⭐ Muito fácil  
**Status:** 🎯 Siga este guia exatamente!
