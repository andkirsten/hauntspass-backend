require("dotenv").config();

const { JWT_SECRET } = process.env;

const mongoServerAddress = process.env.DB_HOST;

module.exports = { mongoServerAddress, JWT_SECRET };
