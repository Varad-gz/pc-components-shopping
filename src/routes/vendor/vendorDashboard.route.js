const express = require('express');
const router = express.Router();

const addProductsController = require('../../controllers/vendor/vendorDashboardController/addProducts.controller');
const {getDashboard} = require('../../controllers/vendor/vendor.controller');

router.get('', getDashboard)

router.get('/add-product', addProductsController.getRootPage)
router.get('/temp', (req, res) => {
    res.render('temp', {
        title: 'temp',
        loggedIn: req.body.loggedIn
    });
})

module.exports = router;