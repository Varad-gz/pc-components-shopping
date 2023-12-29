const express = require('express');
const router = express.Router();

const homeRoute = require('./home.route');
const userRoute = require('./user.route')
const browseRoute = require('./browse.route');
const itemRoute = require('./item.route');
const vendorRoute = require('./vendor/vendor.route');
const adminRoute = require('./admin/admin.route')
const apiProxy = require('./api.proxy');
const errorRoute = require('./error.route');
const searchRoute = require('./search.route');
const {ifAuthenticated} = require('../middleware/authentication.middleware');

router.use('/api/proxy', apiProxy);
router.use('/error', errorRoute);
router.use(ifAuthenticated);
router.use(homeRoute);
router.use(userRoute);
router.use('/browse', browseRoute);
router.use('/item', itemRoute);
router.use('/vendor', vendorRoute);
router.use('/admin', adminRoute);
router.use('/search', searchRoute);

module.exports = router;