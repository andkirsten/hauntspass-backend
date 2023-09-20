const mongoose = require("mongoose");

const PassSchema = new mongoose.Schema({
  donationId: {
    type: String,
    required: [
      true,
      "Please provide the Receipt Reference from your confirmation email",
    ],
    unique: true,
    lowercase: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

PassSchema.statics.findByUser = function findPassByUser(user) {
  return this.findOne({ user })
    .populate("user")
    .then((pass) => {
      if (!pass) {
        return null;
      }
      return pass;
    });
};

const Pass = mongoose.model("Pass", PassSchema);

module.exports = Pass;
