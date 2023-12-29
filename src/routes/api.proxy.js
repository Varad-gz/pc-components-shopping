const express = require('express');
const router = express.Router();

const {forAdmin, forVendor} = require('../middleware/authentication.middleware');
const proxyController = require('../controllers/proxy.controller');
const forAdminApiProxies = require('./proxies/admin.proxies');
const forVendorApiProxies = require('./proxies/vendor.proxies');
const { backendLinkAuthenticate } = require('../middleware/proxy.middleware');
const { createFileUploadMiddleware } = require('../middleware/multerMemory.middleware');
const { defaultFilesConfig } = require('../../config/env');
const { securePassword } = require('../middleware/hashing.middleware');

router.use('/foradmin', backendLinkAuthenticate, forAdminApiProxies);
router.use('/forvendor', backendLinkAuthenticate, forVendorApiProxies);

//manage categories
router.get('/catman', forAdmin, proxyController.getSubcategories);
router.get('/catman/change', forAdmin, proxyController.getEditPopup);
router.post('/catman/change', forAdmin, proxyController.postEditChanges);
router.get('/catman/add', forAdmin, proxyController.getAddPopup);
router.post('/catman/add', forAdmin, proxyController.postNewCategory);
router.post('/catman/checkandadd', forAdmin, proxyController.delistProdsAndPostCat);
router.get('/catman/del', forAdmin, proxyController.deleteCat);

//vendor approval
router.post('/vendapp', forAdmin, proxyController.postVendorApprovalStatus)

//admin creation
router.post('/addadmin/postdata', forAdmin, securePassword, proxyController.postNewAdminCredentials)

//add product
router.get('/addprodgetcat', forVendor, proxyController.getSubcategoriesForVendor);
router.post('/postproddata', forVendor, createFileUploadMiddleware('prodImage', defaultFilesConfig.MAX_FILES, defaultFilesConfig.MAX_SIZE), proxyController.postProdData);

module.exports = router;