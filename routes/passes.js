const express = require("express");
const { createPass, getPass } = require("../controllers/passes");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("", auth, createPass);
router.get("", auth, getPass);

module.exports = router;
