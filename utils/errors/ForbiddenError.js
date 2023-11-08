const FORBIDDEN = require("./ERROR_CODES");

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = FORBIDDEN.status;
  }
}

module.exports = ForbiddenError;
