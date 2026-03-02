/**
 * Script para carregar produtos reais da API
 */

let produtosCarregados = [];

document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos();
});

async function carregarProdutos() {
  try {
    const response = await fetch('/api/produtos');
    
    if (!response.ok) {
      throw new Error('Erro ao carregar produtos');
    }

    const produtos = await response.json();
    produtosCarregados = produtos;
    
    renderizarProdutos(produtos);
  } catch (error) {
    console.error('Erro:', error);
    const grid = document.querySelector('.produtos-grid');
    if (grid) {
      grid.innerHTML = '<p class="aviso">Erro ao carregar produtos. Por favor, recarregue a página.</p>';
    }
  }
}

function renderizarProdutos(produtos) {
  const grid = document.querySelector('.produtos-grid');
  
  if (!grid) {
    console.error('Elemento .produtos-grid não encontrado');
    return;
  }

  // Limpar grid
  grid.innerHTML = '';

  if (produtos.length === 0) {
    grid.innerHTML = '<p class="aviso">Nenhum produto cadastrado ainda.</p>';
    return;
  }

  // Criar cards para cada produto
  produtos.forEach(produto => {
    const card = document.createElement('article');
    card.className = 'produto-card';
    card.dataset.produtoId = produto.id;

    const precoFormatado = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(produto.preco);

    card.innerHTML = `
      <figure>
        <img src="/imagem/${produto.imagem || 'default.png'}" alt="${produto.nome}" onerror="this.src='/imagem/default.png'">
      </figure>
      <section class="produto-info">
        <h3>${produto.nome}</h3>
        <p class="endereco">${produto.local}</p>
        <p class="descricao" title="${produto.descricao}">${produto.descricao.substring(0, 100)}...</p>
        <p class="preco">${precoFormatado}</p>
        <p class="quantidade">${produto.quantidade} Tonelada(s)</p>
      </section>
      <section class="acoes">
        <button class="btn btn-warning btn-sm btn-editar" onclick="abrirModalEdicao(${produto.id})">Editar</button>
        <button class="btn btn-danger btn-sm btn-excluir" onclick="abrirModalExclusao(${produto.id})">Excluir</button>
      </section>
    `;

    grid.appendChild(card);
  });
}

async function excluirProduto(produtoId) {
  try {
    const response = await fetch(`/api/produtos/${produtoId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir produto');
    }

    alert('✅ Produto excluído com sucesso!');
    carregarProdutos(); // Recarregar lista
  } catch (error) {
    alert('❌ Erro ao excluir produto: ' + error.message);
    console.error('Erro:', error);
  }
}

function abrirModalExclusao(produtoId) {
  const modal = new bootstrap.Modal(document.getElementById('excluirModal'));
  const confirmarBtn = document.getElementById('confirmarExcluirBtn');
  
  // Remover listeners anteriores
  const novoBtn = confirmarBtn.cloneNode(true);
  confirmarBtn.parentNode.replaceChild(novoBtn, confirmarBtn);
  
  // Adicionar novo listener
  novoBtn.addEventListener('click', function() {
    excluirProduto(produtoId);
    modal.hide();
  });

  modal.show();
}

function abrirModalEdicao(produtoId) {
  const produto = produtosCarregados.find(p => p.id === produtoId);
  if (!produto) {
    alert('Produto não encontrado');
    return;
  }

  // Preencher campos do modal
  document.getElementById('editarNome').value = produto.nome;
  document.getElementById('editarEndereco').value = produto.local;
  document.getElementById('editarPreco').value = produto.preco;
  document.getElementById('editarQuantidade').value = produto.quantidade;

  const modal = new bootstrap.Modal(document.getElementById('editarModal'));
  const salvarBtn = document.getElementById('salvarEdicaoBtn');

  // Remover listeners anteriores
  const novoBtn = salvarBtn.cloneNode(true);
  salvarBtn.parentNode.replaceChild(novoBtn, salvarBtn);

  // Adicionar novo listener
  novoBtn.addEventListener('click', function() {
    salvarEdicao(produtoId);
  });

  modal.show();
}

async function salvarEdicao(produtoId) {
  const nome = document.getElementById('editarNome').value.trim();
  const endereco = document.getElementById('editarEndereco').value.trim();
  const preco = document.getElementById('editarPreco').value;
  const quantidade = document.getElementById('editarQuantidade').value;

  // Validação básica
  if (!nome || !endereco || !preco || !quantidade) {
    alert('Por favor, preencha todos os campos');
    return;
  }

  try {
    const response = await fetch(`/api/produtos/${produtoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: nome,
        local: endereco,
        preco: parseFloat(preco.toString().replace(/[^\d.,]/g, '').replace(',', '.')),
        quantidade: parseFloat(quantidade)
      })
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar produto');
    }

    alert('✅ Produto atualizado com sucesso!');
    const modal = bootstrap.Modal.getInstance(document.getElementById('editarModal'));
    modal.hide();
    carregarProdutos(); // Recarregar lista
  } catch (error) {
    alert('❌ Erro ao atualizar produto: ' + error.message);
    console.error('Erro:', error);
  }
}
