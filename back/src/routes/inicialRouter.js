const { Router } = require('express');
const router = Router();
const { storeInicial, getInicial, getInicialById, storeComparacao, getComparacaoByProdutoId } = require('../controller/inicialController');

router.post('/store/inicial', storeInicial);
router.get('/get/iniciais', getInicial);
router.get('/get/iniciais/detalhes/:id', getInicialById);
router.post('/store/comparacao', storeComparacao);
router.get('/get/comparacao/:produto_id', getComparacaoByProdutoId);

module.exports = router;