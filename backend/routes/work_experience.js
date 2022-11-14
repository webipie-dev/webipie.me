const express = require('express');
const router = express.Router();
const workExperienceService = require('../services/work_experience');
const handleErrors = require("./error-handling");

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });
// passportJWT.unless = require('express-unless');

//get all work experiences
router.get('all/portfolioId', [validation.portfolioId], validateRequest, workExperienceService.getWorkExperiences)

// getWorkexperiencebyId
router.get('/:id', [
  validation.id
], validateRequest, handleErrors(workExperienceService.getOneWorkExperience))

// addWorkexperience
router.post('', passportJWT, [validation.portfolioId,
  validation.description,
//   projectValidator.name,
], validateRequest, workExperienceService.addWorkExperience);

// deleteManyWorkExperiences
router.delete('', validation.ids, passportJWT, handleErrors(workExperienceService.deleteManyWorkExperiences));

//deleteAllWorkExperiences
router.delete('/delete', passportJWT, handleErrors(workExperienceService.deleteAllWorkExperiences));


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , handleErrors(workExperienceService.editOneWorkExperience));


module.exports = router;

