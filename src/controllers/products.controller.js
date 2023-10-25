const prodModel = require('../models/products.model');
const { search } = require('../routes/home.route');

module.exports = {

getProductsPage : async(req, res) => {
    try {
        const cats = await prodModel.getCategories();
        const items = await prodModel.getItems();
        res.render('products', {isWhat : 'all', categories : cats, products : items})
    } catch(err) {
        console.log(err)
    }
},

getCategoryPage : async(req, res) => {
    try {
        const cat = req.params.category;
        const subs = await prodModel.getSubs(cat);
        const items = await prodModel.getItemsByCat(cat);
        res.render('products', {isWhat : 'cat', cat : cat , subcategories : subs, products : items})
    } catch(err) {
        console.log(err)
    }
},

getSubsPage : async(req, res) => {
    try {
        const cat = req.params.category;
        const sub = req.params.sub;
        const items = await prodModel.getItemsBySub(cat, sub);
        res.render('products', {isWhat : 'sub', cat : cat, sub : sub, products : items})
    } catch(err) {
        console.log(err)
    }
},

findInProductsPage : async(req, res) => {
    try {
        const s = req.query.search;
        const items = await prodModel.findItems(s);
        res.render('products', {isWhat : 'search', resultCount : items.length, products : items})
    } catch(err) {
        console.log(err)
    }
},

findInCategoryPage : async(req, res) => {
    try {
        const cat = req.params.category;
        const s = req.query.search;
        const items = await prodModel.findItemsByCat(cat, s);
        res.render('products', {isWhat : 'search', resultCount : items.length, products : items})
    } catch(err) {
        console.log(err)
    }
},

findInSubsPage : async(req, res) => {
    try {
        const cat = req.params.category;
        const sub = req.params.sub;
        const s = req.query.search;
        const items = await prodModel.findItemsBySub(cat, sub, s);
        res.render('products', {isWhat : 'search', resultCount : items.length, products : items})
    } catch(err) {
        console.log(err)
    }
},

}