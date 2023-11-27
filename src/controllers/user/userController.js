const userModel = require('../../models/user/user.model');
const passwordOperations = require('../../utils/passwordOperations');

module.exports = {
    registerTheUser: async(req, res) => {
        try {
            const user  = req.body;
            if((await userModel.checkUserExists(user.email)).length === 0) {
                const userObj = new userModel.User(user);
                await userObj.addUser(await userObj.addPersonalDetails());
                req.flash('alert', 'Successfully registered');
                res.redirect('/login');
            } else {
                req.flash('alertWithButton', 'Email already exists!');
                res.redirect('/registration');
            }
        } catch (err) {
            req.flash('alertWithButton', 'Unknown error occurred while registering');
            res.redirect('/registration');
        }
    },

    authenticateUser: async(req, res) => {
        try {
            const hash = await userModel.checkUserExists(req.body.email);
            if(hash.length === 0) {
                req.flash('alertWithButton', 'No such email registered');
                res.redirect('/login');
            } else if(await passwordOperations.comparePassword(req.body.password, hash[0].password) === true) {
                req.flash('alert', 'Logged in successfully');
                res.redirect('/');
            } else {
                req.flash('alertWithButton', 'Incorrect password');
                res.redirect('/login');
            }
        } catch (err) {
            req.flash('alertWithButton', 'Unknown error occurred while logging in');
            res.redirect('/login');
        }
    }
}