const express = require('express');
const router = express.Router();

const addProductsController = require('../../controllers/vendor/vendorDashboardController/addProducts.controller');
const removeProductsController = require('../../controllers/vendor/vendorDashboardController/removeProducts.controller');
const {getDashboard} = require('../../controllers/vendor/vendor.controller');

router.get('', getDashboard);

router.get('/add-product', addProductsController.getRootPage);
router.get('/remove-prods', removeProductsController.getRootPage);

module.exports = router;