//const addProductsModel = require('../../../models/vendor/vendorDashboardModels/addProducts.model')
const {getRootCategory, getCategoriesWithRef} = require('../../../models/category.model');
const {Product} = require('../../../models/product.model');

module.exports = {

    // This will get category list in the add products menu
    getRootPage : async (req, res) => {
        console.log(req.body.loggedIn)
        try {
            const rootCat = await getRootCategory();
            res.render('content/vendor/vendorDashboardContents/addProducts', {
                title: 'Add Product',
                rootCat : rootCat,
                scripts: ['/scripts/addProductsPublic.js'],
                loggedIn: req.body.loggedIn,
                vid: req.session.vendor_id
            });
        } catch (err) {
            console.log(err);
        }
    },

    getCat : async (req, res) => {
        try {
            const catId = req.query.id;
            const cat = await getCategoriesWithRef(catId);
            res.send(cat);
        } catch (err) {
            console.log(err);
        }
    },

    addProduct : async (req, res) => {
        try {
            let newProduct = new Product(req.body)
            await newProduct.add();
            const resInfo = {
                type: 'alert',
                message: 'Product added successfully...',
                redirectLink: '/vendor/dashboard'
            }
            res.json(resInfo);
        } catch (err) {
            const resInfo = {
                type: 'alert',
                message: ['Error Message', 'Process Failed!'],
                redirectLink: '/vendor/dashboard/add-product'
            }
            res.json(resInfo);
        }
    }

}