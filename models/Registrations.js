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
  passAmt: {
    type: Number,
    required: [
      true,
      "Please enter the number of people your pass will include",
    ],
    min: [1, "Pass must include at least 1 person"],
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
