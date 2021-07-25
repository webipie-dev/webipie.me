const express = require('express');
const router = express.Router();
const educationService = require('../services/education');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });

//get education
router.get('', educationService.getEducation)

// add education
router.post('', passportJWT, [validation.portfolioId], validateRequest, educationService.addEducation);

// edit education
router.patch('/:id', passportJWT, [validation.portfolioId], validateRequest, educationService.editOneEducation);

// delete education
router.delete('', validation.ids, passportJWT, educationService.deleteEducation);


module.exports = router;
