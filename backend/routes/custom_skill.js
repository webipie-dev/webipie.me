const express = require('express');
const router = express.Router();
const customSkillService = require('../services/custom_skill');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });


// add custom hard skill
router.post('', passportJWT, [validation.portfolioId], validateRequest, customSkillService.addCustomSkills);

// edit custom hard skill
router.patch('/:portfolioId', passportJWT, customSkillService.editOneCustomSkill);

// delete custom hard skills
router.delete('', validation.ids, passportJWT, handleErrors(customSkillService.deleteCustomSkills));


module.exports = router;
