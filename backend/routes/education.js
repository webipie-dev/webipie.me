const express = require('express');
const router = express.Router();
const educationService = require('../services/education');
const handleErrors = require("./error-handling");

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });

//get education
router.get('', educationService.getEducation)

// add education
router.post('', passportJWT, [validation.portfolioId], validateRequest, educationService.addEducation);

// edit education
router.patch('/:id', passportJWT, validateRequest, educationService.editOneEducation);

// delete education
router.delete('', validation.ids, passportJWT, handleErrors(educationService.deleteEducation));


module.exports = router;
