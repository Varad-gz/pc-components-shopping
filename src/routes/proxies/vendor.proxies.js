const express = require('express');
const router = express.Router();

const addProductsController = require('../../controllers/vendor/vendorDashboardController/addProducts.controller');
const removeProductsController = require('../../controllers/vendor/vendorDashboardController/removeProducts.controller');
const {getLowestDepth} = require('../../middleware/cartegory.middleware');
const {parseNewProd} = require('../../middleware/product.middleware');

router.get('/getcat', addProductsController.getCat);
router.post('/postnewprod', getLowestDepth, parseNewProd, addProductsController.addProduct);
router.post('/deleteproduct', removeProductsController.deleteProductWithId);

module.exports = router;