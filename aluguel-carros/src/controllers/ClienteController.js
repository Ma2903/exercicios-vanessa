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

// Atualizar cliente
router.put('/:id', (req, res) => {
    const { nome, telefone } = req.body;
    ClienteModel.update(req.params.id, nome, telefone, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente atualizado com sucesso!' });
    });
});

// Excluir cliente
router.delete('/:id', (req, res) => {
    ClienteModel.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cliente excluído com sucesso!' });
    });
});

module.exports = router;
