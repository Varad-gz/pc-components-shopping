const express = require('express')
const router = express.Router()

const {getProductsByName} = require('../controllers/browse.controller');

router.get('/', (req, res) => {
    res.render('content/home', { 
        title: 'Home Page', 
        loggedIn: req.body.loggedIn
    });
});

router.post('/search', getProductsByName);

module.exports = router;