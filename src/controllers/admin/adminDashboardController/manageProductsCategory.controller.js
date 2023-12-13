//const manageProductCategoryModel = require('../../../models/admin/adminDashboardModels/manageProductsCategory.model');
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
            console.log(err);
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
                redirectLink: '/admin/dashboard'
            }
            res.json(resInfo);
        } catch (err) {
            const resInfo = {
                type: 'alert',
                message: ['Error Message', 'Process Failed!'],
                redirectLink: '/admin/dashboard/manage-category'
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
                redirectLink: '/admin/dashboard'
            }
            res.json(resInfo);
        } catch (err) {
            const resInfo = {
                type: 'alert',
                message: ['Error Message', 'Process Failed!'],
                redirectLink: '/admin/dashboard/manage-category'
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
                redirectLink: '/admin/dashboard'
            }
            res.json(resInfo);
        } catch (err) {
            if(err.code === 'ER_ROW_IS_REFERENCED_2'){
                const resInfo = {
                    type: 'alertWithButton',
                    message: ['Cannot Delete:', 'category includes products and/or subcategories'],
                    redirectLink: '/admin/dashboard/manage-category'
                }
                res.json(resInfo);
            } else {
                console.log(err);
            }
        }
    },

    delistItems: (req, res) => {
        
    }
}
