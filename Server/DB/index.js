const mysql = require('mysql');


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '12345678',
    database: 'hotel',
})

module.exports = db;
