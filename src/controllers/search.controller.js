const { getSearchedProds } = require("../models/product.model");

const fs = require('fs').promises;
const path = require('path');

module.exports = {
    getProductsByName : async(req, res) => {
        try {
            const name = req.query.s;
            const items = await getSearchedProds(name);
    
            for (const item of items) {
                if(item.product_image === 'noimg') {
                    item.product_image = path.join('/', 'images', 'uploads', 'default', 'noimg.png');
                } else {
                    let images = await fs.readdir(item.product_image);
                    item.product_image = path.join('/', 'images', 'uploads', item.product_image.split('\\').pop(), images[0]);
                }
            }

            res.render('content/search', {
                title: `Search Results '${name}'`, 
                products : items,
                count: items.length,
                loggedIn: req.body.loggedIn,
            });
    
        } catch(err) {
            console.log(err)
        }
    }
}