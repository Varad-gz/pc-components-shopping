const sql_db = require('../../database');

module.exports = {

    getRootCategory : () => {
        return new Promise((resolve, reject) => {
            sql_db.query("select category_id, alt_name from new_category where category_depth = 0;", (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    },

    getCategoriesWithRef : (id) => {
        return new Promise((resolve, reject) => {
            sql_db.query("select category_id, category_name, alt_name, category_depth from new_category where category_id_ref = ?;", id, (err, result) => {
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

    doesThisCatHaveProduct : (id) => {
        return new Promise((resolve, reject) => {
            sql_db.query("select * from products where products.category_id = ?;", id, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    },

    deleteCategory : (id) => {
        return new Promise((resolve, reject) => {
            sql_db.query("DELETE FROM new_category WHERE category_id = ?;", id, (err, result) => {
                if(err) reject(err)
                resolve(result);
            });
        });
    },
}