const express = require("express");
const { registerPass } = require("../controllers/registrations");
const auth = require("../middlewares/auth");
const { validatePass } = require("../middlewares/validation");
const { redeemReward } = require("../controllers/redemptions");

const router = express.Router();

router.get("/:passId", auth, validatePass, registerPass);

router.patch("/:passId/:rewardId", auth, redeemReward);

module.exports = router;
