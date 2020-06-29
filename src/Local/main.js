/* -------------- Requires & Port init -------------- */

const express = require('express');

const app = express();
const port = 5001;

const bodyParser = require('body-parser');
const cors = require('cors');

var multer = require('multer');

const emailerImport = require('./Emailer/client');
var upload = multer();

/* -------------- Cors() amd body-parser -------------- */

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* -------------- For parsing multiform data -------------- */

app.use(upload.array()); 
app.use(express.static('public'));

/* -------------- CRUD -------------- */

app.get('/', (req, res) => { // Testing server is listening
    res.send('Server listening ...')
});

app.post('/sendEmail', (req, res) => {
    const Emailer = new emailerImport();
    console.log(req.body.email);
    const result = Emailer.sendMail(req.body.email);
    res.send(result);
});

/* -------------- Listening -------------- */

app.listen(port, () => console.log(`Server listening on ${port} ...`));