document.addEventListener('DOMContentLoaded', async () => {
    const usuarioId = localStorage.getItem('usuario_id');

    if (usuarioId) {
        try {
            const response = await fetch(`http://localhost:3006/api/perfil/${usuarioId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const resultado = await response.json();

            if (resultado.success) {
                document.getElementById('email').value = resultado.data.email;
                document.getElementById('nome').value = resultado.data.nome_completo;
                document.getElementById('senha').value = resultado.data.senha;
            } else {
                console.error('Erro ao obter perfil:', resultado.message);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
        }
    } else {
        console.log('ID do usuário não encontrado no localStorage.');
    }
});

document.getElementById('botao-atualizar').addEventListener('click', async () => {
    const nome_completo = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const usuarioId = localStorage.getItem('usuario_id');

    const dados = {
        usuarioId,
        nome_completo,
        email,
        senha
    };

    try {
        const response = await fetch('http://localhost:3006/api/update/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (resultado.success) {
            Swal.fire({
                icon: 'success',
                title: 'Atualização bem-sucedida',
                text: resultado.message,
                confirmButtonText: 'Ok'
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: resultado.message || 'Erro ao atualizar dados!',
                confirmButtonText: 'Ok'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro de Conexão',
            text: 'Erro ao conectar com o servidor!',
            confirmButtonText: 'Ok'
        });
    }
});

document.getElementById('toggleSenha').addEventListener('click', () => {
    const senhaInput = document.getElementById('senha');
    const tipoSenha = senhaInput.getAttribute('type');
    
    if (tipoSenha === 'password') {
        senhaInput.setAttribute('type', 'text');
        document.getElementById('toggleSenha').classList.remove('fa-eye-slash');
        document.getElementById('toggleSenha').classList.add('fa-eye');
    } else {
        senhaInput.setAttribute('type', 'password');
        document.getElementById('toggleSenha').classList.remove('fa-eye');
        document.getElementById('toggleSenha').classList.add('fa-eye-slash');
    }
});