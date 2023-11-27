const express = require('express');
const router = express.Router();
const vendorDashboard = require('./vendorDashboard.route');
const vendorController = require('../../controllers/vendor/vendor.controller');

//vendor registration page
router.get('/registration', vendorController.registrationPage)
router.post('/registration', (req, res) => {console.log(req.body)})

//vendor dashboard content
router.use('/dashboard', vendorDashboard);

module.exports = router;