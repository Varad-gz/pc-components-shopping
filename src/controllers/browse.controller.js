const {getAll, getByCatname, getSearchedProds, getAllCount, getCountWithCat, getByCatnameRandLimit} = require('../models/product.model');
const {getRootCategory, getCategoriesWithRefName} = require('../models/category.model');

const fs = require('fs');
const path = require('path');

module.exports = {
    getBrowsePage : async(req, res) => {
        try {
            let catdata, items, count, categories = [];
            if(req.query.category != undefined) {
                const catName = req.query.category;
                catdata = (await getCategoriesWithRefName(catName)).map(cat => [cat.category_name, cat.alt_name]);
                items = await getByCatname(catName);
                count = await getCountWithCat(catName);
            } else {
                catdata = (await getRootCategory()).map(cat => [cat.category_name, cat.alt_name]);
                items = await getAll();
                count = await getAllCount();
            }

            for(let i = 0; i < catdata.length; i++) {
                const [data] = await getCountWithCat(catdata[i][0]);
                if(data.prod_count != 0) {
                    let newprod = {};
                    newprod.category_name = catdata[i][0];
                    newprod.alt_name = catdata[i][1];
                    categories.push(newprod);
                }
            }

            for (const item of items) {
                if(item.product_image === 'noimg') {
                    item.product_image = path.join('/', 'images', 'uploads', 'default', 'noimg.png');
                } else {
                    let images = await fs.promises.readdir(item.product_image);
                    item.product_image = path.join('/', 'images', 'uploads', item.product_image.split('\\').pop(), images[0]);
                }
            }

            res.render('content/browse', {
                title: 'Browse', 
                cats : categories, 
                products : items,
                loggedIn: req.body.loggedIn,
                count: count[0].prod_count
            });

        } catch(err) {
            console.log(err)
        }
    },

getProductsByName : async(req, res) => {
    try {
        const name = req.body.prodQuery;
        const items = await getSearchedProds(name);

        res.render('content/browse', {
            title: 'Browse', 
            products : items,
            search: items.length,
            loggedIn: req.body.loggedIn,
            text: name,
        });

    } catch(err) {
        console.log(err)
    }
},

}