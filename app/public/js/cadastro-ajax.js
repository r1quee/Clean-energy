/**
 * Script para submissão de cadastro de produto via AJAX
 */

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('productForm');
  const submitBtn = document.querySelector('.submit-btn');
  
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Mostrar estado de carregamento
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
    }

    try {
      // Coletar dados do formulário
      const formData = new FormData(form);
      const dados = Object.fromEntries(formData);

      // Fazer requisição POST para a API
      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: dados.nome,
          descricao: dados.descricao,
          preco: dados.preco.replace('R$', '').replace('.', '').replace(',', '.').trim(),
          quantidade: dados.quantidade.replace('t', '').trim(),
          local: `${dados.rua}, ${dados.numero} - ${dados.cidade}, ${dados.bairro}`
        })
      });

      const resultado = await response.json();

      if (!response.ok) {
        throw new Error(resultado.detalhes ? 
          resultado.detalhes.map(e => e.msg).join(', ') : 
          resultado.erro);
      }

      // Sucesso!
      alert('✅ Produto cadastrado com sucesso!');
      
      // Redirecionar para lista de produtos após 1 segundo
      setTimeout(() => {
        window.location.href = '/listaprodutos';
      }, 1000);

    } catch (error) {
      alert('❌ Erro ao cadastrar produto:\n' + error.message);
      console.error('Erro:', error);
    } finally {
      // Remover estado de carregamento
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }
    }
  });

  // Mantém suporte para formatação de campos
  formatarCampos();
});

function formatarCampos() {
  // Formatar campo de preço como moeda
  const precoField = document.getElementById('preco');
  if (precoField) {
    precoField.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value) {
        value = (parseFloat(value) / 100).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        e.target.value = value;
      }
    });
  }

  // Formatar campo de quantidade
  const quantidadeField = document.getElementById('quantidade');
  if (quantidadeField) {
    quantidadeField.addEventListener('input', function(e) {
      let value = e.target.value.replace(/[^\d,]/g, '');
      if (value) {
        e.target.value = value.replace('.', ',');
      }
    });
  }
}
