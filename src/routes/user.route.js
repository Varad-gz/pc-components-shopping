const express = require('express');
const router = express.Router();

const {securePassword} = require('../middleware/hashing.middleware');
const userController = require('../../src/controllers/user/user.controller');
const { forUser } = require('../middleware/authentication.middleware');

router.get('/login', userController.getLoginPage)
router.post('/login', userController.authenticateUser);
router.get('/registration', userController.getRegistrationPage)
router.post('/registration', securePassword, userController.registerTheUser)
router.get('/logout', forUser, userController.userLogout)
router.get('/cart', forUser, userController.getCartPage)
router.post('/additemtocart', forUser, userController.addToCart)

module.exports = router;