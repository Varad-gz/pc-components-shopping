const axios = require('axios');
const htmlBuilder = require('../utils/htmlBuilder');
require('dotenv').config()

const adminHeader = {
    headers: {
        'x-user': 'admin',
        'x-backendnumber' : process.env.ADMIN_PROXY_CHECK
    }
};

module.exports = {
    getEditPopup: async (req, res) => {
        const category_id = req.query.category_id;
        try {
            const data = await axios.get('http://localhost:3000/api/proxy/foradmin/getcatedit', {
                params: {
                    id: category_id
                },
                ...adminHeader
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
            const response = await axios.post('http://localhost:3000/api/proxy/foradmin/postcatchanges', body, adminHeader);
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/forbidden-page');
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
                ...adminHeader
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
                ...adminHeader
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
            const response = await axios.post('http://localhost:3000/api/proxy/foradmin/postnewcat', body, adminHeader);
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    deleteCat: async (req, res) => {
        try {
            const category_id = { category_id: req.query.category_id };
            const response = await axios.post('http://localhost:3000/api/proxy/foradmin/delcat', category_id, adminHeader);
            req.flash(response.data.type, response.data.message);
            res.redirect(response.data.redirectLink);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },

    getSubcategoriesForVendor: async (req, res) => {
        console.log('dasdada');
        try {
            const category_id = req.query.category_id;
            const data = await axios.get(`http://localhost:3000/api/proxy/forvendor/getcat`, {
                params: {
                    id: category_id
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
            if (err instanceof TypeError) {
                res.json({id: 'cat'});
            }
        }
    },

    postProdData: async (req, res) => {
        const body = req.body;
        const response = await axios.post('http://localhost:3000/api/proxy/forvendor/postnewprod', body);
        req.flash(response.data.type, response.data.message);
        res.redirect(response.data.redirectLink);
    },

    postVendorApprovalStatus: async (req, res) => {
        const body = req.body;
        try {
            if(body.submit === '1') {
                const response = await axios.post('http://localhost:3000/api/proxy/foradmin/appven', {id: body.id}, adminHeader);
                req.flash(response.data.type, response.data.message);
                res.redirect(response.data.redirectLink);
            } else if(body.submit === '2') {
                const response = await axios.post('http://localhost:3000/api/proxy/foradmin/rejven', {id: body.id}, adminHeader);
                req.flash(response.data.type, response.data.message);
                res.redirect(response.data.redirectLink);
            }
        } catch (err) {
            if (err.response && err.response.status === 403) {
                res.redirect('/forbidden-page');
            } else {
                console.log(err);
            }
        }
    },
}