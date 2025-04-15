const express = require('express');
const db = require('../db');
const router = express.Router();

// Criar aluguel
router.post('/', async (req, res) => {
    const { id_veiculo, id_cliente, id_contrato, data_inicio, data_fim } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO alugueis (id_veiculo, id_cliente, id_contrato, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)',
            [id_veiculo, id_cliente, id_contrato, data_inicio, data_fim]
        );
        res.status(201).json({
            id: result.insertId,
            id_veiculo,
            id_cliente,
            id_contrato,
            data_inicio,
            data_fim,
        });
    } catch (err) {
        console.error('Erro ao criar aluguel:', err);
        res.status(500).json({ error: 'Erro ao criar aluguel.' });
    }
});

// Listar todos os aluguéis
router.get('/', async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT 
                alugueis.id,
                alugueis.data_inicio,
                alugueis.data_fim,
                clientes.nome AS cliente,
                veiculos.modelo AS veiculo
            FROM alugueis
            INNER JOIN clientes ON alugueis.id_cliente = clientes.id
            INNER JOIN veiculos ON alugueis.id_veiculo = veiculos.id
        `);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar aluguéis:', err);
        res.status(500).json({ error: 'Erro ao buscar aluguéis.' });
    }
});

// Buscar aluguel por ID
router.get('/:id', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM alugueis WHERE id = ?', [req.params.id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Aluguel não encontrado.' });
        }
        res.json(results[0]); // Retorna o primeiro resultado
    } catch (err) {
        console.error('Erro ao buscar aluguel:', err);
        res.status(500).json({ error: 'Erro ao buscar aluguel.' });
    }
});

// Atualizar aluguel
router.put('/:id', async (req, res) => {
    const { id_veiculo, id_cliente, id_contrato, data_inicio, data_fim } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE alugueis SET id_veiculo = ?, id_cliente = ?, id_contrato = ?, data_inicio = ?, data_fim = ? WHERE id = ?',
            [id_veiculo, id_cliente, id_contrato, data_inicio, data_fim, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aluguel não encontrado.' });
        }

        res.json({ message: 'Aluguel atualizado com sucesso!' });
    } catch (err) {
        console.error('Erro ao atualizar aluguel:', err);
        res.status(500).json({ error: 'Erro ao atualizar aluguel.' });
    }
});

// Excluir aluguel
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM alugueis WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Aluguel não encontrado.' });
        }

        res.json({ message: 'Aluguel excluído com sucesso!' });
    } catch (err) {
        console.error('Erro ao excluir aluguel:', err);
        res.status(500).json({ error: 'Erro ao excluir aluguel.' });
    }
});

module.exports = router;