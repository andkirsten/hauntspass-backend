const mongoose = require("mongoose");

const redemptionSchema = new mongoose.Schema({
  redemptionId: {
    type: String,
    required: [true, "Please provide the Redemption ID"],
    unique: true,
    lowercase: true,
  },
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reward",
  },
  pass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
  },
  redeemedAt: {
    type: Date,
    default: Date.now,
  },
});

const Redemption = mongoose.model("redemption", redemptionSchema);

module.exports = Redemption;
