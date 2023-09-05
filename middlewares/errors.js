const ConflictError = require("../utils/errors/ConflictError");
const NotFoundError = require("../utils/errors/NotFoundError");
const BadRequestError = require("../utils/errors/BadRequestError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const ForbiddenError = require("../utils/errors/ForbiddenError");

const errorHandler = (err, req, res, next) => {
  if (
    err instanceof BadRequestError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError ||
    err instanceof NotFoundError ||
    err instanceof ConflictError
  ) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal server error" });
};

module.exports = { errorHandler };
