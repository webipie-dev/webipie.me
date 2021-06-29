const express = require('express');
const router = express.Router();
const templateService = require('../services/template');

// const passport = require('passport');
// const validateRequest = require("../middlewares/validate-request");
// const validation = require("../middlewares/validation/validator");
// const passportJWT = passport.authenticate('jwt', { session: false });

//get all templates
router.get('', templateService.getTemplates);