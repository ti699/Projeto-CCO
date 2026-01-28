# Exemplos de Uso da API - Sistema CCO

Base URL: `http://localhost:5000/api`

## 🔐 Autenticação

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@sistemacco.com",
  "password": "admin123"
}
```

**Resposta:**
```json
{
  "user": {
    "id": 1,
    "nome": "Administrador",
    "email": "admin@sistemacco.com",
    "cargo": "Administrador",
    "perfil": "administrador"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Recuperar Senha
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "usuario@email.com"
}
```

## 👥 Clientes

### Listar Clientes
```http
GET /api/clientes
Authorization: Bearer {token}
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Hotel Mar Azul",
    "cnpj": "12.345.678/0001-90",
    "contato": "(11) 99999-9999",
    "email": "contato@marazul.com",
    "sla_horas": 2,
    "created_at": "2025-12-26T10:00:00Z"
  }
]
```

### Criar Cliente
```http
POST /api/clientes
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Pousada Sol Nascente",
  "cnpj": "98.765.432/0001-10",
  "contato": "(11) 88888-8888",
  "email": "contato@solnascente.com",
  "endereco": "Rua das Flores, 123",
  "sla_horas": 1
}
```

### Atualizar Cliente
```http
PUT /api/clientes/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Hotel Mar Azul Premium",
  "cnpj": "12.345.678/0001-90",
  "contato": "(11) 99999-9999",
  "email": "premium@marazul.com",
  "sla_horas": 1
}
```

### Excluir Cliente
```http
DELETE /api/clientes/1
Authorization: Bearer {token}
```

## 📝 Ocorrências

### Listar Ocorrências
```http
GET /api/ocorrencias
Authorization: Bearer {token}
```

**Resposta:**
```json
[
  {
    "id": 1,
    "numero": "005312",
    "cliente_id": 1,
    "cliente_nome": "Hotel Mar Azul",
    "veiculo_id": 1,
    "placa": "ABC-1234",
    "modelo": "Van Mercedes",
    "tipo_quebra_id": 1,
    "tipo_quebra_nome": "Suspensão",
    "data_quebra": "2025-12-24T10:30:00Z",
    "data_chamado": "2025-12-24T10:45:00Z",
    "data_atendimento": "2025-12-24T11:15:00Z",
    "data_conclusao": "2025-12-24T14:30:00Z",
    "status": "Concluído",
    "aprovado": true,
    "created_at": "2025-12-24T10:45:00Z"
  }
]
```

### Buscar Ocorrência por ID
```http
GET /api/ocorrencias/1
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": 1,
  "numero": "005312",
  "cliente_nome": "Hotel Mar Azul",
  "cliente_contato": "(11) 99999-9999",
  "placa": "ABC-1234",
  "modelo": "Van Mercedes",
  "tipo_quebra_nome": "Suspensão",
  "descricao": "Problema na suspensão dianteira esquerda",
  "observacoes": "Veículo estava carregado",
  "km": 145320,
  "local_quebra": "Rodovia BR-101, km 245",
  "status": "Concluído",
  "aprovado": true,
  "aprovado_por_nome": "João Silva",
  "timeline": [
    {
      "tipo": "criacao",
      "descricao": "Ocorrência criada",
      "usuario_nome": "Maria Santos",
      "created_at": "2025-12-24T10:45:00Z"
    }
  ],
  "anexos": [
    {
      "id": 1,
      "nome_arquivo": "foto_suspensao.jpg",
      "tipo_arquivo": "imagem",
      "tamanho_bytes": 2516582
    }
  ]
}
```

### Criar Ocorrência
```http
POST /api/ocorrencias
Authorization: Bearer {token}
Content-Type: application/json

{
  "cliente_id": 1,
  "veiculo_id": 1,
  "tipo_quebra_id": 1,
  "data_quebra": "2025-12-26T10:30:00",
  "data_chamado": "2025-12-26T10:45:00",
  "descricao": "Problema na suspensão dianteira",
  "km": 145320,
  "local_quebra": "Rodovia BR-101, km 245",
  "criado_por": 1
}
```

**Resposta:**
```json
{
  "id": 2,
  "numero": "005313",
  "cliente_id": 1,
  "veiculo_id": 1,
  "tipo_quebra_id": 1,
  "status": "Pendente",
  "created_at": "2025-12-26T10:45:00Z"
}
```

### Aprovar Ocorrência
```http
POST /api/ocorrencias/1/aprovar
Authorization: Bearer {token}
Content-Type: application/json

{
  "usuario_id": 1
}
```

**Resposta:**
```json
{
  "id": 1,
  "numero": "005312",
  "aprovado": true,
  "aprovado_por": 1,
  "data_aprovacao": "2025-12-26T15:00:00Z"
}
```

## 🚗 Veículos

### Listar Veículos
```http
GET /api/veiculos
Authorization: Bearer {token}
```

### Criar Veículo
```http
POST /api/veiculos
Authorization: Bearer {token}
Content-Type: application/json

{
  "placa": "ABC-1234",
  "modelo": "Van Mercedes Sprinter",
  "marca": "Mercedes-Benz",
  "ano": 2023,
  "cliente_id": 1,
  "km_atual": 145320
}
```

### Atualizar Veículo
```http
PUT /api/veiculos/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "placa": "ABC-1234",
  "modelo": "Van Mercedes Sprinter",
  "marca": "Mercedes-Benz",
  "ano": 2024,
  "cliente_id": 1
}
```

### Excluir Veículo (soft delete)
```http
DELETE /api/veiculos/1
Authorization: Bearer {token}
```

## 👤 Usuários

### Listar Usuários
```http
GET /api/usuarios
Authorization: Bearer {token}
```

### Criar Usuário
```http
POST /api/usuarios
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "senha": "senha123",
  "cargo": "Monitor",
  "perfil": "monitor"
}
```

## 📊 Relatórios

### Gerar Relatório
```http
GET /api/relatorios?tipo=ocorrencias&periodo=30d&cliente_id=1
Authorization: Bearer {token}
```

## 🔍 Filtros e Paginação

### Filtrar Ocorrências
```http
GET /api/ocorrencias?status=Pendente&cliente_id=1&data_inicio=2025-12-01&data_fim=2025-12-31
Authorization: Bearer {token}
```

### Paginação
```http
GET /api/ocorrencias?page=1&limit=20
Authorization: Bearer {token}
```

## ⚠️ Códigos de Resposta

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Requisição inválida
- `401` - Não autorizado (token inválido/expirado)
- `403` - Sem permissão
- `404` - Não encontrado
- `500` - Erro interno do servidor

## 🧪 Testando com cURL

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sistemacco.com","password":"admin123"}'

# Listar clientes (substitua {token} pelo token recebido)
curl http://localhost:5000/api/clientes \
  -H "Authorization: Bearer {token}"

# Criar cliente
curl -X POST http://localhost:5000/api/clientes \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste Hotel","cnpj":"11.222.333/0001-44","contato":"(11) 77777-7777","email":"teste@hotel.com"}'
```

## 🧪 Testando com PowerShell

```powershell
# Login
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"email":"admin@sistemacco.com","password":"admin123"}'

$token = $response.token

# Listar clientes
$headers = @{
  "Authorization" = "Bearer $token"
}

Invoke-RestMethod -Uri "http://localhost:5000/api/clientes" `
  -Headers $headers
```

---

**Dica:** Use ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar as APIs de forma visual.
