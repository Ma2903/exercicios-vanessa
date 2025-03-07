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

module.exports = router;
