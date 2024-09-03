document.getElementById('form-comparacao').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Valida se o produto foi preenchido
    const formData = new FormData();
    formData.append('produto_id', document.getElementById("produto_id").value);
    formData.append('imagem', document.getElementById("imagem").value);
    formData.append('nome', document.getElementById("nome").value);
    
    // Valida se o valor foi preenchido e é um número válido
    let valor = document.getElementById("valor").value;
    valor = valor.replace(",", ".");
    valor = parseFloat(valor);
    
    if (isNaN(valor)) {
        alert('Por favor, insira um valor numérico válido.');
        return;
    }

    formData.append('valor', valor);
    formData.append('loja', document.getElementById("loja").value);

    try {
        const response = await fetch('http://localhost:3006/api/store/comparacao', {
            method: 'POST',
            body: formData
        });

        const content = await response.json();

        if (content.success) {
            alert('Produto de comparação cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar o produto de comparação.');
            console.log(content.sqlMessage);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
});