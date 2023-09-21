const mongoose = require("mongoose");

const redemptionSchema = new mongoose.Schema({
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reward",
    unique: false,
  },
  passId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pass",
    unique: false,
  },
  redeemedAt: {
    type: Date,
    default: Date.now,
  },
});

const Redemption = mongoose.model("redemption", redemptionSchema);

module.exports = Redemption;

redemptionSchema.statics.findByPassId = async (passId) => {
  const redemptions = await Redemption.find({ passId });
  return redemptions;
};
