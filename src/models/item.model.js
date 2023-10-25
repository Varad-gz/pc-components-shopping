const sql_db = require('../models/database');

exports.getProduct = (id) => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT p.product_name, p.product_description, p.product_image, p.price, p.stock, v.organization_name FROM product AS p JOIN vendors AS v ON p.vendor_id = v.vendor_id WHERE p.product_id = "${id}"`, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        })
    })
}