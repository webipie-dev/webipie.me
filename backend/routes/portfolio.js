const express = require('express');
const router = express.Router();
const portfolioService = require('../services/portfolio');
const handleErrors = require("./error-handling");

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const portfolioValidator = require("../middlewares/validation/portfolio-validator");
const passportJWT = passport.authenticate('jwt', { session: false });

// getPortfoliobyId
router.get('/:id', [
  validation.id
], validateRequest, handleErrors(portfolioService.getOnePortfolio))

router.get('/url/:url', handleErrors(portfolioService.getPortfolioByUrl));

router.get('/all/urls', handleErrors(portfolioService.getPortfolioUrls));

router.get('/all/names', portfolioService.getPortfolioNames);

// addPortfolio
router.post('', passportJWT, [
    portfolioValidator.templateId,
    portfolioValidator.name
], validateRequest, portfolioService.addPortfolio);

// edit portfolio
router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , handleErrors(portfolioService.editPortfolio));

// edit portfolio design
router.patch('/template/:id', passportJWT, [
    validation.id
], validateRequest, portfolioService.editPortfolioDesign)

// change template of portfolio
router.patch('/change-template/:id', passportJWT, handleErrors(portfolioService.changeTemplate));


module.exports = router;

