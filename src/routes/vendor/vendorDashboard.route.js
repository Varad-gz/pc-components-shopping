const express = require('express');
const router = express.Router();

const addProductsController = require('../../controllers/vendor/vendorDashboardController/addProducts.controller');
const {getDashboard} = require('../../controllers/vendor/vendor.controller');

router.get('', getDashboard)

router.get('/add-product', addProductsController.getRootPage)

module.exports = router;