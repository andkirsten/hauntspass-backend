const express = require("express");
const auth = require("../middlewares/auth");
const {
  getRewards,
  createReward,
  updateReward,
  deleteReward,
} = require("../controllers/rewards");

const router = express.Router();

router.get("/", auth, getRewards);
router.post("/", auth, createReward);
router.patch("/:rewardId", auth, updateReward);
router.delete("/:rewardId", auth, deleteReward);
