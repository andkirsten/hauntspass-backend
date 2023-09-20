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
  passId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
  },
  redeemedAmt: {
    type: Number,
    required: [
      true,
      "Please enter the number of people you are claiming a reward for now",
    ],
    min: [1, "Pass must include at least 1 person"],
    default: 1,
  },
  redeemedAt: {
    type: Date,
    default: Date.now,
  },
});

const Redemption = mongoose.model("redemption", redemptionSchema);

module.exports = Redemption;
