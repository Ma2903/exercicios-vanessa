const db = require('../db');

const ClienteModel = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return rows[0]; // Retorna o primeiro cliente encontrado
  },
  create: async (nome, telefone) => {
    const [result] = await db.query('INSERT INTO clientes (nome, telefone) VALUES (?, ?)', [nome, telefone]);
    return result;
  },
  update: async (id, nome, telefone) => {
    await db.query('UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?', [nome, telefone, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM clientes WHERE id = ?', [id]);
  },
  isPhoneUnique: async (telefone) => {
    const [rows] = await db.query('SELECT * FROM clientes WHERE telefone = ?', [telefone]);
    return rows.length === 0; // Retorna true se o telefone não existir
  },
};

module.exports = ClienteModel;
