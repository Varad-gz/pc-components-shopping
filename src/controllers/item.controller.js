const {getProdDetails} = require('../models/product.model');

module.exports = {
    getItemPage: async(req, res) => {
        try {
            const id = req.query.id;
            const data = await getProdDetails(id);
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