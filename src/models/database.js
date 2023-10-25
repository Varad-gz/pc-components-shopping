const mysql = require('mysql2');
require('dotenv').config('../.env');

const con = mysql.createConnection({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_DB
});

con.connect((err) => {
    if (err) throw err
    console.log('database connected')
})

module.exports = con;