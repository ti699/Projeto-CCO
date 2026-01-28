# 🚀 GUIA RÁPIDO - NOVAS FUNCIONALIDADES CCO

## 📑 Índice
1. Geração de Relatórios
2. Edição de Clientes
3. Exclusão de Clientes

---

## 1. GERAÇÃO DE RELATÓRIOS DE FECHAMENTO ✅

### Como Acessar
```
Navegue até: http://seu-dominio/relatorios
```

### Passo a Passo

#### 1️⃣ Preencha os Dados
- **Nome do Monitor:** Digite seu nome (ex: "João Silva")
- **Data do Plantão:** Selecione o dia desejado

#### 2️⃣ Escolha uma Opção
- **Baixar Relatório:** Salva arquivo .txt no seu computador
- **Visualizar:** Mostra relatório na tela antes de enviar

#### 3️⃣ O Que Você Recebe?

Um relatório formatado assim:

```
╔════════════════════════════════════════════════════════════════╗
║      RELATÓRIO DE FECHAMENTO DE PLANTÃO - CCO ASTROTUR        ║
╚════════════════════════════════════════════════════════════════╝

📅 Data: 28/01/2026
👤 Monitor: João Silva

┌────────────────────────────────────────────────────────────────┐
│                   INDICADORES DO TURNO                         │
└────────────────────────────────────────────────────────────────┘

📊 Total de Ocorrências: 5
⏰ Ocorrências com Atraso: 2
🚗 Trocas de Veículo: 1
❌ Pendências: 1
```

### Informações no Relatório

**Indicadores do Turno:**
- Total de ocorrências do dia
- Quantas tiveram atraso
- Quantas trocaram de veículo
- Quantas ainda estão pendentes

**Ocorrências Críticas:**
- Apenas ocorrências com atraso ou troca de veículo
- Detalhe: Veículo original → Veículo substituto
- Tempo de atraso em minutos

**Resumo Geral:**
- Lista de todas as ocorrências
- Cliente, tipo e status

**Pendências:**
- Alerta com ocorrências não concluídas
- Priorizar no próximo turno

### 💡 Dicas
- Relatório pronto para enviar por WhatsApp ou Email
- Formato texto é universal (funciona em qualquer plataforma)
- Baixar para guardar cópia do histórico
- Reutilize dados de plantões anteriores

---

## 2. EDITAR INFORMAÇÕES DE CLIENTE ✅

### Como Acessar

#### Opção A - Da Listagem
```
1. Gestão de Clientes
2. Encontre o cliente na tabela
3. Clique ícone lápis (Edit)
```

#### Opção B - Da Página do Cliente
```
1. Acesse detalhes do cliente
2. Clique botão "Editar"
```

### O Que Pode Editar?

✅ **Dados Básicos:**
- Razão Social
- CNPJ
- Contato principal
- Telefone
- WhatsApp
- Email

✅ **Endereço:**
- Rua/Avenida
- Bairro
- Cidade
- Estado
- CEP

✅ **Configurações de SLA:**
- Nível (ALTO, MÉDIO, BAIXO)
- Tempo de resposta (minutos)
- Prioridades de comunicação (1ª, 2ª, 3ª opção)
- Ano da frota

✅ **Observações:**
- Campo livre para anotações

### Passo a Passo para Editar

1. **Acesse a página de edição**
2. **Modifique os campos desejados**
3. **Clique "Salvar Alterações"** (botão verde)
4. **Aguarde confirmação** ✅
5. **Será redirecionado para detalhes do cliente**

### ❌ Se der Erro

| Erro | O Que Fazer |
|------|------------|
| "Cliente não encontrado" | ID inválido, volte e tente novamente |
| "Erro no servidor" | Servidor indisponível, tente mais tarde |
| Campo vazio em vermelho | Campo obrigatório não preenchido |

---

## 3. EXCLUIR CLIENTE ✅

### ⚠️ ATENÇÃO
**Esta ação é irreversível!** O cliente será marcado como inativo.

### Como Deletar - Opção 1: Na Listagem

```
1. Vá para Gestão de Clientes
2. Localize o cliente na tabela
3. Clique ícone lixeira 🗑️
4. Confirme na caixa de diálogo
5. Pronto! Cliente excluído
```

### Como Deletar - Opção 2: Na Página do Cliente

```
1. Abra detalhes do cliente
2. Clique botão "Excluir" (vermelho)
3. Confirme a exclusão
4. Será redirecionado para a lista
5. Pronto! Cliente excluído
```

### Confirmação de Segurança

Antes de deletar, você verá:
```
"Tem certeza que deseja excluir o cliente 'NOME'? 
Esta ação é irreversível."
```

### O Que Acontece Após Deletar?

✅ Cliente é marcado como inativo
✅ Desaparece da listagem
✅ Não pode mais ser editado
✅ Ocorrências antigas são mantidas (histórico)

---

## 🔧 TROUBLESHOOTING

### Problema: Relatório não carrega
**Solução:** 
- Verifique se há ocorrências no sistema
- Tente selecionar outra data
- Recarregue a página (F5)

### Problema: Cliente não é excluído
**Solução:**
- Verifique se clicou em "Confirmar" na caixa de diálogo
- Certifique-se de ter permissões
- Recarregue a página após exclusão

### Problema: Edição não salva
**Solução:**
- Preencha todos os campos obrigatórios
- Verifique conexão com internet
- Tente novamente ou recarregue a página

### Problema: Arquivo não baixa
**Solução:**
- Verifique permissões de download do navegador
- Tente em outro navegador
- Desabilite bloqueadores de pop-up

---

## 📚 EXEMPLOS REAIS

### Exemplo 1: Geração Diária de Relatório

```
08:00 - Monitor inicia plantão
17:00 - Acessa página de relatórios
17:05 - Preenche nome: "Maria Silva"
17:05 - Seleciona data: 28/01/2026
17:06 - Clica "Baixar Relatório"
17:06 - Abre WhatsApp e compartilha o arquivo
17:07 - Gerente recebe e arquiva
```

### Exemplo 2: Atualizar Contato de Cliente

```
10:00 - Recebe nova informação de contato
10:05 - Acessa Gestão de Clientes
10:06 - Clica ícone Edit (ACHÊ)
10:07 - Atualiza telefone de (81)3333-2222 → (81)3333-3333
10:08 - Clica "Salvar Alterações"
10:09 - Confirmação: "Cliente atualizado com sucesso!"
10:10 - Dados atualizados no sistema
```

### Exemplo 3: Remover Cliente Inativo

```
15:00 - Recebe aviso que cliente "XYZ" encerrou contrato
15:05 - Acessa Gestão de Clientes
15:06 - Encontra cliente "XYZ"
15:07 - Clica ícone lixeira
15:08 - Confirma exclusão
15:09 - Cliente desaparece da listagem
15:10 - Histórico de ocorrências mantido
```

---

## 📞 SUPORTE

Para dúvidas ou problemas:
1. Consulte este guia
2. Verifique o RELATORIO_CORRECOES_2026.md
3. Contate o administrador do sistema

---

**Versão:** 1.0
**Data:** 28/01/2026
**Status:** ✅ Pronto para Produção
