const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then(connection => {
        console.log('Conectado ao banco de dados MySQL.');
        connection.release();
    })
    .catch(err => {
        console.error('Erro ao conectar ao MySQL:', err.message);
    });

module.exports = db;