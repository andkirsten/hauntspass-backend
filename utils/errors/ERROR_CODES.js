const ERROR_CODES = {
  INVALID_INPUT: {
    status: 400,
    message: "Invalid input",
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    status: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    status: 404,
    message: "Not found",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal server error",
  },
  CONFLICT_ERROR: {
    status: 409,
    message: "Conflict error",
  },
};

module.exports = ERROR_CODES;
