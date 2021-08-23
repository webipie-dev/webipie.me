class RequestValidationError{
    statusCode;
  
    constructor(code,message) {
      this.code = code;
      this.message = message
    }
  
    static BadRequest(msg) {
      const error =  msg.map(err => {
        return { message: err.msg, field: err.param };
      });
      return new RequestValidationError(400, error)
  
    }
  
    static Internal(msg) {
      return new RequestValidationError(500, msg)
    }
  }
  
module.exports = RequestValidationError
