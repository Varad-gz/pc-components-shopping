const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin/admin.controller');

const adminDashboardRoute = require('./adminDashboard.route');
const { forAdmin } = require('../../middleware/isAuthenticated');

router.get('/login', adminController.getLoginPage)
router.post('/login', adminController.authenticateUser)

router.use('/dashboard', forAdmin, adminDashboardRoute);

router.get('/logout', forAdmin, adminController.logoutAdmin);

module.exports = router;