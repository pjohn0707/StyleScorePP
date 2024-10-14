document.addEventListener("DOMContentLoaded", carregarProdutosSalvos);

async function carregarProdutosSalvos() {
    const usuarioId = localStorage.getItem('usuario_id');

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

    container.innerHTML = '';

    produtos.forEach(produto => {

        const card = document.createElement("div");
        card.className = "produto";

        const img = document.createElement("img");
        img.src = `http://localhost:3006/uploads/${produto.imagem}`;
        img.addEventListener("click", function () {
            window.location.href = `detalhes.html?id=${produto.id}`;
        });
        img.alt = produto.nome;

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        nome.addEventListener("click", function () {
            window.location.href = `detalhes.html?id=${produto.id}`;
        });

        const valor = document.createElement("p");
        valor.textContent = `R$ ${parseFloat(produto.valor).toFixed(2)}`;

        const removerBtn = document.createElement("button");
        removerBtn.textContent = "Remover";
        removerBtn.addEventListener("click", function () {
            deletarProdutoSalvo(produto.id);
        });

        card.appendChild(img);
        card.appendChild(nome);
        card.appendChild(valor);
        card.appendChild(removerBtn);

        container.appendChild(card);
    });
}

async function deletarProdutoSalvo(produtoId) {
    const usuarioId = localStorage.getItem('usuario_id');

    if (!usuarioId) {
        alert("Você precisa estar logado para remover produtos.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3006/api/delete/salvo/${usuarioId}/${produtoId}`, {
            method: 'DELETE'
        });

        const resultado = await response.json();

        if (resultado.success) {
            alert("Produto removido com sucesso! Recarregue a página!");
            carregarProdutosSalvos();
        } else {
            alert("Erro ao remover o produto: " + resultado.message);
        }
    } catch (error) {
        console.error('Erro ao remover produto salvo:', error);
    }
}