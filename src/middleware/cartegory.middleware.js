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
        let depthkeysarr = []
        keys.forEach(element => {
            if(element === `depth${deep}`) {
                deep++;
                depthkeysarr.push(element);
            }
        });
        req.body.category_id = req.body[`depth${deep-1}`];
        depthkeysarr.forEach(element => {
            delete req.body[`${element}`]
        })
        next();
    },
}