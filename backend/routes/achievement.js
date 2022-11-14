const express = require('express');
const router = express.Router();
const achievementService = require('../services/achievement');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const handleErrors = require("./error-handling");
const passportJWT = passport.authenticate('jwt', { session: false });

//get all achievements
router.get('all/portfolioId', [validation.portfolioId], validateRequest, handleErrors(achievementService.getAchievements))

// getAchievementbyId
router.get('/:id', [
  validation.id
], validateRequest, handleErrors(achievementService.getOneAchievement))

// addAchievement
router.post('', passportJWT, [validation.portfolioId,
  validation.description,
  validation.title,
], validateRequest, handleErrors(achievementService.addAchievement));

// deleteManyAchievements
router.delete('', validation.ids, passportJWT, handleErrors(achievementService.deleteManyAchievements));

//deleteAllAchievements
router.delete('/delete', passportJWT, handleErrors(achievementService.deleteAllAchievements));


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , handleErrors(achievementService.editOneAchievement));


module.exports = router;
