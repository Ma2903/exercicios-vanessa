const express = require('express');
const app = express();
const port = 3333;
const db = require('./db');

app.use(express.json());

// Importando os controllers
const VeiculoController = require('./controllers/VeiculoController');
const ClienteController = require('./controllers/ClienteController');
const ContratoController = require('./controllers/ContratoController');
const AluguelController = require('./controllers/AluguelController');

// Definindo rotas
app.use('/veiculos', VeiculoController);
app.use('/clientes', ClienteController);
app.use('/contratos', ContratoController);
app.use('/alugueis', AluguelController);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
