module.exports = {

    parseNewCat : (req, res, next) => {
        let body = req.body;
        body.id = parseInt(body.id);
        body.ref = parseInt(body.ref);
        body.depth = parseInt(body.depth);
        req.body = body;
        next();
    }

}