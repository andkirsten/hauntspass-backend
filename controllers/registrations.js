const RegisterPass = require("../models/Registrations");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.registerPass = (req, res, next) => {
  const { donationId, passAmt } = req.body;
  RegisterPass.create({
    donationId,
    passAmt,
    user: req.user._id,
    eventId: req.event._id,
  })
    .then((pass) => {
      res.send({
        donationId,
        passAmt,
        _id: pass._id,
        user: pass.user,
        eventId: pass.eventId,
      });
    })
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        next(
          new ConflictError(
            "This Receipt Reference has already been used to create a Haunts Pass",
          ),
        );
      }
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Please enter a valid Receipt Reference and number of people for your Haunts Pass",
          ),
        );
      }
      next(err);
    });
};
