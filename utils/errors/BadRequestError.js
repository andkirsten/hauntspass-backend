const INVALID_INPUT = require("./ERROR_CODES");

class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = INVALID_INPUT.status;
  }
}

module.exports = BadRequestError;
