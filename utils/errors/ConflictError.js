const CONFLICT_ERROR = require("./ERROR_CODES");

class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = CONFLICT_ERROR.status;
  }
}

module.exports = ConflictError;
