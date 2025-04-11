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

// Atualizar aluguel
router.put('/:id', (req, res) => {
    const { id_veiculo, id_cliente, id_contrato, data_inicio, data_fim } = req.body;
    db.query('UPDATE alugueis SET id_veiculo = ?, id_cliente = ?, id_contrato = ?, data_inicio = ?, data_fim = ? WHERE id = ?',
        [id_veiculo, id_cliente, id_contrato, data_inicio, data_fim, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Aluguel atualizado com sucesso!' });
        }
    );
});

// Excluir aluguel
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM alugueis WHERE id = ?', [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Aluguel excluído com sucesso!' });
    });
});

module.exports = router;