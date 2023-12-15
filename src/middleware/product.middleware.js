const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    parseNewProd : (req, res, next) => {
        let body = req.body;
        body.prodPrice = parseInt(body.prodPrice);
        body.prodQuantity = parseInt(body.prodQuantity);
        body.vendorid = parseInt(body.vendorid);
        body.category_id = parseInt(body.category_id);
        if(isNaN(body.prodPrice) || isNaN(body.prodQuantity) || isNaN(body.vendorid) || isNaN(body.category_id)) {
            req.flash('alertWithButton', 'Invalid details entered');
            res.redirect('back');
        } else {
            if(typeof body.prodImage === 'string') {
                body.prodImage = [body.prodImage];
            }
            req.body = body;
            next();
        }
    }
}

const copyImage = (image) => {
    const imageS = path.join('c:/Users/varad/Downloads', image);
    const imageD = path.join('public/images/products', image);
    fs.copyFileSync(imageS, imageD)
    return path.join('/images/products/', image);
}