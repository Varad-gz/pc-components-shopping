const express = require('express')
const router = express.Router()

const prodController = require('../controllers/browse.controller')

router.get('', prodController.getBrowsePage);
router.get('/get', prodController.getBrowsePage);

module.exports = router;