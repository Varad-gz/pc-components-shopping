const express = require('express')
const router = express.Router()

const prodController = require('../controllers/browse.controller')
const {parseCatIdName} = require('../middleware/cartegoryParser');

router.get('', prodController.getRootProductsPage);
router.post('', parseCatIdName, prodController.getProductsByCatPage)

module.exports = router;