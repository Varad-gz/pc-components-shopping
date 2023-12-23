const express = require('express')
const router = express.Router()

router.get('/forbidden-page', (req, res) => {
    delete req.session.loggedIn;
    res.render('content/forbiddenPage', {
        title: '403 Forbidden',
    });
});

module.exports = router;