const adminModel = require('../../models/admin.model');
const { comparePassword } = require('../../utils/passwordOperations');

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
        const body = req.body;
        try {
            const result = await adminModel.getLoginDetails(body.email, body.username)
            if(result.length === 0) {
                req.flash('alertWithButton', 'Incorrect username/email');
                res.redirect('/admin/login');
            } else if(await comparePassword(body.password, result[0].password) === true) {
                req.session.loggedIn = {username: body.username, role: 'admin'}
                req.flash('alert', 'Logged in successfully');
                res.redirect('/admin/dashboard');
            } else {
                req.flash('alertWithButton', 'Incorrect password');
                res.redirect('/admin/login');
            }
        } catch (err) {
            console.log(err);
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