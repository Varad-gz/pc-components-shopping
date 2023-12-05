const {getAll, getByCatname, getSearchedProds} = require('../models/product.model');
const {getRootCategory, getCategoriesWithRef} = require('../models/category.model');

module.exports = {

getRootProductsPage : async(req, res) => {
    try {
        const cats = await getRootCategory();
        const items = await getAll();

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