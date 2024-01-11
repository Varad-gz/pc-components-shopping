const {pquery} = require('../utils/promisified');

function Admin(adminobj) {
    this.username = adminobj.username,
    this.email = adminobj.email,
    this.hash = adminobj.hash
}

Admin.prototype.add = async function () {
    const sql_query = `INSERT INTO admin (username, email, password) VALUES (?, ?, ?);`;
    const sql_values = [this.username, this.email, this.hash];
    try{
        const res = await pquery(sql_query, sql_values);
        return res.insertId
    } catch (err) {
        throw err;
    }
}

module.exports = {
    checkIfEmailExists: async (email) => {
        const sql_query = `select count(*) as adminexists from admin where email = ?;`;
        const sql_values = [email];
        try{
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getLoginDetails : async (email, username) => {
        const sql_query = "select password from admin where email = ? and username = ?;";
        const sql_values = [email, username];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            console.log(err);
        }
    },

    deleteDefault : async () => {
        const sql_query = "DELETE FROM admin WHERE username = ? AND email = ?;";
        const sql_values = ["defadmin", "admin@temp.com"];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            console.log(err);
        }
    },

    checkDefaultExists : async () => {
        const sql_query = `select count(*) as adminexists from admin where username = ? and email = ?;`;
        const sql_values = ["defadmin", "admin@temp.com"];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            console.log(err);
        }
    },

    Admin: Admin
}