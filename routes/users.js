const express = require("express");
const { getCurrentUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/me", auth, getCurrentUser);

module.exports = router;
