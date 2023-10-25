const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const bodyParser = require('body-parser')

const homeRoute = require('./src/routes/home.route');
const productsRoute = require('./src/routes/products.route');
const itemRoute = require('./src/routes/item.route');
const vendor_dashboard = require('./src/routes/vendorDashboard.route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute);
app.use('/products', productsRoute);
app.use('/item', itemRoute);
app.use('/add_product', vendor_dashboard)

app.listen(process.env.PORT || 3000, (err) => {
    if(err) throw err
    console.log(`The server is running.... http://localhost:${process.env.PORT}/`)
});
