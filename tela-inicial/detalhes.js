document.addEventListener("DOMContentLoaded", carregarDetalhesProduto);

async function carregarDetalhesProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    try {
        const responseProduto = await fetch(`http://localhost:3005/api/get/iniciais/detalhes/${produtoId}`);
        const produto = await responseProduto.json();

        if (produto.success) {
            const produtoData = produto.data;
            const caminhoImagem = `http://localhost:3005/uploads/${produtoData.imagem}`; 

            document.querySelector(".produto").innerHTML = `
                <img src="${caminhoImagem}" alt="${produtoData.nome}">
                <div class="produto-detalhes">
                    <h1>${produtoData.nome}</h1>
                    <p>R$ ${parseFloat(produtoData.valor).toFixed(2)}</p>
                    <a href="${produtoData.loja}" target="_blank">Comprar na loja</a>
                    <button class="icones" onclick="salvarProduto(${produtoId})">
                        <i class="fa-regular fa-bookmark"></i>
                    </button>
                </div>
            `;

            const responseComparacao = await fetch(`http://localhost:3005/api/get/comparacao/${produtoId}`);
            const comparacoes = await responseComparacao.json();
            console.log (comparacoes);


            if (comparacoes.success) {
                const comparacaoContainer = document.querySelector(".container-comparacao");
                comparacaoContainer.innerHTML = '';

                comparacoes.data.forEach(comparacao => {

                    const caminhoImagemComparacao = `http://localhost:3005/uploads/${comparacao.imagem}`;
                    comparacaoContainer.innerHTML += `
                        <div class="produto">
                            <img src="${caminhoImagemComparacao}" alt="${comparacao.nome}">
                            <div class="produto-detalhes">
                                <h1>${comparacao.nome}</h1>
                                <p>R$ ${parseFloat(comparacao.valor).toFixed(2)}</p>
                                <a href="${comparacao.loja}" target="_blank">Comprar na loja</a>
                            </div>
                        </div>
                    `;
                });
            }
        } else {
            console.log("Erro ao carregar detalhes do produto:", produto.message);
        }
    } catch (error) {
        console.error('Erro ao carregar detalhes do produto:', error);
    }

}

async function salvarProduto(produtoId) {
    const usuarioId = localStorage.getItem('usuario_id');

    if (!usuarioId) {
        Swal.fire({
            icon: 'warning',
            title: 'Acesso Necessário',
            text: 'Você precisa estar logado para salvar produtos.',
            confirmButtonText: 'Ok'
        });
        return;
    }

    const dados = {
        usuario_id: usuarioId,
        produto_id: produtoId
    };

    try {
        const response = await fetch(`http://localhost:3005/api/store/salvar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (resultado.success) {
            Swal.fire({
                icon: 'success',
                title: 'Produto Salvo',
                text: resultado.message,
                confirmButtonText: 'Ok'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: resultado.message || 'Erro ao salvar produto.',
                confirmButtonText: 'Ok'
            });
            console.error("Erro:", resultado);
        }
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro de Conexão',
            text: 'Ocorreu um erro ao tentar salvar o produto.',
            confirmButtonText: 'Ok'
        });
    }
}
