const {contactUser} = require ('../services/contact')
const express = require('express');

const router = express.Router();


router.post("", contactUser);

module.exports = router;
