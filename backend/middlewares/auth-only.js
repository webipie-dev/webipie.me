const jwt_decode = require("jwt-decode");

const config = require('../configuration/index');
const ApiError = require("../errors/api-error");
const {User} = require('../models/user');

authOnly = function (req, res, next) { 
    console.log('aothonly')
    next(); 
};

authOnly = async function (req, res, next) { 
    token = req.headers.authorization;
    let  decoded = jwt_decode(token);
    try {
        // Find the user specified in token
        const user = await User.findById(decoded.sub);

        // If user doesn't exists, handle it
        if (!user) {
        return  next(ApiError.Unauthorized('not authorized'));
        }

        // Otherwise, return the user
        req.user = user;
        next();
    } catch(error) {
        next(ApiError.BadRequest(error));
    }
};

module.exports = authOnly;
