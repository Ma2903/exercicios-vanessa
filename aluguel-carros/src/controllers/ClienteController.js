const express = require('express');
const ClienteModel = require('../models/ClienteModel');
const router = express.Router();

// Criar cliente
router.post('/', async (req, res) => {
    const { nome, telefone } = req.body;
    try {
        const isUnique = await ClienteModel.isPhoneUnique(telefone);
        if (!isUnique) {
            return res.status(400).json({ error: 'Telefone já está em uso' });
        }
        const result = await ClienteModel.create(nome, telefone);
        res.json({ id: result.insertId, nome, telefone });
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});

// Listar todos os clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await ClienteModel.getAll();
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        res.status(500).send('Erro ao buscar clientes');
    }
});

// Buscar cliente por ID
router.get('/:id', async (req, res) => {
    try {
        const cliente = await ClienteModel.getById(req.params.id);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

// Atualizar cliente
router.put('/:id', async (req, res) => {
  const { nome, telefone } = req.body;

  try {
    // Busca o cliente atual no banco de dados
    const clienteAtual = await ClienteModel.getById(req.params.id);

    if (!clienteAtual) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verifica se o telefone foi alterado
    if (telefone && telefone !== clienteAtual.telefone) {
      const isUnique = await ClienteModel.isPhoneUnique(telefone);
      if (!isUnique) {
        return res.status(400).json({ error: 'Telefone já está em uso' });
      }
    }

    // Atualiza os dados do cliente
    const nomeAtualizado = nome || clienteAtual.nome; // Mantém o nome original se não for enviado
    const telefoneAtualizado = telefone || clienteAtual.telefone; // Mantém o telefone original se não for enviado

    await ClienteModel.update(req.params.id, nomeAtualizado, telefoneAtualizado);
    res.json({ message: 'Cliente atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// Excluir cliente
router.delete('/:id', async (req, res) => {
    try {
        await ClienteModel.delete(req.params.id);
        res.json({ message: 'Cliente excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).json({ error: 'Erro ao excluir cliente' });
    }
});

module.exports = router;
