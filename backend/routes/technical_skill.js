const express = require('express');
const router = express.Router();
const technicalSkillService = require('../services/technical_skill');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });

//get all technical skills
router.get('', technicalSkillService.getAllTechnicalSkills)

//get all technical skills by portfolio ID
router.get('/:portfolioId', passportJWT, [validation.portfolioId], validateRequest, technicalSkillService.getTechnicalSkills)

// add technical skills
router.post('', passportJWT, [validation.portfolioId], validateRequest, technicalSkillService.addTechnicalSkills);

// delete technical skills
router.delete('', validation.ids, passportJWT, technicalSkillService.deleteTechnicalSkills);

module.exports = router;
