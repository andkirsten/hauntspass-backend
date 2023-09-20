const express = require("express");
const { createPass } = require("../controllers/passes");
const auth = require("../middlewares/auth");
const { validatePass } = require("../middlewares/validation");
const {
  createRedemption,
  updateRedemption,
  getRedemption,
} = require("../controllers/redemptions");

const router = express.Router();

router.post("", auth, validatePass, createPass);

router.post("/:passId/", auth, createRedemption);
router.patch("/:passId/:rewardId", auth, updateRedemption);
router.get("/:passId/:rewardId", auth, getRedemption);

module.exports = router;
