const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json());

module.exports = app;
