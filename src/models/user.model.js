const {pquery} = require('../utils/promisified');
const sql_db = require('../../config/database');

function User(userObj) {
    this.fname = userObj.fname,
    this.lname = userObj.lname,
    this.email = userObj.email,
    this.hash = userObj.hash,
    this.ph1= userObj.ph1,
    this.ph2= userObj.ph2,
    this.add1= userObj.add1,
    this.add2= userObj.add2,
    this.state= userObj.state,
    this.city= userObj.city,
    this.zip= userObj.zip;
}

User.prototype.addPersonalDetails = async function () {
    const sql_query = `insert into personal_info (phone1, phone2, address_line1, address_line2, city, state, zip) values (?, ?, ?, ?, ?, ?, ?);`;
    const sql_values = [this.ph1, this.ph2, this.add1, this.add2, this.city, this.state, this.zip];
    try{
        const res = await pquery(sql_query, sql_values);
        return res.insertId
    } catch (err) {
        throw err;
    }
}

User.prototype.addUser = function (personalInfoID) {
    return new Promise((resolve, reject) => {
        const sql_values = [
            this.fname,
            this.lname,
            this.email,
            this.hash,
            personalInfoID
        ];
        sql_db.query(`insert into customers (first_name, last_name, email, password, personal_info_id) values (?, ?, ?, ?, ?);`, sql_values, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    checkUserExists : async (email) => {
        sql_query = "select password, first_name, last_name, customer_id from customers where email = ?;";
        try {
            return await pquery(sql_query, email);
        } catch (err) {
            console.log(err);
        }
    },

    User : User
}