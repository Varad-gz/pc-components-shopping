module.exports = {
    parseData: (req, res, next) => {
        req.body.zip = parseInt(req.body.zip);
        next();
    }
}