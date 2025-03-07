const db = require('../db');

const VeiculoModel = {
    create: (modelo, marca, ano, callback) => {
        const sql = `INSERT INTO veiculos (modelo, marca, ano) VALUES (?, ?, ?)`;
        db.query(sql, [modelo, marca, ano], callback);
    },

    getAll: (callback) => {
        db.query('SELECT * FROM veiculos', callback);
    },

    update: (id, modelo, marca, ano, callback) => {
        const sql = `UPDATE veiculos SET modelo = ?, marca = ?, ano = ? WHERE id = ?`;
        db.query(sql, [modelo, marca, ano, id], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM veiculos WHERE id = ?', [id], callback);
    }
};

module.exports = VeiculoModel;