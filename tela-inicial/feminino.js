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
        const response = await fetch("http://localhost:3006/api/get/iniciais");
        const result = await response.json();

        if (result.success) {
            const femininoContainer = document.querySelector(".produtos-container.feminino");
            femininoContainer.innerHTML = '';

            result.data.forEach(produto => {
                if (produto.categoria === 'feminino') {
                    const card = document.createElement("div");
                    card.className = "produto";

                    const img = document.createElement("img");
                    img.src = `http://localhost:3006/uploads/${produto.imagem}`;
                    img.addEventListener("click", function () {
                        window.location.href = `detalhes.html?id=${produto.id}`;
                    });

                    const nome = document.createElement("h3");
                    nome.textContent = produto.nome;
                    nome.addEventListener("click", function () {
                        window.location.href = `detalhes.html?id=${produto.id}`;
                    });

                    const valor = document.createElement("p");
                    const valorNumerico = parseFloat(produto.valor);
                    valor.textContent = !isNaN(valorNumerico) ? `R$ ${valorNumerico.toFixed(2)}` : "Valor inválido";

                    card.appendChild(img);
                    card.appendChild(nome);
                    card.appendChild(valor);
                    femininoContainer.appendChild(card);
                }
            });
        } else {
            console.log("Erro ao recuperar produtos:", result.sql);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function pesquisarProdutos() {
    const termoPesquisa = document.getElementById("campoPesquisa").value.toLowerCase();

    fetch("http://localhost:3006/api/get/iniciais")
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                const femininoContainer = document.querySelector(".produtos-container.feminino");
                femininoContainer.innerHTML = ''; // Limpa os produtos atuais antes de exibir os filtrados

                const produtosFiltrados = result.data.filter(produto =>
                    produto.nome.toLowerCase().includes(termoPesquisa) && produto.categoria === 'feminino'
                );

                produtosFiltrados.forEach(produto => {
                    const card = document.createElement("div");
                    card.className = "produto";

                    const img = document.createElement("img");
                    img.src = `http://localhost:3006/uploads/${produto.imagem}`;
                    img.addEventListener("click", function () {
                        window.location.href = `detalhes.html?id=${produto.id}`;
                    });

                    const nome = document.createElement("h3");
                    nome.textContent = produto.nome;
                    nome.addEventListener("click", function () {
                        window.location.href = `detalhes.html?id=${produto.id}`;
                    });

                    const valor = document.createElement("p");
                    const valorNumerico = parseFloat(produto.valor);
                    valor.textContent = !isNaN(valorNumerico) ? `R$ ${valorNumerico.toFixed(2)}` : "Valor inválido";

                    card.appendChild(img);
                    card.appendChild(nome);
                    card.appendChild(valor);
                    femininoContainer.appendChild(card);
                });
            } else {
                console.log("Erro ao recuperar produtos:", result.sql);
            }
        })
        .catch(error => console.error("Erro na pesquisa:", error));
}
