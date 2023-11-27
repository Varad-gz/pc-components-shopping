const path = require('path');
const fs = require('fs');

module.exports = {

    parseNewProd : (req, res, next) => {
        let body = req.body;
        body.prodPrice = parseInt(body.prodPrice);
        body.prodQuantity = parseInt(body.prodQuantity);
        body.prodImage = copyImage(body.prodImage);
        req.body = body;
        next();
    }
}

const copyImage = (image) => {
    const imageS = path.join('c:/Users/varad/Downloads', image);
    const imageD = path.join('public/images/products', image);
    fs.copyFileSync(imageS, imageD)
    return path.join('/images/products/', image);
}