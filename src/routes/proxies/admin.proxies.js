const express = require('express');
const router = express.Router();

const {parseNewCat} = require('../../middleware/cartegoryParser');
const manageProductsCategoryController = require('../../controllers/admin/adminDashboardController/manageProductsCategory.controller'); 

router.get('/getcatedit', manageProductsCategoryController.getCatForEdit);
router.post('/postcatchanges', parseNewCat, manageProductsCategoryController.applyEditChanges);
router.get('/getcatadd', manageProductsCategoryController.getCatForAdd);
router.post('/postnewcat', parseNewCat , manageProductsCategoryController.addNewCategory);
router.get('/getcat', manageProductsCategoryController.getCat);
router.post('/delcat', manageProductsCategoryController.deleteConditions);

module.exports = router;