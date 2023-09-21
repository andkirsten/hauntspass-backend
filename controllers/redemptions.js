const Redemptions = require("../models/Redemptions");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.getRedemptions = (req, res, next) => {
  Redemptions.find({})
    .then((redemptions) => {
      res.json(redemptions);
    })
    .catch(next);
};

exports.createRedemption = (req, res, next) => {
  console.log("req.body", req.body);
  Redemptions.create({
    rewardId: req.body.rewardId,
    passId: req.body.passId,
  })
    .then((redemption) => {
      console.log("redemption", redemption);
      res.send({
        _id: redemption._id,
        rewardId: redemption.rewardId,
        passId: redemption.passId,
        redeemedAt: redemption.redeemedAt,
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

exports.getRedemptions = (req, res, next) => {
  Redemptions.find({})
    .then((redemptions) => {
      res.json(redemptions);
    })
    .catch(next);
};
