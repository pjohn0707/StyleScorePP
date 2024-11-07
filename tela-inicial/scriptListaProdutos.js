document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();

    // Adiciona evento ao botão de pesquisa
    document.querySelector(".pesquisa-botao").addEventListener("click", pesquisarProdutos);

    // Adiciona evento ao campo de pesquisa para detectar Enter
    document.getElementById("campoPesquisa").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita o envio do formulário (caso haja um)
            pesquisarProdutos();
        }
    });
});

async function carregarProdutos() {
    try {
        const response = await fetch("http://localhost:3005/api/get/iniciais");
        const result = await response.json();

        if (result.success) {
            exibirProdutos(result.data);
        }
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
    }
}

function exibirProdutos(produtos) {
    const masculinoContainer = document.querySelector(".produtos-container.masculino");
    const femininoContainer = document.querySelector(".produtos-container.feminino");

    // Limpa os contêineres antes de adicionar os produtos
    masculinoContainer.innerHTML = '';
    femininoContainer.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto";

        const img = document.createElement("img");
        img.src = `http://localhost:3005/uploads/${produto.imagem}`;
        img.addEventListener("click", () => {
            window.location.href = `detalhes.html?id=${produto.id}`;
        });

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;
        nome.addEventListener("click", () => {
            window.location.href = `detalhes.html?id=${produto.id}`;
        });

        const valor = document.createElement("p");
        valor.textContent = `R$ ${parseFloat(produto.valor).toFixed(2)}`;

        card.appendChild(img);
        card.appendChild(nome);
        card.appendChild(valor);

        if (produto.categoria === "masculino") {
            masculinoContainer.appendChild(card);
        } else if (produto.categoria === "feminino") {
            femininoContainer.appendChild(card);
        }
    });
}

function pesquisarProdutos() {
    const termoPesquisa = document.getElementById("campoPesquisa").value.toLowerCase();

    fetch("http://localhost:3005/api/get/iniciais")
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Filtra os produtos com base no termo de pesquisa
                const produtosFiltrados = result.data.filter(produto =>
                    produto.nome.toLowerCase().includes(termoPesquisa)
                );

                // Exibe apenas os produtos filtrados
                exibirProdutos(produtosFiltrados);
            }
        })
        .catch(error => console.error("Erro na pesquisa:", error));
}
