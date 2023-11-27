const express = require('express');
const router = express.Router();

const addProductsController = require('../../controllers/vendor/vendorDashboardController/addProducts.controller');
const {getLowestDepth} = require('../../middleware/cartegoryParser');
const {parseNewProd} = require('../../middleware/productParser');

router.get('/getcat', addProductsController.getCat);
router.post('/postnewprod', getLowestDepth, parseNewProd, addProductsController.addProduct);

module.exports = router;