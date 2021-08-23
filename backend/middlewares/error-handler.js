const RequestValidationError = require("../errors/request-validation-error");
const ApiError = require('../errors/api-error')
const DatabaseConnectionError = require("../errors/request-validation-error");


const errorHandler = (err, req, res, next) => {
    console.log('something went wrong:', err.message);
    if (err instanceof ApiError) {
        res.status(err.code).send({errors: [{ message: err.message }]})
        return ;
    }

    if (err instanceof RequestValidationError) {
        res.status(err.code).send({
            errors: err.message
        })
        return ;
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    })
}

module.exports = errorHandler
