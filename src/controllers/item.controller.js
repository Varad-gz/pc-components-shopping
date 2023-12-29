const {getProdDetails} = require('../models/product.model');

const fs = require('fs').promises;
const path = require('path');

module.exports = {
    getItemPage: async(req, res) => {
        try {
            const id = req.query.id;
            const data = await getProdDetails(id);
            if(data[0].product_image === 'noimg') {
                data[0].product_image = path.join('images', 'uploads', 'default', 'noimg.png');
            } else {
                const folderPath = path.join('images', 'uploads', data[0].product_image.split('\\').pop());
                let images = await fs.readdir(data[0].product_image);
                for(let i = 0; i < images.length; i++){
                    images[i] = path.join(folderPath, images[i]);
                }
                data[0].product_image = images;
            }
            res.render('content/item', {
                id : id, 
                data : data,
                title: data[0].product_name,
                loggedIn: req.body.loggedIn,
                scripts: ['/scripts/item.public.js']
            });
        } catch(err) {
            console.log(err);
        }
    } 
}