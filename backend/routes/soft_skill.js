const express = require('express');
const router = express.Router();
const softSkillService = require('../services/soft_skill');
const handleErrors = require("./error-handling");

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });

//get all soft skills
router.get('', handleErrors(softSkillService.getAllSoftSkills))

// add one soft skill to database
router.post('/one', passportJWT, handleErrors(softSkillService.addOneSoftSkill))

//get all soft skills by portfolio ID
router.get('/:portfolioId', passportJWT, [validation.portfolioId], validateRequest, softSkillService.getSoftSkills)

// add soft skills
router.post('', passportJWT, [validation.portfolioId, validation.id], validateRequest, softSkillService.addSoftSkills);

// delete soft skills
router.delete('', validation.ids, passportJWT, handleErrors(softSkillService.deleteSoftSkills));

//delete All soft skills
//router.delete('/delete', passportJWT, [validation.portfolioId], validateRequest, softSkillService.deleteAllSoftSkills);


module.exports = router;
