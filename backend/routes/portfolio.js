const express = require('express');
const router = express.Router();
const portfolioService = require('../services/portfolio');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const portfolioValidator = require("../middlewares/validation/portfolio-validator");
const passportJWT = passport.authenticate('jwt', { session: false });

// getPortfoliobyId
router.get('/:id', [
  validation.id
], validateRequest, portfolioService.getOnePortfolio)

router.get('/url/:url', portfolioService.getPortfolioByUrl);

router.get('/all/urls', portfolioService.getPortfolioUrls);

// addPortfolio
router.post('', passportJWT, [
    portfolioValidator.templateId,
], validateRequest, portfolioService.addPortfolio);

// edit portfolio
router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , portfolioService.editPortfolio);

// change template of portfolio
router.patch('/change-template/:id', passportJWT, portfolioService.changeTemplate);


module.exports = router;

