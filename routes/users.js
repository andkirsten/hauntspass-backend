const express = require("express");
const { signup, login, getCurrentUser } = require("../controllers/users");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, getCurrentUser);

module.exports = router;
