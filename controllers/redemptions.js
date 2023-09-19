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
  const { rewardId, pass } = req.body;
  Redemptions.create({
    rewardId,
    pass,
  })
    .then((redemption) => {
      res.send({
        _id: redemption._id,
        rewardId: redemption.rewardId,
        pass: redemption.pass,
        redeemedAmt: redemption.redeemedAmt,
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

exports.getRedemption = (req, res, next) => {
  const { redemptionId } = req.params;
  Redemptions.findById(redemptionId)

    .then((redemption) => {
      if (!redemption) {
        next(new BadRequestError("Not Valid Redemption ID"));
      }
      res.send({
        _id: redemption._id,
        rewardId: redemption.rewardId,
        pass: redemption.pass,
        redeemedAmt: redemption.redeemedAmt,
        redeemedAt: redemption.redeemedAt,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Not Valid Redemption ID"));
      }
      next(err);
    });
};

exports.updateRedemption = (req, res, next) => {
  const { redemptionId } = req.params;
  const { redeemedAmt } = req.body;
  Redemptions.findOneAndUpdate({ redemptionId }, { redeemedAmt }).then(
    (redemption) => {
      if (!redemption) {
        next(new BadRequestError("Not Valid Redemption ID"));
      }
      res
        .send({
          _id: redemption._id,
          rewardId: redemption.rewardId,
          pass: redemption.pass,
          redeemedAmt: redemption.redeemedAmt,
          redeemedAt: redemption.redeemedAt,
        })
        .catch((err) => {
          if (err.name === "CastError") {
            next(new BadRequestError("Not Valid Redemption ID"));
          }
          next(err);
        });
    },
  );
};
