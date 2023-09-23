const Redemptions = require("../models/Redemptions");
const ConflictError = require("../utils/errors");
const BadRequestError = require("../utils/errors");

exports.createRedemption = (req, res, next) => {
  Redemptions.create({
    rewardId: req.body.rewardId,
    passId: req.body.passId,
  })
    .then((redemption) => {
      res.send({
        _id: redemption._id,
        rewardId: redemption.rewardId,
        passId: redemption.passId,
        redeemedAt: redemption.redeemedAt,
      });
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        next(new ConflictError("This redemption already exists"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Not Valid Redemption ID"));
      }
      next(err);
    });
};

exports.getRedemptions = (req, res, next) => {
  Redemptions.findRedemptionsByUser(req.user.id)
    .then((redemptions) => {
      res.json(redemptions);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Not Valid User ID"));
      }
      next(err);
    });
};
