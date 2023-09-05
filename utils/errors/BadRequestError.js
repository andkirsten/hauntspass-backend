class BadRequestError extends Error {
  constructor(message = "Bad request") {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
