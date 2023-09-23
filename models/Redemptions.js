const mongoose = require("mongoose");
const pass = require("./pass");

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

redemptionSchema.statics.findRedemptionsByUser = function findRedemptionsByUser(
  userId,
) {
  return pass
    .findPassByUser(userId)
    .then((passId) => {
      if (!passId) {
        return null;
      }
      return this.find({ passId: passId._id }).then((redemptions) => {
        if (!redemptions) {
          return null;
        }
        return redemptions;
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const Redemption = mongoose.model("redemption", redemptionSchema);

module.exports = Redemption;
