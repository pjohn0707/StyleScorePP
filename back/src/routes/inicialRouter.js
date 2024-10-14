const { Router } = require('express');
const router = Router();
const { storeInicial, getInicial, getInicialById, storeComparacao, getComparacaoByProdutoId, salvarProduto, getProdutosSalvos, deletarProdutoSalvo } = require('../controller/inicialController');

/**
* @swagger
* /store/inicial:
*   post:
*     summary: Cadastra um novo produto na tela inicial.
*     responses:
*        201:
*           description: Produto cadastrado na tela inicial com sucesso.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.post('/store/inicial', storeInicial);

/**
* @swagger
* /get/iniciais:
*   get:
*     summary: Recupera produtos da tela inicial.
*     responses:
*        200:
*           description: Produtos da tela inicial recuperados com sucesso.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.get('/get/iniciais', getInicial);

/**
* @swagger
* /get/iniciais/detalhes/{id}:
*   get:
*     summary: Recupera detalhes de um produto da tela inicial pelo ID.
*     responses:
*        200:
*           description: Retorna os detalhes de um produto específico da tela inicial a partir do seu ID.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.get('/get/iniciais/detalhes/:id', getInicialById);
 
/**
* @swagger
* /store/comparacao:
*   post:
*     summary: Cadastra um novo produto no setor de comparação de preços.
*     responses:
*        201:
*           description: Produto cadastrado com sucesso no setor de comparação de preços.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.post('/store/comparacao', storeComparacao);

/**
* @swagger
* /get/comparacao/{produto_id}:
*   get:
*     summary: Recupera os produtos no setor de comparação de preços por ID de produto.
*     responses:
*        200:
*           description: Retorna uma lista de produtos cadastrados na comparação de preços com base no ID do produto.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.get('/get/comparacao/:produto_id', getComparacaoByProdutoId);

/**
* @swagger
* /store/salvar:
*   post:
*     summary: Salva um produto para um usuário.
*     responses:
*        201:
*           description: Permite que um usuário salve um produto específico.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/ 

router.post('/store/salvar', salvarProduto);

/**
* @swagger
* /get/salvos/{usuario_id}:
*   get:
*     summary: Recupera produtos salvos de um usuário.
*     responses:
*        200:
*           description: Retorna a lista de produtos salvos por um usuário com base no ID do usuário.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.get('/get/salvos/:usuario_id', getProdutosSalvos);

/**
* @swagger
* /delete/salvo/{usuario_id}/{produto_id}:
*   delete:
*     summary: Removendo produto da lista de produtos salvos.
*     responses:
*        200:
*           description: Produto salvo removido com sucesso.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.delete('/delete/salvo/:usuario_id/:produto_id', deletarProdutoSalvo);

module.exports = router;