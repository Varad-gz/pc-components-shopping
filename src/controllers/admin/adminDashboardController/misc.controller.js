const { deleteDefault, checkDefaultExists } = require("../../../models/admin.model");

module.exports = {

    getRoot : (req, res) => {
        res.render('content/admin/adminDashboard/adminMisc', {
            title: 'Miscellaenous',
            loggedIn: req.body.loggedIn,
            goBack : {title : 'Admin Dashboard', link : '/admin/dashboard'},
        });
    },

    deleteDefaultAdmin: async (req, res) => {
        try {
            if(req.body.loggedIn[1] === "defadmin") {
                await deleteDefault();
                delete req.session.loggedIn;
                req.flash('alertWithButton', 'Default credential deleted');
                res.redirect('/admin/login');
            } else {
                throw Error("Deletion is restricted to the default admin only.");
            }
        } catch (err) {
            req.flash('alertWithButton', ['Process Failed', err.message]);
            res.redirect('back');
        }
    }
    
}
