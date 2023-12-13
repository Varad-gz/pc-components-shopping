const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const bodyParser = require('body-parser')
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const flash = require('express-flash');
const {flashThis} = require('./src/middleware/flashMessage');

const routes = require('./src/routes/route');
const cors = require('cors');

app.use(cors({credentials: true, origin: `http://localhost:${process.env.PORT}`}))

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/stylesheet')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(cookieParser());

app.use(session({
    secret: 'hellopcs',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use(flashThis);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/temp', (req, res) => {
    console.log(req.body);
})

app.use(routes);

app.listen(process.env.PORT || 3000, (err) => {
    if(err) throw err
    console.log(`The server is running.... http://localhost:${process.env.PORT}/`)
});
