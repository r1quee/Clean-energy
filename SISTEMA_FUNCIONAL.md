# 🌍 Clean Energy - Sistema Funcional de Cadastro de Produtos

## ✅ Implementação Concluída

Seu site foi transformado de um protótipo visual para uma **aplicação totalmente funcional**! Agora os produtos cadastrados são **realmente salvos** em um arquivo de dados.

---

## 🚀 Como Funciona

### 📂 Estrutura de Dados
- **Arquivo de Storage**: `data/produtos.json`
- Os produtos cadastrados são salvos em um arquivo JSON no servidor
- Dados persistem entre reinicializações da aplicação

### 🏗️ Arquitetura

```
app/
├── controllers/
│   └── produtoController.js    ← Lógica de CRUD de produtos
├── routes/
│   ├── router.js               ← Rotas principais + APIs
│   └── router-adm.js           ← Rotas de admin
├── views/
│   └── pages/
│       ├── cadastrar_produto.ejs   ← Formulário de cadastro
│       └── listaprodutos.ejs       ← Lista de produtos
└── public/
    └── js/
        ├── cadastro-ajax.js    ← Submissão via AJAX
        └── carregar-produtos.js ← Carregamento dinâmico
data/
└── produtos.json              ← Banco de dados de produtos
```

---

## 📝 Como Usar

### 1️⃣ Cadastrar um Novo Produto

1. Acesse: `http://localhost:3000/cadastrar_produto`
2. Preencha os campos:
   - **Nome do Produto** (obrigatório)
   - **Descrição** (obrigatório, 10-500 caracteres)
   - **Preço** (em R$, valor numérico)
   - **Quantidade** (em toneladas)
   - **Local** (cidade, rua, número)
3. Clique em **"Cadastrar Produto"**
4. O produto será salvo e você será redirecionado para a lista

### 2️⃣ Visualizar Todos os Produtos

1. Acesse: `http://localhost:3000/listaprodutos`
2. Você verá todos os produtos cadastrados carregados dinamicamente
3. Produtos aparecem com:
   - Imagem
   - Nome
   - Descrição
   - Preço
   - Quantidade
   - Localidade

### 3️⃣ Editar um Produto

1. Na lista de produtos, clique em **"Editar"** no card do produto
2. Uma modal abrirá com os dados do produto
3. Modifique os campos desejados
4. Clique em **"Salvar Alterações"**
5. O produto será atualizado no banco de dados

### 4️⃣ Deletar um Produto

1. Na lista de produtos, clique em **"Excluir"** no card do produto
2. Uma confirmação será solicitada
3. Clique em **"Excluir"** para confirmar
4. O produto será removido do banco de dados

---

## 🔌 APIs Disponíveis

Você pode usar as seguintes endpoints para integrar com outros sistemas:

### GET - Listar todos os produtos
```bash
GET /api/produtos
```
**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Lenha tratada",
    "descricao": "Lenha tratada...",
    "preco": 250,
    "quantidade": 10,
    "local": "Campinas - SP",
    "imagem": "Lenha.png",
    "ativo": true,
    "dataCriacao": "2026-03-02T10:00:00.000Z"
  }
]
```

### POST - Criar novo produto
```bash
POST /api/produtos
Content-Type: application/json

{
  "nome": "Novo Produto",
  "descricao": "Descrição do produto",
  "preco": 100,
  "quantidade": 5,
  "local": "São Paulo - SP"
}
```

### GET - Obter produto específico
```bash
GET /api/produtos/:id
```

### PUT - Atualizar produto
```bash
PUT /api/produtos/:id
Content-Type: application/json

{
  "nome": "Nome Atualizado",
  "preco": 150,
  "quantidade": 20
}
```

### DELETE - Deletar produto
```bash
DELETE /api/produtos/:id
```

---

## 🔐 Validação

O sistema valida:
- **Nome**: 3-100 caracteres obrigatórios
- **Descrição**: 10-500 caracteres obrigatórios
- **Preço**: Número válido > 0
- **Quantidade**: Número válido > 0

---

## 📦 Dados Persistentes

Os produtos são salvos em: `c:\Users\henri\Downloads\TCCTCC\Clean-energy-1\data\produtos.json`

Você pode:
- Abrir e editar o arquivo diretamente (se necessário)
- Fazer backup dos dados
- Restaurar de um backup anterior

---

## 🚀 Próximos Passos (Opcionais)

Se você quiser evoluir o sistema:

1. **Banco de Dados Real** (MongoDB, PostgreSQL)
   - Melhor performance
   - Múltiplos usuários simultâneos
   - Queries avançadas

2. **Autenticação e Autorização**
   - Login de vendedores
   - Produtos por usuário
   - Permissões de edição

3. **Upload de Imagens**
   - Substitua `imagem` por um caminho real
   - Implemente multer para uploads

4. **Busca e Filtros Avançados**
   - Buscar por nome, preço, localidade
   - Ordenação (preço, data, quantidade)

5. **Carrinho de Compras**
   - Integre com sistema de pedidos
   - Histórico de transações

---

## 🐛 Troubleshooting

### Erro: "Produto não encontrado"
- Verifique se o ID do produto existe
- Recarregue a página

### Erro: "Erro ao carregador produtos"
- Verifique se o servidor está rodando
- Abra o DevTools (F12) para ver erros da rede

### Arquivo JSON corrompido
- Delete `data/produtos.json`
- Reinicie o servidor (um novo arquivo vazio será criado)

---

## 📞 Suporte

Qualquer dúvida sobre funcionamento, entre em contato!

---

**Data de Implementação**: Março 2, 2026  
**Versão**: 1.0  
**Status**: ✅ Totalmente Funcional
