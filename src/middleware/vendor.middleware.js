const vendorModel = require('../models/vendor.model');

module.exports = {
    ifEmailExists: async (req, res, next) => {
        try {
            if((await vendorModel.checkEmailExists(req.body.email)).length > 0) {
                req.flash('alertWithButton', 'Email already exists!');
                res.redirect('/vendor/registration');
            } else {
                next();
            }
        } catch (err) {
            req.flash('alertWithButton', 'Unknown error occurred while registering');
            res.redirect('/vendor/registration');
        }
    },

    ifOrgExists: async (req, res, next) => {
        try {
            if((await vendorModel.checkOrgExists(req.body.orgName)).length > 0) {
                req.flash('alertWithButton', 'Organization name already exists!');
                res.redirect('/vendor/registration');
            } else {
                next();
            }
        } catch (err) {
            req.flash('alertWithButton', 'Unknown error occurred while registering');
            res.redirect('/vendor/registration');
        }
    },

    isApproved: async (req, res, next) => {
        try {
            const result = await vendorModel.getIsApproved(req.body.email);
            if(result[0].is_approved === 0) {
                req.flash('alertWithButton', 'Your profile has not yet been approved by the admin team. Try later...');
                res.redirect('/');
            } else {
                next();
            }
        } catch (err) {
            req.flash('alertWithButton', 'Unknown error occurred while logging in');
            res.redirect('/vendor/login');
        }
    },

    doesEmailExist: async (req, res, next) => {
        try {
            if((await vendorModel.checkEmailExists(req.body.email)).length > 0) {
                next();
            } else {
                req.flash('alertWithButton', 'Email does not exist!');
                res.redirect('/vendor/login');
            }
        } catch (err) {
            console.log(err);
            req.flash('alertWithButton', 'Unknown error occurred while registering');
            res.redirect('/vendor/login');
        }
    },

    doesOrgExist: async (req, res, next) => {
        try {
            if((await vendorModel.checkOrgExists(req.body.org)).length > 0) {
                next();
            } else {
                req.flash('alertWithButton', 'Organization name does not exist!');
                res.redirect('/vendor/login');
            }
        } catch (err) {
            req.flash('alertWithButton', 'Unknown error occurred while registering');
            res.redirect('/vendor/login');
        }
    },
}