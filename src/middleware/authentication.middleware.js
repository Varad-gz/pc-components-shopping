module.exports = {
    forAdmin: (req, res, next) => {
        if(req.session.loggedIn){
            if(req.session.loggedIn.role === 'admin') {
                next();
            }
        }else {
            res.redirect('/admin/login');
        }
    },

    forUser: (req, res, next) => {
        if(req.session.loggedIn){
            if(req.session.loggedIn.role === 'user') {
                next();
            }
        }else {
            if(req.originalUrl === '/item') {
                const prodLink = req.originalUrl + '?id=' + req.body.itemId;
                req.session.prodLink = prodLink;
            }
            res.redirect('/login');
        }
    },

    forVendor: (req, res, next) => {
        if(req.session.loggedIn){
            if(req.session.loggedIn.role === 'vendor') {
                next();
            }
        }else {
            res.redirect('/vendor/login');
        }
    },
    
    ifAuthenticated: (req, res, next) => {
        if(req.session.loggedIn){
            const loggedIn = [req.session.loggedIn.role, req.session.loggedIn.username];
            req.body.loggedIn = loggedIn;
            if(req.session.loggedIn.role === 'admin') {
                const url = req.originalUrl;
                if(url.startsWith('/admin/dashboard') || url.startsWith('/admin/logout') || url.startsWith('/api/proxy')){
                    next();
                } else {
                    req.flash('logout', '/admin/logout');
                    res.redirect('/admin/dashboard');
                }
            } else if(req.session.loggedIn.role === 'user') {
                const url = req.originalUrl;
                if(url.startsWith('/admin') || url.startsWith('/vendor') ||  url.startsWith('/registration')){
                    req.flash('logout', '/logout');
                    res.redirect('/');
                } else {
                    next();
                }
            } else if(req.session.loggedIn.role === 'vendor') {
                const url = req.originalUrl;
                if(url.startsWith('/vendor/dashboard') || url.startsWith('/vendor/logout') || url.startsWith('/vendor/profile')){
                    next();
                } else {
                    req.flash('logout', '/vendor/logout');
                    res.redirect('/vendor/dashboard');
                }
            }
        } else {
            req.body.loggedIn = [];
            next();
        }
    }
}