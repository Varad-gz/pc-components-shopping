const itemModel = require('../models/item.model');

exports.getItemPage = async(req, res) => {
    try {
        const id = req.params.id;
        const itemPage = await itemModel.getProduct(id);
        res.render('item', {id : id, data : itemPage});
    } catch(err) {
        console.log(err);
    }
}