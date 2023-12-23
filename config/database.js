const mysql = require('mysql2');
const { dbConfig } = require('./env');

const con = mysql.createConnection(dbConfig);

con.connect((err) => {
    if (err) throw err
    console.log('database connected')
})

module.exports = con;