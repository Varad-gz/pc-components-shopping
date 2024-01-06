const {getByCatnameRandLimit} = require('../models/product.model');
const {getRootCategory} = require('../models/category.model');

const fs = require('fs');
const path = require('path');

module.exports = {
    getRootPage : async (req, res) => {
        try {
            let prods = [];
            const cats = (await getRootCategory()).map(cat => [cat.category_name, cat.alt_name]);
            for(let i = 0; i < cats.length; i++) {
                const data = await getByCatnameRandLimit(cats[i][0], 5)
                if(data.length != 0) {
                    for (const item of data) {
                        if(item.product_image === 'noimg') {
                            item.product_image = path.join('/', 'images', 'uploads', 'default', 'noimg.png');
                        } else {
                            let images = await fs.promises.readdir(item.product_image);
                            item.product_image = path.join('/', 'images', 'uploads', item.product_image.split('\\').pop(), images[0]);
                        }
                    }
                    let newprod = {};
                    newprod.catName = cats[i][0];
                    newprod.altName = cats[i][1];
                    newprod.data = data;
                    prods.push(newprod);
                }
            }
            res.render('content/home', { 
                title: 'Home Page', 
                loggedIn: req.body.loggedIn,
                products: prods,
                scripts: ['/scripts/home.public.js']
            });
        } catch (err) {
            console.log(err);
        }
    }
}