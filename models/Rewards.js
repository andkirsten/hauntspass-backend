const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  rewardId: {
    type: String,
    required: [true, "Please provide the Reward ID"],
    unique: true,
    lowercase: true,
  },
  rewardTitle: {
    type: String,
    required: [true, "Please provide the Reward title"],
    unique: true,
  },
  rewardLocation: {
    type: String,
    required: [true, "Please provide the Reward Location"],
    unique: false,
  },
  rewardDescription: {
    type: String,
    required: [true, "Please provide the Reward Description"],
    unique: false,
  },
  rewardImageUrl: {
    type: String,
    required: [true, "Please provide the Reward Image URL"],
    unique: false,
  },
  rewardExtras: {
    type: String,
    required: [true, "Please provide the Reward Extras"],
    unique: false,
  },
  rewardTerms: {
    type: String,
    required: [true, "Please provide the Reward Terms"],
    unique: false,
  },
});

const Reward = mongoose.model("reward", rewardSchema);

module.exports = Reward;
