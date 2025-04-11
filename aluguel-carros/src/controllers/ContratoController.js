const express = require('express');
const ContratoModel = require('../models/ContratoModel');
const router = express.Router();

router.post('/', (req, res) => {
    const { tipo, valor } = req.body;
    ContratoModel.create(tipo, valor, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, tipo, valor });
    });
});

router.get('/', (req, res) => {
    ContratoModel.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Atualizar contrato
router.put('/:id', (req, res) => {
    const { tipo, valor } = req.body;
    ContratoModel.update(req.params.id, tipo, valor, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Contrato atualizado com sucesso!' });
    });
});

// Excluir contrato
router.delete('/:id', (req, res) => {
    ContratoModel.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Contrato excluído com sucesso!' });
    });
});

module.exports = router;
