const adminModel = require('../../../models/admin.model');

module.exports = {
    getRoot: (req, res) => {
        try{
            res.render('content/admin/adminDashboard/addNewAdministrator', {
                title: 'Add New Administrators',
                loggedIn: req.body.loggedIn,
                goBack : {title : 'Admin Dashboard', link : '/admin/dashboard'},
            });
        } catch (err) {
            console.log(err);
        }
    },

    postAdminCredentials: async (req, res) => {
        const body = req.body;
        try{
            if(body.username === "defadmin") {
                throw Error("Invalid Username: Cannot set username to 'defadmin'.");
            }
            if((await adminModel.checkIfEmailExists(body.email))[0].adminexists === 0) {
                const adminObj = new adminModel.Admin(body);
                await adminObj.add();
                const resInfo = {
                    type: 'alert',
                    message: 'Admin Created Successfully',
                    redirectLink: '/admin/dashboard'
                }
                res.json(resInfo);
            } else {
                const resInfo = {
                    type: 'alertWithButton',
                    message: 'Email already exists!',
                    redirectLink: '/admin/dashboard/add-new-admin'
                }
                res.json(resInfo);
            }
        } catch (err) {
            const resInfo = {
                type: 'alertWithButton',
                message: ['Process Failed:', err.message],
                redirectLink: '/admin/dashboard/add-new-admin'
            }
            res.json(resInfo);
        }
    },
}