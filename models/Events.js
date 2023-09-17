const mongoose = require("mongoose");

const eventIdSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: [true, "Please provide the Event ID"],
    unique: true,
    lowercase: true,
  },
  eventName: {
    type: String,
    required: [true, "Please provide the Event Name"],
    unique: false,
    lowercase: true,
  },
});

const Event = mongoose.model("event", eventIdSchema);

module.exports = Event;
