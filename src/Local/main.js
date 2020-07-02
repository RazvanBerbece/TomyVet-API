/* -------------- Requires & Port init -------------- */

require('dotenv').config();

const express = require('express');

const app = express();
const port = 5001;

const bodyParser = require('body-parser');
const cors = require('cors');

var multer = require('multer');

const emailerImport = require('./Emailer/client');
var upload = multer();

const ShopifyManager = require('./Shopify/mainStoreHandling');

/* -------------- Cors() amd body-parser -------------- */

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* -------------- For parsing multiform data -------------- */

app.use(upload.array()); 
app.use(express.static('public'));

/* -------------- CRUD -------------- */

app.get('/', (req, res) => { // Testing server is listening
    res.json({"200" : "listening..."});
});

app.post('/sendEmail', (req, res) => {
    const Emailer = new emailerImport();
    res.setHeader('Content-Type', 'application/json');
    Emailer.sendMailToTeams(req.body, (successfullySent) => {
        console.log(successfullySent);
        if (successfullySent == 2) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    });
});

app.get('/getAllProducts', (req, res) => {
    const shopifyManager = new ShopifyManager(process.env)
    var productsList = [];
    shopifyManager.getAllProducts((err, products) => {
        if (!err) {
            productsList = products;
        }
        else {
            productsList = undefined;
        }
        if (productsList !== undefined) {
            var dictList = [];
            for (var i in productsList) {
                dictList.push(productsList[i].dictionary);
            }
            res.json({
                "status": 200,
                "products": dictList
            });
        }
        else {
            res.json({"status": 500});
        }
    });
});

/* -------------- Listening -------------- */

app.listen(port, () => console.log(`Server listening on ${port} ...`));