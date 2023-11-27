const express = require('express');
const router = express.Router();

const {getRootPage} = require('../../controllers/vendor/vendorDashboardController/addProducts.controller');
const {getDashboard} = require('../../controllers/vendor/vendor.controller');

router.get('', getDashboard)

router.get('/add-product', getRootPage)
//router.post('/add-products', addProductsController.addProduct)

module.exports = router;