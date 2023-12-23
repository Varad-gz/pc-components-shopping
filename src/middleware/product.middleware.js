const { deleteFolderorInsertDb } = require("../utils/deleteUnnecessayUploads");

module.exports = {
    //add prod
    parseNewProd : (req, res, next) => {
        let body = req.body;
        body.prodPrice = parseInt(body.prodPrice);
        body.prodQuantity = parseInt(body.prodQuantity);
        body.vendorid = parseInt(body.vendorid);
        body.category_id = parseInt(body.category_id);
        if(isNaN(body.prodPrice) || isNaN(body.prodQuantity) || isNaN(body.vendorid) || isNaN(body.category_id)) {
            deleteFolderorInsertDb(body.folderpath);
            const resInfo = {
                type: 'alert',
                message: 'Enter valid details...',
                redirectLink: 'back'
            }
            res.json(resInfo);
        } else {
            req.body = body;
            next();
        }
    },
}