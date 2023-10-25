var sql_db = require('./database')

exports.getCategories = () => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT category.category_name, category.category_image, category.alt_name FROM category`, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        })
    })
}

exports.getSubs = (cat) => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT sub_category.sub_category_name, sub_category.sub_category_image, sub_category.sub_alt_name FROM sub_category JOIN category ON sub_category.category_id = category.category_id WHERE category.category_name = "${cat}"`, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        })
    })
}

exports.getItems = (cat, sub) => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT product.product_image, product.product_id, product.product_name, product.stock, product.price, vendors.organization_name FROM product JOIN vendors ON product.vendor_id = vendors.vendor_id`, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        })
    })
}

exports.getItemsByCat = (cat) => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT p.product_image, p.product_id, p.product_name, p.stock, p.price, v.organization_name FROM product AS p JOIN category AS c on p.category_id = c.category_id AND c.category_name = "${cat}" JOIN vendors AS v ON p.vendor_id = v.vendor_id`, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        })
    })
}

exports.getItemsBySub = (cat, sub) => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT p.product_image, p.product_id, p.product_name, p.stock, p.price, v.organization_name FROM product AS p JOIN sub_category AS sc on p.sub_category_id = sc.sub_category_id AND sc.sub_category_name = "${sub}" JOIN category AS c  on p.category_id = c.category_id AND c.category_name = "${cat}" JOIN vendors AS v ON p.vendor_id = v.vendor_id`, (err, result) => {
            if (err) return reject(err)
            return resolve(result)
        })
    })
}

exports.findItems = (search) => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT p.product_id, p.product_name, p.product_image, p.price, p.stock, v.organization_name FROM product AS p JOIN vendors AS v ON p.vendor_id = v.vendor_id WHERE MATCH (p.product_name) AGAINST ("${search}*" IN BOOLEAN MODE)`, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

exports.findItemsByCat = (cat, search) => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT p.product_id, p.product_name, p.product_image, p.price, p.stock, v.organization_name FROM product AS p JOIN vendors AS v ON p.vendor_id = v.vendor_id JOIN category AS c ON p.category_id = c.category_id WHERE MATCH (p.product_name) AGAINST ("${search}*" IN BOOLEAN MODE) AND c.category_name = "${cat}"`, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}

exports.findItemsBySub = (cat, sub, search) => {
    return new Promise((resolve, reject) => {
        sql_db.query(`SELECT p.product_id, p.product_name, p.product_image, p.price, p.stock, v.organization_name FROM product AS p JOIN vendors AS v ON p.vendor_id = v.vendor_id JOIN sub_category AS s ON p.sub_category_id = s.sub_category_id JOIN category AS c ON p.category_id = c.category_id WHERE MATCH (p.product_name) AGAINST ('${search}*' IN BOOLEAN MODE) AND s.sub_category_name = "${sub}" AND c.category_name = "${cat}";`, (err, result) => {
            if(err) return reject(err)
            return resolve(result)
        })
    })
}