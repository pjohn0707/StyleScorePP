const connection = require('../config/db');


async function getPerfil(request, response) {
    const usuarioId = request.params.id;

    const query = "SELECT nome_completo, email, senha FROM cadastro WHERE id = ?";

    connection.query(query, [usuarioId], (err, results) => {
        if (err || results.length === 0) {
            return response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }

        const usuario = results[0];
        response.status(200).json({
            success: true,
            data: {
                nome_completo: usuario.nome_completo,
                email: usuario.email,
                senha: usuario.senha
            }
        });
    });
}

async function updateUser(request, response) {
    const usuarioId = request.body.usuarioId;
    const { nome_completo, email, senha } = request.body;

    const query = "UPDATE cadastro SET nome_completo = ?, email = ?, senha = ? WHERE id = ?";
    const params = [nome_completo, email, senha, usuarioId];

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            return response.status(500).json({
                success: false,
                message: "Erro ao atualizar os dados do usuário.",
                error: err
            });
        }

        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: "Dados atualizados com sucesso."
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Nenhum dado foi atualizado."
            });
        }
    });
}

module.exports = {
    getPerfil,
    updateUser
};