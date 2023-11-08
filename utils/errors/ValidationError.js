class ValidationError extends Error {
  constructor(message = "Validation Error") {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
