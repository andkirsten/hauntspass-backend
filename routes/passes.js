const express = require("express");
const { createPass, getPass } = require("../controllers/passes");
const auth = require("../middlewares/auth");
const { validatePass } = require("../middlewares/validation");

const router = express.Router();

router.post("", auth, validatePass, createPass);
router.get("", auth, getPass);

module.exports = router;
