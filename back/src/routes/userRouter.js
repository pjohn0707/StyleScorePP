const { Router } = require('express');
const router = Router();

const { getPerfil, updateUser } = require('../controller/userController');

/**
* @swagger
* /perfil/{id}:
*   get:
*     summary: Obtendo o id do usuário para puxar seus dados para tela de perfil.
*     responses:
*        201:
*           description: Perfil do usuário retornado com sucesso.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.get('/perfil/:id', getPerfil);

/**
* @swagger
* /update/user:
*   put:
*     summary:  Atualiza as informações de um usuário.
*     responses:
*        201:
*           description: Informações do usuário atualizadas com sucesso.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

router.put('/update/user', updateUser);


module.exports = router;