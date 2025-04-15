const express = require('express');
const db = require('../db');
const router = express.Router();

const AluguelModel = {
  // Criar um novo aluguel
  create: async (id_veiculo, id_cliente, id_contrato, data_inicio, data_fim) => {
    const [result] = await db.query(
      'INSERT INTO alugueis (id_veiculo, id_cliente, id_contrato, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?)',
      [id_veiculo, id_cliente, id_contrato, data_inicio, data_fim]
    );
    return result;
  },

  // Listar todos os aluguéis
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM alugueis');
    return rows;
  },

  // Buscar aluguel por ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM alugueis WHERE id = ?', [id]);
    return rows[0]; // Retorna o primeiro aluguel encontrado
  },

  // Atualizar um aluguel existente
  update: async (id, id_veiculo, id_cliente, id_contrato, data_inicio, data_fim) => {
    const [result] = await db.query(
      'UPDATE alugueis SET id_veiculo = ?, id_cliente = ?, id_contrato = ?, data_inicio = ?, data_fim = ? WHERE id = ?',
      [id_veiculo, id_cliente, id_contrato, data_inicio, data_fim, id]
    );
    return result;
  },

  // Excluir um aluguel pelo ID
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM alugueis WHERE id = ?', [id]);
    return result;
  },
};

router.post('/', async (req, res) => {
    const { id_veiculo, id_cliente, id_contrato, data_inicio, data_fim } = req.body;
    try {
        const result = await AluguelModel.create(id_veiculo, id_cliente, id_contrato, data_inicio, data_fim);
        res.json({ id: result.insertId, id_veiculo, id_cliente, id_contrato, data_inicio, data_fim });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const results = await AluguelModel.getAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
