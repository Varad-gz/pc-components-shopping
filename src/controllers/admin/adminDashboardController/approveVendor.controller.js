const vendorModel = require('../../../models/vendor.model');

module.exports = {
    getRoot: async (req, res) => {
        try{
            const vendorInfo = await vendorModel.getVendorDetailsforApproval();
            res.render('content/admin/adminDashboard/approveVendor', {
                title: 'Vendor Approval',
                scripts: ['/scripts/commonFunctions.js'],
                loggedIn: req.body.loggedIn,
                goBack : {title : 'Admin Dashboard', link : '/admin/dashboard'},
                vendorInfo: vendorInfo
            });
        } catch (err) {
            console.log(err);
        }
    },

    rejectVendor: async (req, res) => {
        let id = req.body.id;
        try {
            let response = await vendorModel.getPersonalRefId(id);
            let pid = response[0].personal_info_id;
            await vendorModel.deleteVendor(pid, id);
            const resInfo = {
                type: 'alert',
                message: ['Process Successful', 'Vendor rejected'],
                redirectLink: 'back'
            }
            res.json(resInfo);
        } catch (err) {
            console.log(err);
            const resInfo = {
                type: 'alertWithButton',
                message: ['Error Message', 'Process Failed!'],
                redirectLink: 'back'
            }
            res.json(resInfo);
        }
    },

    approveVendor: async (req, res) => {
        let id = req.body.id;
        try {
            await vendorModel.approveVendor(id);
            const resInfo = {
                type: 'alert',
                message: ['Process Successful', 'Vendor approved'],
                redirectLink: 'back'
            }
            res.json(resInfo);
        } catch (err) {
            const resInfo = {
                type: 'alert',
                message: ['Error Message', 'Process Failed!'],
                redirectLink: 'back'
            }
            res.json(resInfo);
        }
    },
}