document.getElementById('form-cadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome_completo = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const dados = {
        nome_completo,
        email,
        senha
    };

    try {
        const response = await fetch('http://localhost:3006/api/store/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (resultado.success) {
            document.getElementById('mensagem').innerText = resultado.message;
            document.getElementById('form-cadastro').reset();
            window.location.href = '../login/login.html';
        } else {
            document.getElementById('mensagem').innerText = resultado.message || 'Erro ao realizar cadastro!';
        }
    } catch (error) {
        document.getElementById('mensagem').innerText = 'Erro ao conectar com o servidor!';
    }

});

