const express = require('express');
const ClienteModel = require('../models/ClienteModel');
const router = express.Router();

router.post('/', (req, res) => {
    const { nome, telefone } = req.body;
    ClienteModel.create(nome, telefone, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, nome, telefone });
    });
});

router.get('/', (req, res) => {
    ClienteModel.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
