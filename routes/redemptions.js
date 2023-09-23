const express = require("express");
const {
  createRedemption,

  getRedemptions,
} = require("../controllers/redemptions");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("", auth, createRedemption);

router.get("", auth, getRedemptions);

module.exports = router;
