const { getSearchedProds } = require("../models/product.model");

module.exports = {
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
    }
}