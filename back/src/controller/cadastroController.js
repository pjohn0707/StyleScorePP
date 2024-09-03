const connection = require('../config/db');

async function storeCadastro(request, response) {
    const params = Array(
        request.body.nome_completo,
        request.body.email,
        request.body.senha
    );

    const query = "INSERT INTO cadastro(nome_completo, email, senha) VALUES(?,?,?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Cadastro realizado com sucesso",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Email ja existente!",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }
    });
}

module.exports = {
    storeCadastro
};