const db = require('../db');

const ClienteModel = {
    create: (nome, telefone, callback) => {
        db.query('INSERT INTO clientes (nome, telefone) VALUES (?, ?)', [nome, telefone], callback);
    },

    getAll: (callback) => {
        db.query('SELECT * FROM clientes', callback);
    }
};

module.exports = ClienteModel;
