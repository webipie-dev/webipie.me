const express = require('express');
const router = express.Router();
const softSkillService = require('../services/soft_skill');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });

//get all soft skills
router.get('', softSkillService.getAllSoftSkills)

//get all soft skills by portfolio ID
router.get('/:portfolioId', passportJWT, [validation.portfolioId], validateRequest, softSkillService.getSoftSkills)

// add soft skills
router.patch('', passportJWT, [validation.portfolioId, validation.ids], validateRequest, softSkillService.addSoftSkills);

// delete Many soft skills
router.delete('', validation.ids, passportJWT, softSkillService.deleteManySoftSkills);

//delete All soft skills
router.delete('/delete', passportJWT, [validation.portfolioId], validateRequest, softSkillService.deleteAllSoftSkills);


module.exports = router;
