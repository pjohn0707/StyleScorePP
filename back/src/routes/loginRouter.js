const { Router } = require('express');
const router = Router();
const { storeLogin } = require('../controller/loginController');

router.post('/store/login', storeLogin);

/**
* @swagger
* /store/login:
*   post:
*     summary: Fazendo um Login.
*     responses:
*        201:
*           description: Faz a consulta de um usuário.
*           content:
*             application/json:
*               schema:
*                 type: array
*                 items:
*                   type: object
*/

module.exports = router;