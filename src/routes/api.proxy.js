const express = require('express');
const router = express.Router();

const {forAdmin} = require('../middleware/authentication.middleware');
const proxyController = require('../controllers/proxy.controller');
const {getLowestDepth} = require('../middleware/cartegoryParser');

router.get('/catman', forAdmin, proxyController.getSubcategories);
router.get('/catman/change', forAdmin, proxyController.getEditPopup);
router.post('/catman/change', forAdmin, proxyController.postEditChanges);
router.get('/catman/add', forAdmin, proxyController.getAddPopup);
router.post('/catman/add', forAdmin, proxyController.postNewCategory);
router.get('/catman/del', forAdmin, proxyController.deleteCat);

router.get('/addprodgetcat', proxyController.getSubcategoriesForVendor);
router.post('/postproddata', proxyController.postProdData);

module.exports = router;