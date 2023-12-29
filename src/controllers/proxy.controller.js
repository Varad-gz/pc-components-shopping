const axios = require('axios');
const htmlBuilder = require('../utils/htmlBuilder');
const { adminHeader, vendorHeader } = require('../../config/authentication');
const { deleteFolderorInsertDb } = require("../utils/deleteUnnecessayUploads");

module.exports = {
    getEditPopup: async (req, res) => {
        const category_id = req.query.category_id;
        try {
            const data = await axios.get('http://localhost:3000/api/proxy/foradmin/getcatedit', {
                params: {
                    id: category_id
                },
                headers: {
                    ...adminHeader
                }
            });
            res.send(htmlBuilder.createEditPopupForCategories(data.data, category_id));
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                console.log(err);
            }
        }
    },

    postEditChanges: async (req, res) => {
        try {
            const body = req.body;
            const response = await axios.post('http://localhost:3000/api/proxy/foradmin/postcatchanges', body, {
                headers: {
                    ...adminHeader
                }
            });
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/error/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    getSubcategories: async (req, res) => {
        try {
            const category_id = req.query.category_id;
            const data = await axios.get(`http://localhost:3000/api/proxy/foradmin/getcat`, {
                params: {
                    id: category_id
                },
                headers: {
                    ...adminHeader
                }
            });
            const depth = data.data[0].category_depth;
            const jsonObj = {
                id: 'subcategories',
                depth: depth,
                htmlBody: htmlBuilder.createSelectForCategories(data.data)
            };
            res.json(jsonObj);
        } catch (err) {
            if (err instanceof TypeError) {
                res.json({id: 'cat'});
            } else if (err.response && err.response.status === 403) {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                console.log(err);
            }
        }
    },

    getAddPopup: async (req, res) => {
        const category_id = req.query.category_id;
        try {
            const data = await axios.get('http://localhost:3000/api/proxy/foradmin/getcatadd', {
                params: {
                    id: category_id
                },
                headers: {
                    ...adminHeader
                }
            });
            res.send(htmlBuilder.createAddPopupForCategories(data.data));
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                console.log(err);
            }
        }
    },

    postNewCategory: async (req, res) => {
        try {
            const body = req.body;
            const response = await axios.post('http://localhost:3000/api/proxy/foradmin/postnewcat', body, {
                headers: {
                    ...adminHeader
                }
            });
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/error/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    delistProdsAndPostCat: async (req, res) => {
        try {
            const body = req.body;
            const response = await axios.post('http://localhost:3000/api/proxy/foradmin/delistandpostcat', body, {
                headers: {
                    ...adminHeader
                }
            });
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/error/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },


    deleteCat: async (req, res) => {
        try {
            const category_id = { category_id: req.query.category_id };
            const response = await axios.post('http://localhost:3000/api/proxy/foradmin/delcat', category_id, {
                headers: {
                    ...adminHeader
                }
            });
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/error/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    getSubcategoriesForVendor: async (req, res) => {
        try {
            const category_id = req.query.category_id;
            const data = await axios.get(`http://localhost:3000/api/proxy/forvendor/getcat`, {
                params: {
                    id: category_id
                },
                headers: {
                    ...vendorHeader
                }
            });
            const depth = data.data[0].category_depth;
            const jsonObj = {
                id: 'subcategories',
                depth: depth,
                htmlBody: htmlBuilder.createSelectForCategoriesVendor(data.data)
            };
            res.json(jsonObj);
        } catch (err) {
            if (err instanceof TypeError) {}
            else if (err.response && err.response.status === 403) {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                console.log(err);
            }
        }
    },

    deleteProdsProxyCtrl: async (req, res) => {
        const body = {prodid: parseInt(req.body.prodid)};
        try {
            const response = await axios.post('http://localhost:3000/api/proxy/forvendor/deleteproduct', body, {
                headers: {
                    ...vendorHeader
                }
            });
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/error/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    postProdData: async (req, res) => {
        const body = {...req.body};
        try {
            const response = await axios.post('http://localhost:3000/api/proxy/forvendor/postnewprod', body, {
                headers: {
                    ...vendorHeader
                }
            });
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            deleteFolderorInsertDb(body.folderpath);
            if (err.response && err.response.status === 403) {
                res.redirect('/error/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    postNewAdminCredentials: async (req, res) => {
        const body = req.body;
        try {
            const response = await axios.post('http://localhost:3000/api/proxy/foradmin/postadmincredentials', body, {
                headers: {
                    ...adminHeader
                }
            });
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/error/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    postVendorApprovalStatus: async (req, res) => {
        const body = req.body;
        try {
            if(body.submit === '1') {
                const response = await axios.post('http://localhost:3000/api/proxy/foradmin/appven', {id: body.id}, {
                    headers: {
                        ...adminHeader
                    }
                });
                req.flash(response.data.type, response.data.message);
                res.redirect(response.data.redirectLink);
            } else if(body.submit === '2') {
                const response = await axios.post('http://localhost:3000/api/proxy/foradmin/rejven', {id: body.id}, {
                    headers: {
                        ...adminHeader
                    }
                });
                req.flash(response.data.type, response.data.message);
                res.redirect(response.data.redirectLink);
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/error/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    temp: async (req, res) => {
        const files = req.files ? req.files.map(file => ({ buffer: file.buffer, mimetype: file.mimetype})) : [];
        const body = {...req.body, files};
        console.log(body);
    }
}