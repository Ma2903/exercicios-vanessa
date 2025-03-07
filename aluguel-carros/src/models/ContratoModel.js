const db = require('../db');

const ContratoModel = {
    create: (tipo, valor, callback) => {
        db.query('INSERT INTO contratos (tipo, valor) VALUES (?, ?)', [tipo, valor], callback);
    },

    getAll: (callback) => {
        db.query('SELECT * FROM contratos', callback);
    }
};

module.exports = ContratoModel;
