const express = require('express');
const router = express.Router();
const customSkillService = require('../services/custom_skill');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });


// add technical skills
router.post('', passportJWT, [validation.portfolioId], validateRequest, customSkillService.addCustomSkills);


module.exports = router;
