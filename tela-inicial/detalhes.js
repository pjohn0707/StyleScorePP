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
                    <button class="icone-botao">
                        <i class="fa-regular fa-bookmark"></i>
                    </button>
                </div>
            `;

            const responseComparacao = await fetch(`http://localhost:3006/api/get/comparacao/${produtoId}`);
            const comparacoes = await responseComparacao.json();

            if (comparacoes.success) {
                const comparacaoContainer = document.querySelector(".container-comparacao");
                comparacaoContainer.innerHTML = '';

                comparacoes.data.forEach(comp => {
                    comparacaoContainer.innerHTML += `
                        <div class="produto">
                            <img src="${comp.imagem}" alt="${comp.nome}">
                            <div class="produto-detalhes">
                                <h1>${comp.nome}</h1>
                                <p>R$ ${parseFloat(comp.valor).toFixed(2)}</p>
                                <a href="${comp.loja}" target="_blank">Comprar na loja</a>
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
