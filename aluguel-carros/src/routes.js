const express = require('express');
const VeiculoController = require('./controllers/VeiculoController');
const ClienteController = require('./controllers/ClienteController');
const ContratoController = require('./controllers/ContratoController');
const AluguelController = require('./controllers/AluguelController');

const router = express.Router();

// Rotas CRUD
router.use('/veiculos', VeiculoController);
router.use('/clientes', ClienteController);
router.use('/contratos', ContratoController);
router.use('/alugueis', AluguelController);

module.exports = router;