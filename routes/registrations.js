const express = require("express");
const { registerPass } = require("../controllers/registrations");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/pass", auth, registerPass);

module.exports = router;
