const util = require('util');
const { check }  = require('express-validator');

let projectValidation = {
  /**
   Must pass the following rules:
   is not an empty string
   is a minimum of 2 characters long
   is under 30 characters long
   */
  name: util.promisify(
    check('name')
      .not().isEmpty().withMessage('Name not provided')
      .isLength({ max :200 }).withMessage('name is too long')
  ),

  /**
   Must pass the following rules:
   is not an empty string
   is a minimum of 2 characters long
   is under 50 characters long
   */
  description: util.promisify(
    check('description')
      .not().isEmpty().withMessage('Description not provided')
      .isLength({ max: 5000 }).withMessage('Description is too short or too long')
  ),
};

module.exports = projectValidation;
