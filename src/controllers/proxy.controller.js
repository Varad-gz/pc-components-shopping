const axios = require('axios');
const htmlBuilder = require('../utils/htmlBuilder');

module.exports = {
    getEditPopup: async (req, res) => {
        const category_id = req.query.category_id;
        const data = await axios.get('http://localhost:3000/api/proxy/foradmin/getcatedit', {
            params: {
                id: category_id
            }
        });
        res.send(htmlBuilder.createEditPopupForCategories(data.data, category_id));
    },

    postEditChanges: async (req, res) => {
        const body = req.body;
        const response = await axios.post('http://localhost:3000/api/proxy/foradmin/postcatchanges', body);
        req.flash(response.data.type, response.data.message);
        res.redirect(response.data.redirectLink);
    },

    getSubcategories: async (req, res) => {
        try {
            const category_id = req.query.category_id;
            const data = await axios.get(`http://localhost:3000/api/proxy/foradmin/getcat`, {
                params: {
                    id: category_id
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
            }
        }
    },

    getAddPopup: async (req, res) => {
        const category_id = req.query.category_id;
        const data = await axios.get('http://localhost:3000/api/proxy/foradmin/getcatadd', {
            params: {
                id: category_id
            }
        });
        res.send(htmlBuilder.createAddPopupForCategories(data.data));
    },

    postNewCategory: async (req, res) => {
        const body = req.body;
        const response = await axios.post('http://localhost:3000/api/proxy/foradmin/postnewcat', body);
        req.flash(response.data.type, response.data.message);
        res.redirect(response.data.redirectLink);
    },

    deleteCat: async (req, res) => {
        const category_id = {
            category_id: req.query.category_id
        };
        const response = await axios.post('http://localhost:3000/api/proxy/foradmin/delcat', category_id);
        req.flash(response.data.type, response.data.message);
        res.redirect(response.data.redirectLink);
    },

    getSubcategoriesForVendor: async (req, res) => {
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
}