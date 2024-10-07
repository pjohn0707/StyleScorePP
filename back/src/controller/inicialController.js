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

const salvarProduto = (req, res) => {
    const usuario_id = req.body.usuario_id; // ID do usuário logado
    const produto_id = req.body.produto_id; // ID do produto sendo salvo

    if (!usuario_id || !produto_id) {
        return res.status(400).json({ success: false, message: "ID do usuário ou do produto não fornecido." });
    }

    const query = "INSERT INTO produtos_salvos(usuario_id, produto_id) VALUES(?, ?)";
    connection.query(query, [usuario_id, produto_id], (error, results) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }
        res.status(201).send({ success: true, message: 'Produto salvo com sucesso!' });
    });
};


async function getProdutosSalvos(request, response) {
    const usuario_id = request.params.usuario_id;

    const query = `SELECT produtos_inicial.nome, produtos_inicial.imagem, produtos_inicial.valor, produtos_inicial.categoria, produtos_inicial.loja, produtos_inicial.id FROM produtos_inicial JOIN produtos_salvos ON produtos_inicial.id = produtos_salvos.produto_id WHERE produtos_salvos.usuario_id = ?`;

    connection.query(query, [usuario_id], (err, results) => {
        if (results && results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Produtos salvos recuperados com sucesso!",
                data: results
            });
        } else {
            console.log("Nenhum produto salvo encontrado.");
            response.status(404).json({
                success: false,
                message: "Nenhum produto salvo encontrado."
            });
        }
    });
}

module.exports = {
    storeInicial,
    getInicial,
    getInicialById,
    storeComparacao,
    getComparacaoByProdutoId,
    salvarProduto,
    getProdutosSalvos
};