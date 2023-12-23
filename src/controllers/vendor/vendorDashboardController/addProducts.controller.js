//const addProductsModel = require('../../../models/vendor/vendorDashboardModels/addProducts.model')
const {getRootCategory, getCategoriesWithRef} = require('../../../models/category.model');
const {Product} = require('../../../models/product.model');
const { deleteFolderorInsertDb } = require('../../../utils/deleteUnnecessayUploads')

module.exports = {

    // This will get category list in the add products menu
    getRootPage : async (req, res) => {
        try {
            const vendorId = req.session.loggedIn.userid;
            const rootCat = await getRootCategory();
            res.render('content/vendor/vendorDashboardContents/addProducts', {
                title: 'Add Product',
                rootCat : rootCat,
                scripts: ['/scripts/addProductsPublic.js'],
                goBack : {title : 'Vendor Dashboard', link : '/vendor/dashboard'},
                loggedIn: req.body.loggedIn,
                vid: vendorId
            });
        } catch (err) {
            console.log(err);
        }
    },

    getCat : async (req, res) => {
        try {
            const catId = req.query.id;
            const cat = await getCategoriesWithRef(catId);
            res.send(cat);
        } catch (err) {
            console.log(err);
        }
    },

    /*addProduct : async (req, res) => {
        
         * Ensure that the paths in the code below are correct. 
         * All paths for image transfers are hardcoded, 
         * with the source being the 'Downloads' folder and the destination being the 'public/uploads' folder.
         * 
        let body = req.body;
        let sourceAbsPaths = []
        const folderName = uuidv4();
        const destinationAbsPath = path.join('D:', 'TYBBACA Ecommerce Project', 'find_comp_components', 'public', 'images', 'uploads', folderName);
        if (!fs.existsSync(destinationAbsPath)) {
            fs.mkdirSync(destinationAbsPath);
        }
        body.prodImage.forEach(element => {
            sourceAbsPaths.push(path.join('C:', 'Users', 'varad', 'Downloads', element));
        });
        body.prodImage = destinationAbsPath;
        try {
            for (const source of sourceAbsPaths) {
                await fs.promises.copyFile(source, path.join(destinationAbsPath, `${uuidv4()}.${source.split('.').pop()}`));
                console.log(`File copied successfully.`);
            }
            let newProduct = new Product(body);
            await newProduct.add();
            const resInfo = {
                type: 'alert',
                message: 'Product added successfully...',
                redirectLink: '/vendor/dashboard'
            }
            res.json(resInfo);
        } catch (err) {
            fs.rmSync(destinationAbsPath, {recursive: true});
            const resInfo = {
                type: 'alert',
                message: ['Error Message', 'Process Failed!'],
                redirectLink: '/vendor/dashboard/add-product'
            }
            res.json(resInfo);
        }
    }*/

    addProduct : async (req, res) => {
        const body = req.body;
        try {
            const newProduct = new Product(body);
            await newProduct.add();
            const resInfo = {
                type: 'alert',
                message: 'Product added successfully...',
                redirectLink: '/vendor/dashboard'
            }
            res.json(resInfo);
        } catch (err) {
            deleteFolderorInsertDb(body.folderpath);
            const resInfo = {
                type: 'alert',
                message: ['Error Message', 'Process Failed!'],
                redirectLink: '/vendor/dashboard/add-product'
            }
            res.json(resInfo);
        }
    }

}