const util = require('util');

const bcrypt = require('bcrypt');
const sql_db = require('../models/database');

module.exports = {
    aHash : util.promisify(bcrypt.hash),
    cHash : util.promisify(bcrypt.compare),
    pquery: util.promisify(sql_db.query.bind(sql_db))
}