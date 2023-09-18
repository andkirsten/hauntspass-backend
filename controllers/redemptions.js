const Redemption = require("../models/Redemption");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.redeemReward = (req, res, next) => {
  const { rewardId, pass } = req.body;
  Redemption.create({
    rewardId,
    pass,
  })
    .then((redemption) => {
      res.send({
        _id: redemption._id,
        rewardId: redemption.rewardId,
        pass: redemption.pass,
      });
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        next(
          new ConflictError(
            "This pass has already been used to redeem this reward",
          ),
        );
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Not Valid Redemption ID"));
      }
      next(err);
    });
};
