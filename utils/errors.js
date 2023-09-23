const BadRequestError = (message) => ({
  name: "BadRequestError",
  statusCode: 400,
  message,
});

const ForbiddenError = (message) => ({
  name: "ForbiddenError",
  statusCode: 403,
  message,
});

const ConflictError = (message) => ({
  name: "ConflictError",
  statusCode: 409,
  message,
});

const NotFoundError = (message) => ({
  name: "NotFoundError",
  statusCode: 404,
  message,
});

const UnauthorizedError = (message) => ({
  name: "UnauthorizedError",
  statusCode: 401,
  message,
});

module.exports = {
  BadRequestError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
};
