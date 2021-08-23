const express = require('express');
const router = express.Router();
const achievementService = require('../services/achievement');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });

//get all achievements
router.get('all/portfolioId', [validation.portfolioId], validateRequest, achievementService.getAchievements)

// getAchievementbyId
router.get('/:id', [
  validation.id
], validateRequest, achievementService.getOneAchievement)

// addAchievement
router.post('', passportJWT, [validation.portfolioId,
  validation.description,
  validation.title,
], validateRequest, achievementService.addAchievement);

// deleteManyAchievements
router.delete('', validation.ids, passportJWT, achievementService.deleteManyAchievements);

//deleteAllAchievements
router.delete('/delete', passportJWT, achievementService.deleteAllAchievements);


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , achievementService.editOneAchievement);


module.exports = router;
