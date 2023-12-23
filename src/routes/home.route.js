const express = require('express');
const router = express.Router();

const { getRootPage } = require('../controllers/home.controller');

router.get('/', getRootPage);

module.exports = router;