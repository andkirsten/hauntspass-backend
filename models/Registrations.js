const mongoose = require("mongoose");

const registerPassSchema = new mongoose.Schema({
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

const RegisterPass = mongoose.model("registerPass", registerPassSchema);

module.exports = RegisterPass;
