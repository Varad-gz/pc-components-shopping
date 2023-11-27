const express = require('express');
const router = express.Router();

const {securePassword} = require('../../middleware/hashingMiddleware');
const userController = require('../../controllers/user/userController');

router.get('/login', (req, res) => {
    res.render('content/user/userLoginPage', {
        title: 'Login',
        loggedIn: req.body.loggedIn
    });
})

router.post('/login', userController.authenticateUser);

router.get('/registration', (req, res) => {
    res.render('content/user/userRegistrationPage', {
        title: 'Register',
        scripts: ['/scripts/registrationPublic.js'],
        loggedIn: req.body.loggedIn
    });
})

router.post('/registration', securePassword, userController.registerTheUser)

module.exports = router;