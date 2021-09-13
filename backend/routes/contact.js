const {contactUser, contactSupport} = require ('../services/contact')
const express = require('express');

const router = express.Router();


router.post("", contactUser);
router.post("/support", contactSupport);

module.exports = router;
