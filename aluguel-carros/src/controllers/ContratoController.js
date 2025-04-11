const express = require('express');
const ContratoModel = require('../models/ContratoModel');
const router = express.Router();

// Retorna todos os contratos
router.get('/', async (req, res) => {
  try {
    const contratos = await ContratoModel.getAll();
    res.json(contratos);
  } catch (err) {
    console.error('Erro ao buscar contratos:', err);
    res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
});

// Retorna um contrato pelo ID
router.get('/:id', async (req, res) => {
  try {
    const contrato = await ContratoModel.getById(req.params.id);
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato não encontrado.' });
    }
    res.json(contrato);
  } catch (err) {
    console.error('Erro ao buscar contrato:', err);
    res.status(500).json({ error: 'Erro ao buscar contrato.' });
  }
});

// Cria um novo contrato
router.post('/', async (req, res) => {
  const { tipo, valor } = req.body; // Certifique-se de que o campo 'tipo' está sendo recebido
  try {
    const result = await ContratoModel.create(tipo, valor);
    res.status(201).json({ id: result.insertId, tipo, valor });
  } catch (err) {
    console.error('Erro ao criar contrato:', err);
    res.status(500).json({ error: 'Erro ao criar contrato.' });
  }
});

// Atualiza um contrato existente
router.put('/:id', async (req, res) => {
  const { tipo, valor } = req.body;
  try {
    await ContratoModel.update(req.params.id, tipo, valor);
    res.json({ message: 'Contrato atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar contrato:', err);
    res.status(500).json({ error: 'Erro ao atualizar contrato.' });
  }
});

// Exclui um contrato
router.delete('/:id', async (req, res) => {
  try {
    await ContratoModel.delete(req.params.id);
    res.json({ message: 'Contrato excluído com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir contrato:', err);
    res.status(500).json({ error: 'Erro ao excluir contrato.' });
  }
});

module.exports = router;
