const UNAUTHORIZED = require("./ERROR_CODES");

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = UNAUTHORIZED.status;
  }
}

module.exports = UnauthorizedError;
