const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../../data/produtos.json');

// Garantir que o arquivo existe
function garantirArquivo() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

// Ler todos os produtos
function lerProdutos() {
  garantirArquivo();
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data || '[]');
}

// Salvar produtos
function salvarProdutos(produtos) {
  garantirArquivo();
  fs.writeFileSync(DATA_FILE, JSON.stringify(produtos, null, 2));
}

// Criar novo produto
function criarProduto(dados) {
  const produtos = lerProdutos();
  const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
  
  const novoProduto = {
    id: novoId,
    nome: dados.nome,
    descricao: dados.descricao,
    preco: parseFloat(dados.preco),
    quantidade: parseFloat(dados.quantidade),
    local: dados.local || 'Não especificado',
    imagem: dados.imagem || 'default.png',
    ativo: true,
    dataCriacao: new Date().toISOString()
  };
  
  produtos.push(novoProduto);
  salvarProdutos(produtos);
  
  return novoProduto;
}

// Listar todos os produtos
function listarProdutos() {
  return lerProdutos();
}

// Obter produto por ID
function obterProduto(id) {
  const produtos = lerProdutos();
  return produtos.find(p => p.id === parseInt(id));
}

// Atualizar produto
function atualizarProduto(id, dados) {
  const produtos = lerProdutos();
  const index = produtos.findIndex(p => p.id === parseInt(id));
  
  if (index === -1) {
    return null;
  }
  
  produtos[index] = {
    ...produtos[index],
    ...dados,
    id: parseInt(id)
  };
  
  salvarProdutos(produtos);
  return produtos[index];
}

// Deletar produto
function deletarProduto(id) {
  const produtos = lerProdutos();
  const index = produtos.findIndex(p => p.id === parseInt(id));
  
  if (index === -1) {
    return false;
  }
  
  produtos.splice(index, 1);
  salvarProdutos(produtos);
  return true;
}

module.exports = {
  criarProduto,
  listarProdutos,
  obterProduto,
  atualizarProduto,
  deletarProduto
};
