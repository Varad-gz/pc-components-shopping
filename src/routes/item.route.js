const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

router.get('', itemController.getItemPage);

module.exports = router;