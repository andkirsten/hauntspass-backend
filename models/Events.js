const mongoose = require("mongoose");

const eventIdSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, "Please provide the Event Name"],
    unique: true,
    lowercase: true,
  },
});

const Event = mongoose.model("event", eventIdSchema);

module.exports = Event;
