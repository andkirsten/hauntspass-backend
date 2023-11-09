const NOT_FOUND = require("./ERROR_CODES");

class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = NOT_FOUND.status;
  }
}

module.exports = NotFoundError;
