const { Router } = require('express');
const router = Router();
const { storeCadastro, deleteCadastro } = require('../controller/cadastroController');

/**
* @swagger
* /store/cadastro:
*   post:
*     summary: Fazendo um cadastro.
*     responses:
*        201:
*           description: Criando um usuário.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.post('/store/cadastro', storeCadastro);

module.exports = router;