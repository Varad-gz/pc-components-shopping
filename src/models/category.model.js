const {pquery} = require('../utils/promisified');
const sql_db = require('../../config/database');

function Category(catObj) {
    this.id = catObj.id;
    this.name = catObj.catName;
    this.desc = catObj.catDesc;
    this.alt_name = catObj.altName;
    this.ref = catObj.ref;
    this.depth = catObj.depth;
}

Category.prototype.add = async function() {
    const sql_values = [this.name, this.desc, this.alt_name, this.depth];
    const sql_query = `insert into new_category (category_name, category_description, alt_name, category_depth) values (?, ?, ?, ?);`;
    try {
        return await pquery(sql_query, sql_values);
    } catch (err) {
        throw err;
    }  
}

Category.prototype.addWithRef = async function() {
    const sql_values = [this.name, this.desc, this.alt_name, this.ref, this.depth];
    const sql_query = `insert into new_category (category_name, category_description, alt_name, category_id_ref, category_depth) values (?, ?, ?, ?, ?);`;
    try {
        return await pquery(sql_query, sql_values);
    } catch (err) {
        throw err;
    }  
}

Category.prototype.delistProdsAndAddWithRef = async function() {
    const sql_values = [this.name, this.desc, this.alt_name, this.ref, this.depth];
    const sql_query = `call DelistAndAddCategory(?, ?, ?, ?, ?);`;
    try {
        return await pquery(sql_query, sql_values);
    } catch (err) {
        throw err;
    }  
}

Category.prototype.update = async function() {
    const sql_values = [this.name, this.alt_name, this.desc, this.id];
    const sql_query = `UPDATE new_category SET category_name = ?, alt_name = ?, category_description = ? WHERE category_id = ?`;
    try {
        return await pquery(sql_query, sql_values);
    } catch (err) {
        throw err;
    }  
}

module.exports = {
    getAllCategories : () => {
        return new Promise((resolve, reject) => {
            sql_db.query("select category_id, category_name, alt_name, category_depth from new_category", (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    },

    getRootCategory : () => {
        return new Promise((resolve, reject) => {
            sql_db.query("select category_id, category_name, alt_name from new_category where category_depth = 0;", (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    },

    getCategoriesWithRef : async (id) => {
        const sql_values = [id];
        const sql_query = `select category_id, category_name, alt_name, category_depth from new_category where category_id_ref = ?;`;
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        } 
    },

    getCategoriesWithRefName : (name) => {
        return new Promise((resolve, reject) => {
            sql_db.query("select category_id, category_name, alt_name from new_category where category_id_ref = (select category_id from new_category where category_name = ?);", name, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    },

    getCategoryInfo : (id) => {
        return new Promise((resolve, reject) => {
            sql_db.query("select category_id, category_name, alt_name, category_description, category_depth from new_category where category_id = ?;", id, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    },

    doesThisCatHaveProducts : async (id) => {
        const sql_values = [id];
        const sql_query = `select count(*) as prodcount from products where category_id = ?;`;
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }  
    },

    deleteCategory : (id) => {
        return new Promise((resolve, reject) => {
            sql_db.query("DELETE FROM new_category WHERE category_id = ?;", id, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    },

    Category : Category
}