require('dotenv').config()

module.exports = {
    delistProducts: async (req, res, next) => {
        try {
            const body = req.body;
            await axios.post('http://localhost:3000/api/proxy/foradmin/delist', body);
            next();
        } catch (err) {
            throw err;
        }
    },

    backendLinkAuthenticate: (req, res, next) => {
        if('x-user' in req.headers) {
            if(req.headers['x-user'] === 'admin' && req.headers['x-backendnumber'] === process.env.ADMIN_PROXY_CHECK) {
                next();
            }
        }
        else {
            if (req.headers['accept'].includes('application/json')) {
                res.status(403).json({ error: 'Forbidden' });
            } else {
                res.redirect('/forbidden-page');
            }
        }
    }
}