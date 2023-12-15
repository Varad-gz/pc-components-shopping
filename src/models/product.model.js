const {pquery} = require('../utils/promisified');

function Product(prodObj) {
    this.name = prodObj.prodName;
    this.price = prodObj.prodPrice;
    this.quantity = prodObj.prodQuantity;
    this.description = prodObj.prodDesc;
    this.cat = prodObj.category_id;
    this.image = prodObj.prodImage;
    this.vendor_id = prodObj.vendorid
}


Product.prototype.add = async function() {
    const sql_query = `INSERT INTO products (product_name, product_description, unit_price, total_stock, category_id, vendor_id, product_image) VALUES (?, ?, ?, ?, ?, ?, ?);`
    const sql_values = [this.name, this.description, this.price, this.quantity, this.cat, this.vendor_id, this.image];
    try {
        return await pquery(sql_query, sql_values);
    } catch (err) {
        throw err;
    }
}

module.exports = {

    getAll: async () => { 
        const sql_query = `select p.product_id, p.product_name, p.unit_price, p.total_stock, p.product_description, p.category_id, p.product_image, v.organization_name from products p join vendor_table v on p.vendor_id = v.vendor_id;`
        try {
            return await pquery(sql_query);
        } catch (err) {
            throw err;
        }
    },

    getProdDetails: async (id) => {
        const sql_query = `select p.product_id, p.product_name, p.unit_price, p.total_stock, p.product_description, p.category_id, p.product_image, v.organization_name from products p join vendor_table v on p.vendor_id = v.vendor_id where p.product_id = ?;`;
        const sql_values = [id];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getSearchedProds: async (name) => {
        name = '%' + name + '%';
        const sql_query = `select * from products where product_name like ?`;
        const sql_values = [name];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getByCatname: async (category_name) => {
        const sql_query = `WITH RECURSIVE CategoryHierarchy AS (
            SELECT
                category_id,
                category_name,
                category_depth,
                category_id_ref
            FROM
                new_category
            WHERE
                category_name = ?
            UNION
            SELECT
                nc.category_id,
                nc.category_name,
                nc.category_depth,
                nc.category_id_ref
            FROM
                new_category nc
            JOIN
                CategoryHierarchy ch ON nc.category_id_ref = ch.category_id
        )
        SELECT
            p.product_id,
            p.product_name,
            p.unit_price,
            p.total_stock,
            p.product_description,
            p.category_id,
            v.organization_name
        FROM
            products p
        JOIN
            new_category c ON p.category_id = c.category_id
        JOIN
            vendor_table v ON p.vendor_id = v.vendor_id
        JOIN
            CategoryHierarchy ch ON c.category_id = ch.category_id
        LEFT JOIN
            new_category pc ON c.category_id_ref = pc.category_id;`
        
        const sql_values = [category_name];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    Product : Product
}