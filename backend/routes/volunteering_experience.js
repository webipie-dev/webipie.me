const express = require('express');
const router = express.Router();
const volunteeringExperienceService = require('../services/volunteering_experience');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });

//get all volunteering experiences
router.get('all/portfolioId', [validation.portfolioId], validateRequest, volunteeringExperienceService.getVolunteeringExperiences)

// getVolunteeringexperiencebyId
router.get('/:id', [
  validation.id
], validateRequest, volunteeringExperienceService.getOneVolunteeringExperience)

// addVolunteeringexperience
router.post('', passportJWT, [validation.portfolioId,
  validation.description,
//   projectValidator.name,
], validateRequest, volunteeringExperienceService.addVolunteeringExperience);

// deleteManyVolunteeringExperiences
router.delete('', validation.ids, passportJWT, volunteeringExperienceService.deleteManyVolunteeringExperiences);

//deleteAllVolunteeringExperiences
router.delete('/delete', passportJWT, volunteeringExperienceService.deleteAllVolunteeringExperiences);


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , volunteeringExperienceService.editOneVolunteeringExperience);


module.exports = router;

