module.exports = {
    registrationPage: (req, res) => {
        res.render('content/vendor/vendorRegistrationPage', {
            title: 'Vendor Registration',
            scripts: ['/scripts/registrationPublic.js'],
            loggedIn: req.body.loggedIn
        });
    }
}