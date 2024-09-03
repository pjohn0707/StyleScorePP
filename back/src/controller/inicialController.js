const connection = require('../config/db');

async function storeInicial(request, response) {
    const valor = parseFloat(request.body.valor);

    if (isNaN(valor)) {
        return response.status(400).json({
            success: false,
            message: "Valor inválido. Certifique-se de enviar um número válido."
        });
    }

    const params = [
        request.body.imagem,
        request.body.nome,
        valor,
        request.body.categoria,
        request.body.loja // Adiciona a URL da loja
    ];

    const query = "INSERT INTO produtos_inicial(imagem, nome, valor, categoria, loja) VALUES(?,?,?,?,?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Produto cadastrado com sucesso!",
                data: results
            });
        } else {
            console.error("Erro ao cadastrar produto:", err);
            response.status(400).json({
                success: false,
                message: "Erro ao cadastrar o produto.",
                sqlMessage: err.sqlMessage
            });
        }
    });
}

async function getInicial(request, response) {
    const query = "SELECT * FROM produtos_inicial";

    connection.query(query, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Produtos recuperados com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao recuperar produtos.",
                sqlMessage: err.sqlMessage
            });
        }
    });
}

async function getInicialById(request, response) {
    const params = [request.params.id];

    const query = "SELECT * FROM produtos_inicial WHERE id = ?";

    connection.query(query, params, (err, result) => {
        if (result.length > 0) {
            response.status(200).json({
                success: true,
                message: "Produto recuperado com sucesso!",
                data: result[0]
            });
        } else {
            response.status(404).json({
                success: false,
                message: "Produto não encontrado."
            });
        }
    });
}

async function storeComparacao(request, response) {
    const { produto_id, imagem, nome, valor, loja } = request.body;
    const query = "INSERT INTO produtos_comparacao(produto_id, imagem, nome, valor, loja) VALUES(?,?,?,?,?)";
    const params = [produto_id, imagem, nome, valor, loja];

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Produto de comparação cadastrado com sucesso!",
                data: results
            });
        } else {
            console.error("Erro ao cadastrar produto de comparação:", err);
            response.status(400).json({
                success: false,
                message: "Erro ao cadastrar o produto de comparação.",
                sqlMessage: err.sqlMessage
            });
        }
    });
}

async function getComparacaoByProdutoId(request, response) {
    const params = [request.params.produto_id];
    const query = "SELECT * FROM produtos_comparacao WHERE produto_id = ?";

    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(200).json({
                success: true,
                message: "Produtos de comparação recuperados com sucesso!",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Erro ao recuperar produtos de comparação.",
                sqlMessage: err.sqlMessage
            });
        }
    });
}

module.exports = {
    storeInicial,
    getInicial,
    getInicialById,
    storeComparacao,
    getComparacaoByProdutoId
};