const Product = require('../../../models/product.model');
const { deleteFolderorInsertDb } = require('../../../utils/deleteUnnecessayUploads');

const fs = require('fs');
const path = require('path');

module.exports = {

    getRootPage : async (req, res) => {
        try {
            const vendorId = req.session.loggedIn.userid;
            const data = await Product.getProdDetailsForVendor(vendorId);
            for (const item of data) {
                if(item.product_image === 'noimg') {
                    item.product_image = path.join('/', 'images', 'uploads', 'default', 'noimg.png');
                } else {
                    let images = await fs.promises.readdir(item.product_image);
                    item.product_image = path.join('/', 'images', 'uploads', item.product_image.split('\\').pop(), images[0]);
                }
            }
            res.render('content/vendor/vendorDashboardContents/removeProducts', {
                title: 'Remove Products',
                goBack : {title : 'Vendor Dashboard', link : '/vendor/dashboard'},
                loggedIn: req.body.loggedIn,
                prods: data
            });
        } catch (err) {
            console.log(err);
        }
    },

    deleteProductWithId : async (req, res) => {
        const productId = req.body.prodid;
        try {
            const path = await Product.getImageFolderPath(productId);
            await Product.deleteProd(productId);
            await deleteFolderorInsertDb(path[0].product_image);
            const resInfo = {
                type: 'alert',
                message: 'Product deleted successfully...',
                redirectLink: 'back'
            }
            res.json(resInfo);
        } catch (err) {
            const resInfo = {
                type: 'alertWithButton',
                message: ['Error Message', 'Process Failed!'],
                redirectLink: 'back'
            }
            res.json(resInfo);
        }
    }

}