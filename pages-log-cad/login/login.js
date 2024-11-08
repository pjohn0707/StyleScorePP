document.getElementById('form-login').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const dados = {
        email,
        senha
    };

    try {
        const response = await fetch('http://localhost:3005/api/store/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (resultado.success) {
            // Armazena o ID do usuário no localStorage
            localStorage.setItem('usuario_id', resultado.data.id);
            document.getElementById('mensagem').innerText = resultado.message;
            window.location.href = '../../tela-inicial/telaInicial.html';
        } else {
            document.getElementById('mensagem').innerText = resultado.message || 'Erro ao realizar login!';
        }
    } catch (error) {
        document.getElementById('mensagem').innerText = 'Erro ao conectar com o servidor!';
    }
});
