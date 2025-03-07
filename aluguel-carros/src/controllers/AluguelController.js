const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', (req, res) => {
    const { id_veiculo, id_cliente, id_contrato, data_inicio, data_fim } = req.body;
    db.query('INSERT INTO alugueis (id_veiculo, id_cliente, id_contrato, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)',
        [id_veiculo, id_cliente, id_contrato, data_inicio, data_fim],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, id_veiculo, id_cliente, id_contrato, data_inicio, data_fim });
        }
    );
});

router.get('/', (req, res) => {
    db.query('SELECT * FROM alugueis', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;