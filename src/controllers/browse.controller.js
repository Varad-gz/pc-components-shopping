const {getAll, getByCatname, getSearchedProds, getAllCount} = require('../models/product.model');
const {getRootCategory, getCategoriesWithRef, getAllCategories} = require('../models/category.model');

const fs = require('fs');
const path = require('path');

module.exports = {

getRootProductsPage : async(req, res) => {
    try {
        const cats = await getRootCategory();
        const items = await getAll();

        for (const item of items) {
            if(item.product_image === 'noimg') {
                item.product_image = path.join('images', 'uploads', 'default', 'noimg.png');
            } else {
                let images = await fs.promises.readdir(item.product_image);
                item.product_image = path.join('images', 'uploads', item.product_image.split('\\').pop(), images[0]);
            }
        }

        res.render('content/browse', {
            title: 'Browse', 
            products : items,
            cats: cats,
            loggedIn: req.body.loggedIn,
        });

    } catch(err) {
        console.log(err)
    }
},
getProductsByCatPage : async(req, res) => {
    try {
        const category_id = req.body.category_id;
        const category_name = req.body.category_name;
        const cats = await getCategoriesWithRef(category_id);
        const items = await getByCatname(category_name);

        res.render('content/browse', {
            title: 'Browse', 
            cat : cats, 
            products : items,
            loggedIn: req.body.loggedIn,
        });

    } catch(err) {
        console.log(err)
    }
},

getProductsByCatPage : async(req, res) => {
    try {
        const category_id = req.body.category_id;
        const category_name = req.body.category_name;
        const cats = await getCategoriesWithRef(category_id);
        const items = await getByCatname(category_name);

        res.render('content/browse', {
            title: 'Browse', 
            cat : cats, 
            products : items,
            loggedIn: req.body.loggedIn,
        });

    } catch(err) {
        console.log(err)
    }
},

getProductsByName : async(req, res) => {
    try {
        const name = req.body.prodQuery;
        const items = await getSearchedProds(name);

        res.render('content/browse', {
            title: 'Browse', 
            products : items,
            search: items.length,
            loggedIn: req.body.loggedIn,
            text: name,
        });

    } catch(err) {
        console.log(err)
    }
},

}