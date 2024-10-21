document.addEventListener("DOMContentLoaded", carregarProdutos);

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