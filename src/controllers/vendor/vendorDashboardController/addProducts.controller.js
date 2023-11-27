const addProductsModel = require('../../../models/vendor/vendorDashboardModels/addProducts.model')

module.exports = {

    // This will get category list in the add products menu
    selCatPanel : async (req, res) => {
        try {
            const result = await addProductsModel.getCategories();
            res.render('content/vendor/vendorDashboardContents/addProducts', {
                title: 'Add Product',
                rootCat : result,
                scripts: ['/scripts/addProductsPublic.js'],
                loggedIn: req.body.loggedIn
            });
        } catch (err) {
            console.log(err);
        }
    },

    // This will get subcategory list in the add products menu
    selSubPanel : async (req, res) => {
        try {
            const result = await addProductsModel.getSubs(req.params.id);
            res.send(result);
        } catch (err) {
            console.log(err);
        }
    },

    addProduct : async (req, res) => {
        try {
            const prod = addProductsModel.Product;
            let newProduct = new prod(req.body)
            await newProduct.add();
            res.send('Product successfully added!!');
        } catch (err) {
            console.log(err);
        }
    }

}