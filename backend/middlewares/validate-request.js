const RequestValidationError = require("../errors/request-validation-error");
const {validationResult} = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(RequestValidationError.BadRequest(errors.array()));
  }
  next();
}

module.exports = validateRequest;
