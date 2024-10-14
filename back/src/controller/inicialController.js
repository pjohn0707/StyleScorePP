const connection = require('../config/db');

const fs = require('fs');
const path =  require('path');

const uploadPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}


async function storeInicial(request, response) {
    if (!request.files || !request.files.imagem) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de imagem"
        });
    }

    const imagem = request.files.imagem;
    const imagemNome = Date.now() + path.extname(imagem.name);

    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        if (erro) {
            console.error("Erro ao mover o arquivo:", erro);
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }

        const params = [
            imagemNome,
            request.body.nome,
            request.body.valor,
            request.body.categoria,
            request.body.loja
        ];

        const query = "INSERT INTO produtos_inicial(imagem, nome, valor, categoria, loja) VALUES(?,?,?,?,?)";

        connection.query(query, params, (err, results) => {
            if (results) {
                response.status(200).json({
                    success: true,
                    message: "Produto cadastrado com sucesso!",
                    data: results
                });
            } else {
                console.error("Erro no cadastro:", err);
                response.status(400).json({
                    success: false,
                    message: "Erro ao cadastrar o produto.",
                    sql: err,
                });
            }
        });
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
    if (!request.files || !request.files.imagem) {
        return response.status(400).json({
            success: false,
            message: "Você não enviou o arquivo de foto"
        });
    }

    const imagem = request.files.imagem;
    const imagemNome = Date.now() + path.extname(imagem.name);

    imagem.mv(path.join(uploadPath, imagemNome), (erro) => {
        if (erro) {
            return response.status(400).json({
                success: false,
                message: "Erro ao mover o arquivo"
            });
        }

        const params = [
            request.body.produto_id,
            imagemNome,
            request.body.nome,
            request.body.valor,
            request.body.loja
        ];

        const query = "INSERT INTO produtos_comparacao(produto_id, imagem, nome, valor, loja) VALUES(?,?,?,?,?)";
    
        connection.query(query, params, (err, results) => {
            if (err) {
                console.error("Erro ao cadastrar produto de comparação:", err);
                return response.status(400).json({
                    success: false,
                    message: "Erro ao cadastrar o produto de comparação.",
                    sqlMessage: err.sqlMessage
                });
            }

            response.status(200).json({
                success: true,
                message: "Produto de comparação cadastrado com sucesso!",
                data: results
            });
        });
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
    const usuario_id = req.body.usuario_id;
    const produto_id = req.body.produto_id;

    if (!usuario_id || !produto_id) {
        return res.status(400).json({ success: false, message: "ID do usuário ou do produto não fornecido." });
    }

    const verificarQuery = "SELECT * FROM produtos_salvos WHERE usuario_id = ? AND produto_id = ?";
    connection.query(verificarQuery, [usuario_id, produto_id], (error, results) => {
        if (error) {
            return res.status(500).send({ error: error.message });
        }
        if (results.length > 0) {
            return res.status(400).json({ success: false, message: "Este produto já foi salvo." });
        }

        const query = "INSERT INTO produtos_salvos(usuario_id, produto_id) VALUES(?, ?)";
        connection.query(query, [usuario_id, produto_id], (error, results) => {
            if (error) {
                return res.status(500).send({ error: error.message });
            }
            res.status(201).send({ success: true, message: 'Produto salvo com sucesso!' });
        });
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

async function deletarProdutoSalvo(req, res) {
    const { usuario_id, produto_id } = req.params;

    if (!usuario_id || !produto_id) {
        return res.status(400).json({ success: false, message: "ID do usuário ou do produto não fornecido." });
    }

    const query = "DELETE FROM produtos_salvos WHERE usuario_id = ? AND produto_id = ?";

    connection.query(query, [usuario_id, produto_id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Erro ao deletar o produto salvo.", error: err.message });
        }

        if (results.affectedRows > 0) {
            res.status(200).json({ success: true, message: "Produto removido da lista de salvos com sucesso! Recarregue a página." });
        } else {
            res.status(404).json({ success: false, message: "Produto não encontrado na lista de salvos." });
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
    getProdutosSalvos,
    deletarProdutoSalvo
};