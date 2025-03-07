const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { modelo, marca, ano } = req.body;
    try {
        const [result] = await db.query('INSERT INTO veiculos (modelo, marca, ano) VALUES (?, ?, ?)', [modelo, marca, ano]);
        res.json({ id: result.insertId, modelo, marca, ano });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM veiculos');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { modelo, marca, ano } = req.body;
    try {
        await db.query('UPDATE veiculos SET modelo = ?, marca = ?, ano = ? WHERE id = ?', [modelo, marca, ano, req.params.id]);
        res.json({ message: 'Veículo atualizado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM veiculos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Veículo deletado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;