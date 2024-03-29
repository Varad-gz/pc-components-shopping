const Category = require('../../../models/category.model');

module.exports = {

    getRoot : async (req, res) => {
        try{
            const rootCat = await Category.getRootCategory();
            res.render('content/admin/adminDashboard/manageProductsCategory', {
                title: 'Manage Categories',
                scripts: ['/scripts/manageProductsPublic.js', '/scripts/commonFunctions.js'],
                loggedIn: req.body.loggedIn,
                goBack : {title : 'Admin Dashboard', link : '/admin/dashboard'},
                rootCat: rootCat
            });
        } catch (err) {
            console.log(err);
        }
    },

    getCat : async (req, res) => {
        try {
            const catId = req.query.id;
            const cat = await Category.getCategoriesWithRef(catId);
            res.send(cat);
        } catch (err) {
            throw err;
        }
    },

    getCatForEdit : async (req, res) => {
        try {
            const catId = req.query.id;
            const cat = await Category.getCategoryInfo(catId);
            res.send(cat);
        } catch (err) {
            throw err;
        }
    },

    applyEditChanges : async (req, res) => {
        try {
            const catObj = req.body;
            let editCat = new Category.Category(catObj);
            await editCat.update();
            const resInfo = {
                type: 'alert',
                message: 'Category updated successfully...',
                redirectLink: 'back'
            }
            res.json(resInfo);
        } catch (err) {
            let message;
            if(err.code === 'ER_DUP_ENTRY'){
                message = 'category name must be unique!';
            } else {
                message = err.message;
            }
            const resInfo = {
                type: 'alertWithButton',
                message: ['Error Message:', message],
                redirectLink: 'back'
            }
            res.json(resInfo);
        }
    },

    addNewCategory : async (req, res) => {
        try {
            const catObj = req.body;
            let newCat = new Category.Category(catObj);
            if(catObj.depth === 0){
                await newCat.add();
            } else{
                await newCat.addWithRef();
            }
            const resInfo = {
                type: 'alert',
                message: 'Category added successfully...',
                redirectLink: 'back'
            }
            res.json(resInfo);
        } catch (err) {
            let message;
            if(err.code === 'ER_DUP_ENTRY'){
                message = 'category name must be unique!';
            } else {
                message = err.message;
            }
            const resInfo = {
                type: 'alertWithButton',
                message: ['Error Message:', message],
                redirectLink: 'back'
            }
            res.json(resInfo);
        }
    },

    delistIfExistsAddCat : async (req, res) => {
        try {
            const body = req.body;
            const [rows] = await Category.doesThisCatHaveProducts(body.ref);
            const newCat = new Category.Category(body);
            if(rows.prodcount > 0) {
                await newCat.delistProdsAndAddWithRef();
            } else {
                await newCat.addWithRef();
            }
            const resInfo = {
                type: 'alert',
                message: 'Category added successfully...',
                redirectLink: 'back'
            }
            res.json(resInfo);
        } catch (err) {
            let message;
            if(err.code === 'ER_DUP_ENTRY'){
                message = 'category name must be unique!';
            } else {
                message = err.message;
            }
            const resInfo = {
                type: 'alertWithButton',
                message: ['Error Message:', message],
                redirectLink: 'back'
            }
            res.json(resInfo);
        }
    },


    getCatForAdd : async (req, res) => {
        try {
            const catId = req.query.id;
            const cat = await Category.getCategoryInfo(catId);
            res.send(cat);
        } catch (err) {
            console.log(err);
        }
    },

    deleteConditions : async (req, res) => {
        try {
            const catId = req.body.category_id;
            await Category.deleteCategory(catId);
            const resInfo = {
                type: 'alert',
                message: 'Category deleted successfully...',
                redirectLink: 'back'
            }
            res.json(resInfo);
        } catch (err) {
            let message;
            if(err.code === 'ER_ROW_IS_REFERENCED_2'){
                message = 'category includes products and/or subcategories';
            } else {
                message = err.message;
            }
            const resInfo = {
                type: 'alertWithButton',
                message: ['Error Message:', message],
                redirectLink: 'back'
            }
            res.json(resInfo);
        }
    },
}
