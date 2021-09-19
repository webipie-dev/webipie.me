const util = require('util');
const { check }  = require('express-validator');
const mongoose = require('mongoose');

let portfolioValidation = {
  /**
   Must pass the following rules:
   is not an empty string
   is a minimum of 2 characters long
   is under 30 characters long
   */
  userName: util.promisify(
    check('userName')
      .not().isEmpty().withMessage('Name not provided')
      .isLength({ min: 5 ,max :30}).withMessage('name is too short or too long')
  ),

  /**
   Must pass the following rules:
   is not an empty string
   is a minimum of 2 characters long
   is under 30 characters long
   */
   name: util.promisify(
    check('name')
      .not().isEmpty().withMessage('Name not provided')
      .isLength({ min: 5 ,max :30}).withMessage('name is too short or too long')
  ),

 /**
   Must pass the following rules:
   is a mongoose Id
   */
   templateId: util.promisify(
    check('templateId')
      .custom((input) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('templateId must be valid')
  )
};

module.exports = portfolioValidation;
