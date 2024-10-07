document.getElementById('enviar').addEventListener('click', async function (event) {
    event.preventDefault();

    // Obtém os valores dos campos do formulário para imagem, nome, valor, categoria e loja.
    const imagem = document.getElementById("imagem").value;
    const nome = document.getElementById("nome").value;
    let valor = document.getElementById("valor").value;
    const categoria = document.getElementById("categoria").value;
    const loja = document.getElementById("loja").value;

    valor = valor.replace(",", ".");
    valor = parseFloat(valor);

    if (isNaN(valor)) {
        alert('Por favor, insira um valor numérico válido.');
        return;
    }

    const dados = { imagem, nome, valor, categoria, loja };

    try {
        const response = await fetch('http://localhost:3006/api/store/inicial', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(dados)
        });

        const content = await response.json();

        if (content.success) {
            alert('Produto cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar o produto.');
            console.log(content.sqlMessage);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
});