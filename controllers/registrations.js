const RegisterPass = require("../models/Registrations");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.registerPass = (req, res, next) => {
  console.log(req.body);
  const { donationId, passAmt } = req.body;

  this.verifyJustGivingId(donationId)
    .then((donation) => {
      if (donation) {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  RegisterPass.create({
    donationId,
    passAmt,
    user: req.user._id,
    eventId: "6508f51dcbfd4972a366a5b1",
  })
    .then((pass) => {
      res.send({
        passAmt: pass.passAmt,
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

exports.verifyJustGivingId = () =>
  // to do: call JustGiving API to verify donationId
  true;
