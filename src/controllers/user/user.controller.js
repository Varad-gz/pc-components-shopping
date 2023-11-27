const userModel = require('../../models/user.model');
const passwordOperations = require('../../utils/passwordOperations');

module.exports = {
    getLoginPage: (req, res) => {
        res.render('content/user/userLoginPage', {
            title: 'Login',
            loggedIn: req.body.loggedIn
        });
    },

    getRegistrationPage: (req, res) => {
        res.render('content/user/userRegistrationPage', {
            title: 'Register',
            scripts: ['/scripts/registrationPublic.js'],
            loggedIn: req.body.loggedIn
        });
    },

    getCartPage: (req, res) => {
        res.render('content/user/Cart', {
            title: 'My Cart',
            loggedIn: req.body.loggedIn
        });
    },

    addToCart: async (req, res) => {
        const itemId = req.body.itemId;
        const userId = req.session.loggedIn.userid;
        console.log(itemId, userId);
    },

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
            const user = await userModel.checkUserExists(req.body.email);
            const username = user[0].first_name + ' ' + user[0].last_name;
            if(user.length === 0) {
                req.flash('alertWithButton', 'No such email registered');
                res.redirect('/login');
            } else if(await passwordOperations.comparePassword(req.body.password, user[0].password) === true) {
                req.session.loggedIn = {userid: user[0].customer_id, username: username, role: 'user'}
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
    },

    userLogout: (req, res) => {
        delete req.session.loggedIn;
        req.flash('alert', 'logged out successfully')
        res.redirect('/login');
    }
}