const Reward = require("../models/Rewards");
const ConflictError = require("../utils/errors");
const BadRequestError = require("../utils/errors");

exports.getRewards = (req, res, next) => {
  Reward.find({})
    .then((rewards) => {
      res.json(rewards);
    })
    .catch(next);
};

exports.createReward = (req, res, next) => {
  const {
    eventId,
    rewardTitle,
    rewardLocation,
    rewardDescription,
    rewardImageUrl,
    rewardExtras,
    rewardTerms,
  } = req.body;
  Reward.create({
    eventId,
    rewardTitle,
    rewardLocation,
    rewardDescription,
    rewardImageUrl,
    rewardExtras,
    rewardTerms,
  })
    .then((reward) => {
      res.send({
        _id: reward._id,
        eventId: reward.eventId,
        rewardTitle: reward.rewardTitle,
        rewardLocation: reward.rewardLocation,
        rewardDescription: reward.rewardDescription,
        rewardImageUrl: reward.rewardImageUrl,
        rewardExtras: reward.rewardExtras,
        rewardTerms: reward.rewardTerms,
      });
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        throw new ConflictError("This reward already exists");
      }
      if (err.name === "ValidationError") {
        throw new BadRequestError("Not Valid Reward ID");
      }
      next(err);
    });
};

exports.updateReward = (req, res, next) => {
  const { rewardId } = req.params;
  const {
    rewardTitle,
    rewardLocation,
    rewardDescription,
    rewardImageUrl,
    rewardExtras,
    rewardTerms,
  } = req.body;
  Reward.findOneAndUpdate(
    { rewardId },
    {
      rewardTitle,
      rewardLocation,
      rewardDescription,
      rewardImageUrl,
      rewardExtras,
      rewardTerms,
    },
    { new: true },
  )
    .then((reward) => {
      res.send({
        _id: reward._id,
        eventId: reward.eventId,
        rewardTitle: reward.rewardTitle,
        rewardLocation: reward.rewardLocation,
        rewardDescription: reward.rewardDescription,
        rewardImageUrl: reward.rewardImageUrl,
        rewardExtras: reward.rewardExtras,
        rewardTerms: reward.rewardTerms,
      });
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        throw new ConflictError("This reward already exists");
      }
      if (err.name === "ValidationError") {
        throw new BadRequestError("Not Valid Reward ID");
      }
      next(err);
    });
};

exports.deleteReward = (req, res, next) => {
  const { rewardId } = req.params;
  Reward.findByIdAndDelete({ rewardId })
    .orFail(() => {
      next(new BadRequestError("Not Valid Reward ID"));
    })
    .then(() => res.send({ message: "Reward Deleted" }))
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        next(new ConflictError("This reward already exists"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Not Valid Reward ID"));
      }
      next(err);
    });
};
