module.exports = {

    parseNewCat : (req, res, next) => {
        let body = req.body;
        body.id = parseInt(body.id);
        body.ref = parseInt(body.ref);
        body.depth = parseInt(body.depth);
        req.body = body;
        next();
    },

    getLowestDepth: (req, res, next) => {
        const keys = Object.keys(req.body);
        let deep = 0;
        keys.forEach(element => {
            if(parseInt(element) > deep) {
                deep = parseInt(element);
            }
        });
        const cat = deep.toString();
        req.body.category_id = parseInt(req.body[cat]);
        next();
    },

    parseCatIdName: (req, res, next) => {
        const catarr = (req.body.category).split(';;');
        req.body.category_id = catarr[0];
        req.body.category_name = catarr[1];
        delete req.body.category;
        next();
    }

}