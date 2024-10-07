    // Toggle de visibilidade da senha
    const toggleSenha = document.getElementById('toggleSenha');
    const inputSenha = document.getElementById('senha');

    toggleSenha.addEventListener('click', function () {
        const tipo = inputSenha.getAttribute('type') === 'password' ? 'text' : 'password';
        inputSenha.setAttribute('type', tipo);
        
        // Alterna o ícone entre o olho aberto e fechado
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });