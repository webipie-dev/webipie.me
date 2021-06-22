const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');

app.use(cors());

app
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json())
    .use('/user', userRoutes)
    .use('/project', projectRoutes);

module.exports = app;
