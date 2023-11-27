const adminModel = require('../../models/admin.model');

module.exports = {
    getLoginPage: (req, res) => {
        res.render('content/admin/adminLoginPage', {
            title: 'Admin Login',
            loggedIn: req.body.loggedIn
        });
    },

    getDashboard: (req, res) => {
        res.render('content/admin/adminDashboard', {
            title: 'Admin Dashboard',
            loggedIn: req.body.loggedIn
        })
    },
    
    authenticateUser: async(req, res) => {
        try {
            const {username, email, password} = req.body;
            const arr = await adminModel.checkForAdmin(username, email, password);
            if( arr.length != 0) {
                req.session.loggedIn = {username: username, role: 'admin'}
                req.flash('alert', 'Logged in successfully');
                res.redirect('/admin/dashboard');
            } else {
                req.flash('alert', 'Wrong Credentials');
                res.redirect('/admin/login');
            }
        } catch (err) {
            req.flash('alertWithButton', 'Unknown error occurred while logging in');
            res.redirect('/admin/login');
        }
    },

    logoutAdmin: (req, res) => {
        delete req.session.loggedIn;
        req.flash('alert', 'logged out successfully')
        res.redirect('/admin/login');
    }
}