const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { modelo, marca, ano, placa } = req.body; // Certifique-se de que todos os campos estão sendo recebidos
    try {
        const [result] = await db.query(
            'INSERT INTO veiculos (modelo, marca, ano, placa) VALUES (?, ?, ?, ?)',
            [modelo, marca, ano, placa]
        );
        res.json({ id: result.insertId, modelo, marca, ano, placa });
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

// Buscar veículo por ID
router.get('/:id', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM veiculos WHERE id = ?', [req.params.id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Veículo não encontrado.' });
        }
        res.json(results[0]); // Retorna o primeiro resultado
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar veículo
router.put('/:id', async (req, res) => {
    const { modelo, marca, ano, placa } = req.body; // Certifique-se de que todos os campos estão sendo recebidos
    try {
        await db.query(
            'UPDATE veiculos SET modelo = ?, marca = ?, ano = ?, placa = ? WHERE id = ?',
            [modelo, marca, ano, placa, req.params.id]
        );
        res.json({ message: 'Veículo atualizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Excluir veículo
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM veiculos WHERE id = ?', [req.params.id]);
        res.json({ message: 'Veículo excluído com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;