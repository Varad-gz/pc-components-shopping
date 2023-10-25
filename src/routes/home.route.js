const express = require('express')
const router = express.Router()

router.get('', (req, res) => {
    res.render('home')
});

router.get('/search', (req, res) => {
    res.render('products', {search:req.query.search})
})

module.exports = router;