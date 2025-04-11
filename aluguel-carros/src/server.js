const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
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

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
