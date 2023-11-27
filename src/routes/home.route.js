const express = require('express')
const router = express.Router()

router.get('', (req, res) => {
    res.render('content/home', { 
        title: 'Home Page', 
        loggedIn: req.body.loggedIn
    });
});

module.exports = router;