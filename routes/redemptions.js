const express = require("express");
const { redeemReward } = require("../controllers/redemptions");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/redeem", auth, redeemReward);

module.exports = router;
