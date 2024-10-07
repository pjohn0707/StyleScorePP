document.addEventListener("DOMContentLoaded", carregarProdutosSalvos);

async function carregarProdutosSalvos() {
    const usuarioId = localStorage.getItem('usuario_id'); // Obtenha o ID do usuário logado

    if (!usuarioId) {
        alert("Você precisa estar logado para ver seus produtos salvos.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3006/api/get/salvos/${usuarioId}`);
        const resultado = await response.json();

        if (resultado.success) {
            exibirProdutos(resultado.data);
        } else {
            console.log("Erro ao carregar produtos salvos:", resultado.message);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos salvos:', error);
    }
}

function exibirProdutos(produtos) {
    const container = document.getElementById('produtos-salvos');

    // Limpa o container antes de adicionar os produtos
    container.innerHTML = '';

    produtos.forEach(produto => {

        

        const card = document.createElement("div");
        card.className = "produto";

        const button = document.createElement("button");
        button.className = "produto-botao";

        const img = document.createElement("img");
        img.src = produto.imagem;
        img.addEventListener("click", function () {
            window.location.href = `detalhes.html?id=${produto.id}`;
        });

        img.alt = produto.nome;

        const button2 = document.createElement("button");
        button2.className = "produto-botao";

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        nome.addEventListener("click", function () {
            window.location.href = `detalhes.html?id=${produto.id}`;
        });

        const valor = document.createElement("p");
        valor.textContent = `R$ ${parseFloat(produto.valor).toFixed(2)}`;

        card.appendChild(button);
        card.appendChild(button2);
        card.appendChild(img);
        card.appendChild(nome);
        card.appendChild(valor);

        container.appendChild(card);
    });
}
