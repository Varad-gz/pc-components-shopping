const express = require('express');
const router = express.Router();
const addProductsController = require('../../controllers/vendor/vendorDashboardController/addProducts.controller');

router.get('', (req, res) => {
    res.render('content/vendor/vendorDashboard', {
        title: 'Vendor Dashboard',
        loggedIn: req.body.loggedIn
    })
})
router.get('/add-product', addProductsController.selCatPanel)
router.get('/add-products/:id', addProductsController.selSubPanel);
router.post('/add-products', addProductsController.addProduct)

module.exports = router;