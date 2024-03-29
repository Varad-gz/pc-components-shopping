const {pquery} = require('../utils/promisified');

function Product(prodObj) {
    this.name = prodObj.prodName;
    this.price = prodObj.prodPrice;
    this.quantity = prodObj.prodQuantity;
    this.description = prodObj.prodDesc;
    this.cat = prodObj.category_id;
    this.image = prodObj.folderpath;
    this.vendor_id = prodObj.vendorid
}


Product.prototype.add = async function() {
    const sql_query = `
    INSERT INTO products (product_name, product_description, unit_price, total_stock, category_id, vendor_id, product_image) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    const sql_values = [this.name, this.description, this.price, this.quantity, this.cat, this.vendor_id, this.image];
    try {
        return await pquery(sql_query, sql_values);
    } catch (err) {
        throw err;
    }
}

module.exports = {

    getAll: async () => { 
        const sql_query = `
        select p.product_id, p.product_name, p.unit_price, p.total_stock, p.product_description, p.category_id, p.product_image, v.organization_name, c.category_name from products p 
        join vendor_table v on p.vendor_id = v.vendor_id 
        join new_category c on p.category_id = c.category_id 
        where p.delisted_id_ref is null;
        `;
        try {
            return await pquery(sql_query);
        } catch (err) {
            throw err;
        }
    },

    getProdDetails: async (id) => {
        const sql_query = `
        select p.product_id, p.product_name, p.unit_price, p.total_stock, p.product_description, p.category_id, p.product_image, v.organization_name, c.category_name from products p 
        join vendor_table v on p.vendor_id = v.vendor_id 
        join new_category c on p.category_id = c.category_id 
        where p.product_id = ?;
        `;
        const sql_values = [id];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getSearchedProds: async (name) => {
        const sql_query = `
        select p.product_id, p.product_name, p.unit_price, p.total_stock, p.product_description, p.category_id, p.product_image, v.organization_name, c.alt_name, locate(?, p.product_name) AS found_index from products p 
        join vendor_table v on p.vendor_id = v.vendor_id 
        join new_category c on p.category_id = c.category_id 
        where p.product_name like ? and p.delisted_id_ref is null;
        `;
        const sql_values = [name, `%${name}%`];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getByCatname: async (category_name) => {
        const sql_query = 
        `WITH RECURSIVE CategoryHierarchy AS 
        (
            SELECT category_id, category_name, category_id_ref FROM new_category WHERE category_name = ?
        
            UNION ALL
        
            SELECT c.category_id, c.category_name, c.category_id_ref FROM new_category c
            JOIN CategoryHierarchy ch ON ch.category_id = c.category_id_ref
        )
        SELECT p.product_id, p.product_name, p.unit_price, p.total_stock, p.product_description, p.category_id, c.category_name, p.product_image, v.organization_name FROM products p
        JOIN new_category c ON p.category_id = c.category_id
        JOIN CategoryHierarchy ch ON c.category_id = ch.category_id 
        JOIN vendor_table v on v.vendor_id = p.vendor_id 
        WHERE p.delisted_id_ref IS NULL;`;

        const sql_values = [category_name];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getByCatnameRandLimit: async (category_name, lim) => {
        const sql_query = `
        WITH RECURSIVE CategoryHierarchy AS 
        (
            SELECT category_id, category_name, category_id_ref FROM new_category WHERE category_name = ?
        
            UNION ALL
        
            SELECT c.category_id, c.category_name, c.category_id_ref FROM new_category c
            JOIN CategoryHierarchy ch ON ch.category_id = c.category_id_ref
        )
        SELECT p.product_id, p.product_name, p.unit_price, p.total_stock, p.product_description, p.category_id, c.category_name, p.product_image, v.organization_name FROM products p
        JOIN new_category c ON p.category_id = c.category_id
        JOIN CategoryHierarchy ch ON c.category_id = ch.category_id 
        JOIN vendor_table v on v.vendor_id = p.vendor_id 
        WHERE p.delisted_id_ref IS NULL
        ORDER BY RAND()
        LIMIT ?;
        `;

        const sql_values = [category_name, lim];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getAllCount: async() => {
        const sql_query = `
        select count(product_id) as prod_count from products 
        where delisted_id_ref is null;
        `;
        
        try {
            return await pquery(sql_query);
        } catch (err) {
            throw err;
        }
    },

    getCountWithCat: async(category_name) => {
        const sql_query = `
        WITH RECURSIVE CategoryHierarchy AS 
        (
            SELECT category_id, category_name, category_id_ref FROM new_category 
            WHERE category_name = ?

            UNION ALL          

            SELECT c.category_id, c.category_name, c.category_id_ref FROM new_category c 
            JOIN CategoryHierarchy ch ON ch.category_id = c.category_id_ref
        )
        SELECT COUNT(p.product_id) AS prod_count FROM CategoryHierarchy ch 
        JOIN products p ON ch.category_id = p.category_id 
        WHERE p.delisted_id_ref IS NULL;
        `

        const sql_values = [category_name];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    deleteProd: async(id) => {
        const sql_query = `
        delete from products 
        where product_id = ?
        `;
        const sql_values = [id];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getImageFolderPath: async(id) => {
        const sql_query = `
        select product_image from products 
        where product_id = ?
        `;
        const sql_values = [id];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getProdDetailsForVendor: async(vendorid) => {
        const sql_query = `
        select product_id, product_name, unit_price, total_stock, product_description, category_id, product_image from products 
        where vendor_id = ?;
        `;
        const sql_values = [vendorid];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    Product : Product
}