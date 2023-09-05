const crypto = require("crypto");
require("dotenv").config();

const generateJWTSecret = () => {
  const byteLength = 32;
  return crypto.randomBytes(byteLength).toString("hex");
};

const JWT_SECRET = process.env.JWT_SECRET || generateJWTSecret();

module.exports = { JWT_SECRET };
