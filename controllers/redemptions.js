const Redemption = require("../models/Redemption");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.redeemReward = (req, res, next) => {
  const { redemptionId } = req.body;
  Redemption.create({
    redemptionId,
    rewardId: req.reward._id,
    pass: req.pass._id,
  })
    .then((redemption) => {
      res.send({
        redemptionId,
        rewardId: redemption.rewardId,
        pass: redemption.pass,
      });
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        next(
          new ConflictError(
            "This Redemption ID has already been used to redeem a reward",
          ),
        );
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Not Valid Redemption ID"));
      }
      next(err);
    });
};
