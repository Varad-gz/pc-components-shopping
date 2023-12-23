require('dotenv').config()

const adminHeader = {
    'x-user': 'admin',
    'x-backendnumber' : process.env.ADMIN_PROXY_CHECK
};

const vendorHeader = {
    'x-user': 'vendor',
    'x-backendnumber' : process.env.VENDOR_PROXY_CHECK
};

module.exports = {
    adminHeader,
    vendorHeader
}