const {getProdDetails} = require('../models/product.model');
const {getCatRootLink} = require('../models/category.model');

const fs = require('fs').promises;
const path = require('path');

module.exports = {
    getItemPage: async(req, res) => {
        try {
            const id = req.query.id;
            const [data] = await getProdDetails(id);
            data.category_link = (await getCatRootLink(data.category_name)).map(item => [item.alt_name, item.category_name]).reverse();

            if(data.product_image === 'noimg') {
                data.product_image = path.join('images', 'uploads', 'default', 'noimg.png');
            } else {
                const folderPath = path.join('images', 'uploads', data.product_image.split('\\').pop());
                let images = await fs.readdir(data.product_image);
                for(let i = 0; i < images.length; i++){
                    images[i] = path.join(folderPath, images[i]);
                }
                data.product_image = images;
            }

            res.render('content/item', {
                id : id, 
                data : data,
                title: data.product_name,
                loggedIn: req.body.loggedIn,
                scripts: ['/scripts/item.public.js']
            });
        } catch(err) {
            console.log(err);
        }
    } 
}