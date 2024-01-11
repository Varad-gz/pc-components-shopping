const express = require('express');
const router = express.Router();

const manageProductsCategoryController = require('../../controllers/admin/adminDashboardController/manageProductsCategory.controller'); 
const approveVendorController = require('../../controllers/admin/adminDashboardController/approveVendor.controller');
const addNewAdministrator = require('../../controllers/admin/adminDashboardController/addNewAdministrator.controller');
const miscController = require('../../controllers/admin/adminDashboardController/misc.controller');
const adminController = require('../../controllers/admin/admin.controller');

router.get('', adminController.getDashboard)
router.get('/manage-category', manageProductsCategoryController.getRoot);
router.get('/approve-vendor', approveVendorController.getRoot);
router.get('/add-new-admin', addNewAdministrator.getRoot);

router.get('/misc', miscController.getRoot);
router.post('/misc/del-default', miscController.deleteDefaultAdmin);


module.exports = router;