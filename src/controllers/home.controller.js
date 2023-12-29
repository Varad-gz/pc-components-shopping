module.exports = {
    getRootPage : (req, res) => {
        res.render('content/home', { 
            title: 'Home Page', 
            loggedIn: req.body.loggedIn,
        });
    }
}