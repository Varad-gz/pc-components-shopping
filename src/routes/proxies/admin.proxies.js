const express = require('express');
const router = express.Router();

const {parseNewCat} = require('../../middleware/cartegory.middleware');
const manageProductsCategoryController = require('../../controllers/admin/adminDashboardController/manageProductsCategory.controller'); 
const approveVendorController = require('../../controllers/admin/adminDashboardController/approveVendor.controller');

router.get('/getcatedit', manageProductsCategoryController.getCatForEdit);
router.post('/postcatchanges', parseNewCat, manageProductsCategoryController.applyEditChanges);
router.get('/getcatadd', manageProductsCategoryController.getCatForAdd);
router.post('/postnewcat', parseNewCat , manageProductsCategoryController.addNewCategory);
router.get('/getcat', manageProductsCategoryController.getCat);
router.post('/delcat', manageProductsCategoryController.deleteConditions);
//router.post('/delist', manageProductsCategoryController.delistItems)
router.post('/appven', approveVendorController.approveVendor)
router.post('/rejven', approveVendorController.rejectVendor)

module.exports = router;