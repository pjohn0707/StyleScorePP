const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeLogin(request, response) {
    const { email, senha } = request.body;

    const queryEmail = "SELECT * FROM cadastro WHERE email = ?";
    connection.query(queryEmail, [email], (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: 'Erro ao consultar o banco de dados!',
                error: err
            });
        }

        if (results.length === 0) {
            return response.status(404).json({
                success: false,
                message: 'Usuário não encontrado!'
            });
        }

        const user = results[0];
        if (user.senha !== senha) {
            return response.status(401).json({
                success: false,
                message: 'Senha incorreta!'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Login realizado com sucesso!',
            data: {
                id: user.id,
                nome_completo: user.nome_completo,
                email: user.email
            }
        });
    });
}

module.exports = {
    storeLogin
};