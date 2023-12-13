const express = require('express');
const router = express.Router();

const manageProductsCategoryController = require('../../controllers/admin/adminDashboardController/manageProductsCategory.controller'); 
const approveVendorController = require('../../controllers/admin/adminDashboardController/approveVendor.controller');
const adminController = require('../../controllers/admin/admin.controller');

router.get('', adminController.getDashboard)
router.get('/manage-category', manageProductsCategoryController.getRoot);
router.get('/approve-vendor', approveVendorController.getRoot);

module.exports = router;