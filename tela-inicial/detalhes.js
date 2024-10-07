document.addEventListener("DOMContentLoaded", carregarDetalhesProduto);

async function carregarDetalhesProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    try {
        const responseProduto = await fetch(`http://localhost:3006/api/get/iniciais/detalhes/${produtoId}`);
        const produto = await responseProduto.json();

        if (produto.success) {
            const produtoData = produto.data;
            document.querySelector(".produto").innerHTML = `
                <img src="${produtoData.imagem}" alt="${produtoData.nome}">
                <div class="produto-detalhes">
                    <h1>${produtoData.nome}</h1>
                    <p>R$ ${parseFloat(produtoData.valor).toFixed(2)}</p>
                    <a href="${produtoData.loja}" target="_blank">Comprar na loja</a>
                    <button class="icone-botao" onclick="salvarProduto(${produtoId})">
                        <i class="fa-regular fa-bookmark"></i>
                    </button>
                </div>
            `;
        } else {
            console.log("Erro ao carregar detalhes do produto:", produto.message);
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error);
    }
}

async function salvarProduto(produtoId) {
    const usuarioId = localStorage.getItem('usuario_id'); // Obtenha o ID do usuário logado

    if (!usuarioId) {
        alert("Você precisa estar logado para salvar produtos.");
        return;
    }

    const dados = {
        usuario_id: usuarioId, // Envie o ID do usuário logado
        produto_id: produtoId
    };

    try {
        const response = await fetch(`http://localhost:3006/api/store/salvar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        alert(resultado.message); // Exibe a mensagem de sucesso
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
    }
}

