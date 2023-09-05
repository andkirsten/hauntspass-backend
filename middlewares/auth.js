const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      next(new UnauthorizedError("Authorization required"));
    }
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }
};

module.exports = auth;
