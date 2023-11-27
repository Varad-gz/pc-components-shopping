const {pquery} = require('../utils/promisified');

module.exports = {
    checkForAdmin: async (username, email, password) => {
        sql_values = [username, email, password];
        sql_query = `select username from admin where username = ? and email = ? and password = ?`;
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            console.log(err);
        }
    }
}