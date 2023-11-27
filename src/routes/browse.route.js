const express = require('express')
const router = express.Router()
const prodController = require('../controllers/browse.controller')

router.get('', prodController.getProductsPage);
router.get('/s', prodController.findInProductsPage);

router.get('/:category', prodController.getCategoryPage);
router.get('/:category/s', prodController.findInCategoryPage);

router.get('/:category/:sub', prodController.getSubsPage);
router.get('/:category/:sub/s', prodController.findInSubsPage);

module.exports = router;