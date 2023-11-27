module.exports = {
    getRegistrationPage: (req, res) => {
        res.render('content/vendor/vendorRegistrationPage', {
            title: 'Vendor Registration',
            scripts: ['/scripts/registrationPublic.js'],
            loggedIn: req.body.loggedIn
        });
    },

    getDashboard: (req, res) => {
        res.render('content/vendor/vendorDashboard', {
            title: 'Vendor Dashboard',
            loggedIn: req.body.loggedIn
        })
    }
}