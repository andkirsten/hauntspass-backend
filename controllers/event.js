const Event = require("../models/Events");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.getEvents = (req, res, next) => {
  Event.find({})
    .then((events) => {
      res.json(events);
    })
    .catch(next);
};

exports.createEvent = (req, res, next) => {
  const { eventName } = req.body;
  Event.create({
    eventName,
  })
    .then((event) => {
      res.send({
        _id: event._id,
        eventName: event.eventName,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Not Valid Event ID"));
      }
      next(err);
    });
};
