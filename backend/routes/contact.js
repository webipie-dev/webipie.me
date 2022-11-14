const {contactUser, contactSupport, contactRequestDomain} = require ('../services/contact')
const express = require('express');

const router = express.Router();


router.post("", contactUser);
router.post("/support", contactSupport);
router.post("/domain-request", contactRequestDomain);

module.exports = router;
