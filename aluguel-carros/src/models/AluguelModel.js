const express = require('express');
const AluguelModel = require('../models/AluguelModel');
const router = express.Router();

router.post('/', (req, res) => {
    const { id_veiculo, id_cliente, id_contrato, data_inicio, data_fim } = req.body;
    AluguelModel.create(id_veiculo, id_cliente, id_contrato, data_inicio, data_fim, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, id_veiculo, id_cliente, id_contrato, data_inicio, data_fim });
    });
});

router.get('/', (req, res) => {
    AluguelModel.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
