const express = require('express');
const router = express.Router();
const testimonialService = require('../services/testimonial');

const passport = require('passport');
const validateRequest = require("../middlewares/validate-request");
const validation = require("../middlewares/validation/validator");
const passportJWT = passport.authenticate('jwt', { session: false });

//get all testimonials
router.get('all/portfolioId', [validation.portfolioId], validateRequest, testimonialService.getTestimonials)

// gettestimonialbyId
router.get('/:id', [
  validation.id
], validateRequest, testimonialService.getOneTestimonial)

// addTestimonial
router.post('', passportJWT, [validation.portfolioId,
   validation.description,
], validateRequest, testimonialService.addTestimonial);

// deleteManyTestimonials
router.delete('', validation.ids, passportJWT, testimonialService.deleteManyTestimonials);

//deleteAllTestimonials
router.delete('/delete', passportJWT, testimonialService.deleteAllTestimonials);


router.patch('/:id', passportJWT, [
  validation.id
], validateRequest , testimonialService.editOneTestimonial);


module.exports = router;
