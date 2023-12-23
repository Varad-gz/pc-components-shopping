const util = require('util');

const bcrypt = require('bcrypt');
const sql_db = require('../../config/database');

module.exports = {
    aHash : util.promisify(bcrypt.hash),
    cHash : util.promisify(bcrypt.compare),
    pquery: util.promisify(sql_db.query.bind(sql_db)),
    pbeginTransaction: util.promisify(sql_db.beginTransaction.bind(sql_db)),
    pcommit: util.promisify(sql_db.commit.bind(sql_db)),
}