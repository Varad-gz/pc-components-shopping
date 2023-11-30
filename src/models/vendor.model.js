const {pquery} = require('../utils/promisified');

function Vendor(vendorObj) {
    this.orgName = vendorObj.orgName,
    this.email = vendorObj.email,
    this.hash = vendorObj.hash,
    this.ph1= vendorObj.ph1,
    this.ph2= vendorObj.ph2,
    this.add1= vendorObj.add1,
    this.add2= vendorObj.add2,
    this.state= vendorObj.state,
    this.city= vendorObj.city,
    this.zip= vendorObj.zip;
}

Vendor.prototype.addPersonalDetails = async function () {
    const sql_query = `insert into personal_info (phone1, phone2, address_line1, address_line2, city, state, zip) values (?, ?, ?, ?, ?, ?, ?);`;
    const sql_values = [this.ph1, this.ph2, this.add1, this.add2, this.city, this.state, this.zip];
    try{
        const res = await pquery(sql_query, sql_values);
        return res.insertId
    } catch (err) {
        throw err;
    }
}

Vendor.prototype.addUser = async function (personalInfoID) {
    const sql_query = `insert into vendor_table (organization_name, email_id, vendor_password, personal_info_id) values (?, ?, ?, ?);`;
    const sql_values = [this.orgName, this.email, this.hash, personalInfoID];
    try{
        return await pquery(sql_query, sql_values);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    checkEmailExists: async (email) => {
        const sql_query = `select email_id from vendor_table where email_id = ?`;
        const sql_values = [email];
        try{
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    checkOrgExists: async (org) => {
        const sql_query = `select organization_name from vendor_table where organization_name = ?`;
        const sql_values = [org];
        try{
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getIsApproved: async (email) => {
        const sql_query = `select is_approved from vendor_table where email_id = ?`;
        const sql_values = [email];
        try{
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    getVendorDetails: async (email) => {
        const sql_query = `select vendor_id, vendor_password, is_approved from vendor_table where email_id = ?`;
        const sql_values = [email];
        try{
            return await pquery(sql_query, sql_values);
        } catch (err) {
            throw err;
        }
    },

    Vendor: Vendor
}