//Carregando os produtos na tela inicial 

document.addEventListener("DOMContentLoaded", carregarProdutos);

async function carregarProdutos() {
    try {
        const response = await fetch("http://localhost:3006/api/get/iniciais");
        const result = await response.json();

        if (result.success) {
            const produtoContainers = document.querySelectorAll(".produtos-container");

            produtoContainers.forEach(lista => lista.innerHTML = '');

            result.data.forEach(produto => {
                const categoria = produto.categoria;
                const produtoList = document.querySelector(`.produtos-container.${categoria}`);

                if (produtoList) {
                    const card = document.createElement("div");
                    card.className = "produto";

                    const button = document.createElement("button");
                    button.className = "produto-botao";

                    const img = document.createElement("img");
                    img.src = produto.imagem;
                    img.addEventListener("click", function () {
                        window.location.href = `detalhes.html?id=${produto.id}`;
                    });

                    const button2 = document.createElement("button");
                    button2.className = "produto-botao";

                    const nome = document.createElement("h3");
                    nome.textContent = produto.nome;
                    nome.addEventListener("click", function () {
                        window.location.href = `detalhes.html?id=${produto.id}`;
                    });

                    const valor = document.createElement("p");

                    let valorNumerico = parseFloat(produto.valor);
                    if (!isNaN(valorNumerico)) {
                        valor.textContent = `R$ ${valorNumerico.toFixed(2)}`;
                    } else {
                        valor.textContent = `Valor inválido`;
                    }

                    card.appendChild(button);
                    card.appendChild(button2);
                    card.appendChild(valor);

                    button.appendChild(img);
                    button2.appendChild(nome);

                    produtoList.appendChild(card);
                }
            });
        } else {
            console.log("Erro ao recuperar produtos:", result.sql);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}