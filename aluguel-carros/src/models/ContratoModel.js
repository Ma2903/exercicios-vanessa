const db = require('../db');

const ContratoModel = {
  // Retorna todos os contratos
  getAll: async () => {
    const [rows] = await db.query('SELECT id, tipo, valor FROM contratos');
    return rows;
  },

  // Retorna um contrato pelo ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM contratos WHERE id = ?', [id]);
    return rows[0]; // Retorna o primeiro contrato encontrado
  },

  // Cria um novo contrato
  create: async (tipo, valor) => {
    const [result] = await db.query('INSERT INTO contratos (tipo, valor) VALUES (?, ?)', [tipo, valor]);
    return result;
  },

  // Atualiza um contrato existente
  update: async (id, tipo, valor) => {
    await db.query('UPDATE contratos SET tipo = ?, valor = ? WHERE id = ?', [tipo, valor, id]);
  },

  // Exclui um contrato pelo ID
  delete: async (id) => {
    await db.query('DELETE FROM contratos WHERE id = ?', [id]);
  },
};

module.exports = ContratoModel;
