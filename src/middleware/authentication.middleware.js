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
            res.redirect('/login');
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
                    res.redirect('back');
                }
            } else if(req.session.loggedIn.role === 'user') {
                const url = req.originalUrl;
                if(url.startsWith('/admin') || url.startsWith('/vendor')){
                    req.flash('logout', '/logout');
                    res.redirect('back');
                } else {
                    next();
                }
            }
        } else {
            req.body.loggedIn = [];
            next();
        }
    }
}