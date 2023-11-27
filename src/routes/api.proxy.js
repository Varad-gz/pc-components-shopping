const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated');
const proxyController = require('../controllers/proxy.controller');

router.get('/catman', isAuthenticated.forAdmin, proxyController.getSubcategories);
router.get('/catman/change', isAuthenticated.forAdmin, proxyController.getEditPopup);
router.post('/catman/change', isAuthenticated.forAdmin, proxyController.postEditChanges);
router.get('/catman/add', isAuthenticated.forAdmin, proxyController.getAddPopup);
router.post('/catman/add', isAuthenticated.forAdmin, proxyController.postNewCategory);
router.get('/catman/del', isAuthenticated.forAdmin, proxyController.deleteCat);

module.exports = router;