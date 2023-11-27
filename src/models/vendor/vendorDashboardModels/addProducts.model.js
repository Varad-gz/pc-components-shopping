const sql_db = require('../../database');
const addProductsStatic = require('../../../../public/scripts/addProductsPublic');

function Product(prodObj) {
    this.name = prodObj.prodName;
    this.price = parseInt(prodObj.prodPrice);
    this.quantity = parseInt(prodObj.prodQuantity);
    this.description = prodObj.prodDesc;
    this.sub = parseInt(prodObj.prodSub);
    this.cat = parseInt(prodObj.prodCat);
    this.date = addProductsStatic.getDatetime();
    this.image = addProductsStatic.copyImage(prodObj.prodImage);
}


Product.prototype.add = function() {
    return new Promise((resolve, reject) => {
        const sql_values = [this.name, this.price, this.quantity, this.description, this.image, this.sub, 1, this.date, this.cat];
        sql_db.query("INSERT INTO product (product_name, price, stock, product_description, product_image, sub_category_id, vendor_id, addedDate, category_id) VALUES (?)", [sql_values], (err, result) => {
            if(err) reject(err)
            resolve(result);
        })
    })  
}

module.exports = {

    getCategories : () => {
        return new Promise((resolve, reject) => {
            sql_db.query(`select category_id, alt_name from category`, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    },
    
    getSubs : (id) => {
        return new Promise((resolve, reject) => {
            sql_db.query(`select sub_category_id, sub_alt_name from sub_category as sc where sc.category_id = ${id}`, (err, result) => {
                if(err) reject(err)
                resolve(result);
            })
        })
    },

    Product : Product

}