# ✅ CHECKLIST PASSO-A-PASSO: Configurar Email ccorelatorios@gmail.com

## 🎯 MISSÃO
Configurar o email `ccorelatorios@gmail.com` para enviar relatórios de plantão.

---

## 📋 FASE 1: PREPARAÇÃO (5-10 MINUTOS)

### ✅ PASSO 1: Abrir Google Account Security
- [ ] Vou para: https://myaccount.google.com/
- [ ] Faço login com: **ccorelatorios@gmail.com**
- [ ] Clico em **"Segurança"** (no menu esquerdo)

### ✅ PASSO 2: Ativar Autenticação em 2 Fatores
- [ ] Encontro "Autenticação em 2 etapas"
- [ ] Clico em **"Iniciar a configuração"**
- [ ] Confirmo minha senha
- [ ] Adiciono meu número de telefone
- [ ] Confirmo o código recebido (SMS ou App)
- [ ] **2FA ATIVADO!** ✅

---

## 🔑 FASE 2: GERAR SENHA DE APP (2-3 MINUTOS)

### ✅ PASSO 3: Acessar App Passwords
- [ ] Vou para: https://myaccount.google.com/apppasswords
- [ ] Faço login novamente (é normal)
- [ ] Vejo a página "Senhas de app"

### ✅ PASSO 4: Gerar a Senha
- [ ] Seleciono: **App = "Email"**
- [ ] Seleciono: **Dispositivo = "Windows Computer"** (ou seu SO)
- [ ] Clico em **"Gerar"**

### ✅ PASSO 5: Copiar a Senha
- [ ] Google mostra a senha (16 caracteres com espaços)
- [ ] **Copiar EXATAMENTE como aparece** (ex: abcd efgh ijkl mnop)
- [ ] Colo em um bloco de notas temporário

---

## 📝 FASE 3: CONFIGURAR PROJETO (1-2 MINUTOS)

### ✅ PASSO 6: Abrir Arquivo `.env`
- [ ] Abro a pasta: `c:\Users\Sofia\CCO\Projeto-CCO-1\backend\`
- [ ] Abro o arquivo: `.env` (no editor de texto ou VS Code)

### ✅ PASSO 7: Atualizar Configuração
- [ ] Encontro a seção: **"Configuração de Email"**
- [ ] Localizo: `EMAIL_PASSWORD=COLE_AQUI_A_SENHA_DE_16_CARACTERES`
- [ ] **Substituo** por: (exemplo)
  ```
  EMAIL_PASSWORD=abcd efgh ijkl mnop
  ```
- [ ] **Salvo o arquivo** (Ctrl+S)

---

## 🧪 FASE 4: TESTAR (1-2 MINUTOS)

### ✅ PASSO 8: Executar Teste
- [ ] Abro PowerShell ou CMD
- [ ] Vou para: `cd c:\Users\Sofia\CCO\Projeto-CCO-1\backend`
- [ ] Executo: `npm run test:email`
- [ ] Aguardo 5-10 segundos

### ✅ PASSO 9: Verificar Resultado
- [ ] Vejo a mensagem: **"✅ EMAIL ENVIADO COM SUCESSO!"**
- [ ] **OU** recebo mensagem de erro com sugestões (se houver)

---

## 🎉 FASE 5: USAR O SISTEMA (INFINITO!)

### ✅ PASSO 10: Testar no Dashboard
- [ ] Vou para: Dashboard do Sistema CCO
- [ ] Clico em: **"Finalizar Plantão"**
- [ ] Preencho observações (opcional)
- [ ] Clico em: **"Finalizar"**
- [ ] Recebo confirmação: **"✅ Plantão finalizado! Relatório enviado por email..."**
- [ ] Email chega em: ti@astroturviagens.com e admin@astroturviagens.com

---

## 🆘 TROUBLESHOOTING

### ❓ Erro: "A configuração que você está procurando não está disponível"
- ✅ Solução: Volte ao PASSO 2 - 2FA não foi ativado corretamente
- ✅ Verifique: Recebeu SMS/confirmou código?

### ❓ Erro: "Invalid login" ao executar `npm run test:email`
- ✅ Solução: Gere uma NOVA senha de app (PASSO 4)
- ✅ Copie EXATAMENTE como Google mostra (com espaços)
- ✅ Atualize `.env` com a nova senha

### ❓ Erro: "ENOTFOUND" ou sem conexão
- ✅ Solução: Verifique sua conexão com internet
- ✅ Verifique que `EMAIL_HOST=smtp.gmail.com` está correto

### ❓ Email não chega em 10 minutos
- ✅ Verifique pasta de SPAM do Gmail
- ✅ Execute `npm run test:email` novamente
- ✅ Verifique credenciais em `.env`

---

## 📊 PROGRESSO VISUAL

```
FASE 1: Preparação
[████████░░] 80% ← Aqui você está agora

FASE 2: Gerar Senha
[██████░░░░] 60%

FASE 3: Configurar
[███░░░░░░░] 30%

FASE 4: Testar
[█░░░░░░░░░] 10%

FASE 5: Usar
[░░░░░░░░░░] 0% ← Próximo objetivo!
```

---

## 💾 DOCUMENTOS DE REFERÊNCIA

Se tiver dúvidas, consulte:

1. **CONFIG_EMAIL_VISUAL.md** - Guia visual com instruções simples
2. **VISUAL_GUIDE_GMAIL.md** - Instruções com "screenshots" de texto
3. **GMAIL_CONFIG_PASSO_A_PASSO.md** - Guia completo com soluções
4. **EMAIL_SETUP.md** - Documentação técnica completa

---

## 🚀 PRÓXIMOS PASSOS

Quando todos os ✅ estiverem marcados:

1. ✅ Reinicie o backend: `npm run dev`
2. ✅ Acesse o Dashboard
3. ✅ Finalize um plantão
4. ✅ Veja o email chegar! 📧

---

## 📞 PRECISA DE AJUDA?

Execute sempre:
```bash
npm run test:email
```

Este comando:
- ✅ Valida suas credenciais
- ✅ Testa a conexão com Gmail
- ✅ Mostra exatamente qual é o problema (se houver)
- ✅ Sugere como resolver

---

**Status Esperado ao Finalizar:** 🎉 TUDO FUNCIONANDO!

**Tempo Total Estimado:** ~20 minutos (principalmente ativando 2FA)

**Data:** Janeiro 2026  
**Email:** ccorelatorios@gmail.com  
**Sistema:** Sistema CCO
