const mongoose = require("mongoose");
const pass = require("./pass");
const BadRequestError = require("../utils/errors/BadRequestError");

const redemptionSchema = new mongoose.Schema({
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reward",
  },
  passId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pass",
  },
  redeemedAt: {
    type: Date,
    default: Date.now,
  },
});

redemptionSchema.statics.findRedemptionsByUser = function findRedemptionsByUser(
  userId,
) {
  return pass.findPassByUser(userId).then((passId) => {
    if (!passId) {
      return null;
    }
    return this.find({ passId: passId._id }).then((redemptions) => {
      if (!redemptions) {
        return null;
      }
      return redemptions;
    });
  });
};

redemptionSchema.index({ rewardId: 1, passId: 1 }, { unique: true });

redemptionSchema.pre("save", async function checkExistingRedemption(next) {
  try {
    const existingRedemption = await this.constructor.findOne({
      rewardId: this.rewardId,
      passId: this.passId,
    });

    if (existingRedemption) {
      return next(new BadRequestError("You have already redeemed this reward"));
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

const Redemption = mongoose.model("redemption", redemptionSchema);

module.exports = Redemption;
