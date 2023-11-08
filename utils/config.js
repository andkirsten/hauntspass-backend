require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const mongoServerAddress = "mongodb://127.0.0.1:27017/haunts";

module.exports = { mongoServerAddress, JWT_SECRET };
