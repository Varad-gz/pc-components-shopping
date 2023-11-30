const vendorModel = require('../../models/vendor.model');
const { comparePassword } = require('../../utils/passwordOperations');

module.exports = {
    getRegistrationPage: (req, res) => {
        res.render('content/vendor/vendorRegistrationPage', {
            title: 'Vendor Registration',
            scripts: ['/scripts/registrationPublic.js'],
            loggedIn: req.body.loggedIn
        });
    },

    getLoginPage: (req, res) => {
        res.render('content/vendor/vendorLoginPage', {
            title: 'Vendor Login',
            loggedIn: req.body.loggedIn
        });
    },

    getDashboard: (req, res) => {
        res.render('content/vendor/vendorDashboard', {
            title: 'Vendor Dashboard',
            loggedIn: req.body.loggedIn
        })
    },

    registerTheUser: async(req, res) => {
        try {
            const user  = req.body;
            const vendorObj = new vendorModel.Vendor(user);
            await vendorObj.addUser(await vendorObj.addPersonalDetails());
            req.flash('alert', 'Successfully registered');
            res.redirect('/vendor/login');
        } catch (err) {
            console.log(err);
            req.flash('alertWithButton', 'Unknown error occurred while registering');
            res.redirect('/vendor/registration');
        }
    },

    authenticateVendor: async(req, res) => {
        try {
            const email = req.body.email;
            const org = req.body.org;
            const vendor = await vendorModel.getVendorDetails(email);
            if(await comparePassword(req.body.password, vendor[0].vendor_password) === true) {
                if(vendor[0].is_approved === 0) {
                    req.flash('alertWithButton', 'Your profile has not yet been approved by the admin team. Try later...');
                    res.redirect('/');
                } else {
                    req.session.loggedIn = {userid: vendor[0].vendor_id, username: org, role: 'vendor'}
                    req.flash('alert', 'Logged in successfully');
                    res.redirect('/vendor/dashboard');
                }
            } else {
                req.flash('alertWithButton', 'Incorrect password');
                res.redirect('/vendor/login');
            }
        } catch (err) {
            console.log(err);
            req.flash('alertWithButton', 'Unknown error occurred while logging in');
            res.redirect('/vendor/login');
        }
    },

    logout: (req, res) => {
        delete req.session.loggedIn;
        req.flash('alert', 'logged out successfully')
        res.redirect('/vendor/login');
    }
}