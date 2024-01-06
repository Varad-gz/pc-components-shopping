
module.exports = {

    getRootPage : async (req, res) => {
        try {
            res.render('content/vendor/vendorDashboardContents/delistedProducts', {
                title: 'Delisted Products',
                goBack : {title : 'Vendor Dashboard', link : '/vendor/dashboard'},
                loggedIn: req.body.loggedIn,
            });
        } catch (err) {
            console.log(err);
        }
    },
    
}