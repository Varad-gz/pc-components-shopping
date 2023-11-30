const express = require('express');
const router = express.Router();

const vendorDashboard = require('./vendorDashboard.route');
const vendorController = require('../../controllers/vendor/vendor.controller');
const { securePassword } = require('../../middleware/hashingMiddleware');
const vendorMiddleware = require('../../middleware/vendor.middleware')
const { forVendor } = require('../../middleware/authentication.middleware');

router.get('/login', vendorController.getLoginPage)
router.post('/login', vendorMiddleware.doesEmailExist, vendorMiddleware.doesOrgExist, vendorController.authenticateVendor)
router.get('/registration', vendorController.getRegistrationPage)
router.post('/registration', securePassword, vendorMiddleware.ifEmailExists, vendorMiddleware.ifOrgExists, vendorController.registerTheUser);
router.use('/dashboard', forVendor, vendorDashboard);
router.get('/logout', forVendor, vendorController.logout);

module.exports = router;