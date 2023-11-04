const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  rewardTitle: {
    type: String,
    required: [true, "Please provide the Reward title"],
    unique: true,
  },
  businessDescription: {
    type: String,
    required: false,
    unique: false,
  },
  offer: {
    type: String,
    required: [true, "Please provide the Reward Description"],
    unique: false,
  },
  imgUrl: {
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
  expirationDate: {
    type: Date,
    required: [true, "Please provide the Reward Expiration Date"],
    unique: false,
  },
});

const Reward = mongoose.model("reward", rewardSchema);

module.exports = Reward;
