require('dotenv').config()

module.exports = {
    backendLinkAuthenticate: (req, res, next) => {
        if('x-user' in req.headers) {
            if(req.headers['x-user'] === 'admin' && req.headers['x-backendnumber'] === process.env.ADMIN_PROXY_CHECK) {
                next();
            } else if(req.headers['x-user'] === 'vendor' && req.headers['x-backendnumber'] === process.env.VENDOR_PROXY_CHECK) {
                next();
            }
        }
        else {
            if (req.headers['accept'].includes('application/json')) {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                res.redirect('/error/forbidden-page');
            }
        }
    }
}