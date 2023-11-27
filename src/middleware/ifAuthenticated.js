module.exports = {
    ifAuthenticated: (req, res, next) => {
        if(req.session.loggedIn){
            const loggedIn = [req.session.loggedIn.role, req.session.loggedIn.username];
            req.body.loggedIn = loggedIn;
            if(req.session.loggedIn.role === 'admin') {
                const url = req.originalUrl;
                if(url.startsWith('/admin/dashboard') || url.startsWith('/admin/logout') || url.startsWith('/api/proxy')){
                    next();
                } else {
                    req.flash('logout', 'Want to log out?');
                    res.redirect('back');
                }
            }
        } else {
            req.body.loggedIn = [];
            next();
        }
    }
}