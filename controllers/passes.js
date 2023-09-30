const axios = require("axios");
const Pass = require("../models/pass");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.getPass = (req, res, next) => {
  Pass.findPassByUser(req.user.id)
    .then((pass) => {
      if (!pass) {
        next(new BadRequestError("Not Valid User ID"));
      }
      res.send({
        id: pass._id,
      });
    })

    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Not Valid User ID"));
      }
      next(err);
    });
};

exports.createPass = (req, res, next) => {
  const { receiptRef } = req.body;
  this.getDonationId(receiptRef)
    .then((donationId) => {
      if (donationId) {
        this.verifyJustGivingId(donationId)
          .then((confirmation) => {
            if (confirmation === true) {
              Pass.create({
                donationId,
                user: req.user.id,
                eventId: "6508f51dcbfd4972a366a5b1",
              })
                .then((pass) => {
                  res.send({
                    id: pass.id,
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
            } else {
              next(
                new BadRequestError(
                  "The donation amount must be at least $25 to recieve a Haunts Pass",
                ),
              );
            }
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch(() => {
      next(new BadRequestError("Please enter a valid Receipt Reference"));
    });
};

// api call to get a DonationId from JustGiving API using the receiptRef that user provides from their confirmation email

exports.getDonationId = (receiptRef) =>
  axios
    .get(`https://api.justgiving.com/8ff4a9f3/v1/donationid/${receiptRef}`)
    .then((res) => {
      if (res) {
        const donationId = res.data.DonationId;
        return donationId;
      }
      return null;
    })
    .catch(() => {
      throw new BadRequestError("Please enter a valid Receipt Reference");
    });

// api call to verify that the donation is valid and that the donation amount is at least $25

exports.verifyJustGivingId = (donationId) =>
  axios
    .get(`https://api.justgiving.com/8ff4a9f3/v1/donation/${donationId}`)
    .then((res) => {
      if (res) {
        const donationAmt = res.data.donorLocalAmount;
        if (donationAmt >= 25) {
          return true;
        }
        return false;
      }
      return null;
    })
    .catch(() => {
      throw new BadRequestError(
        "The donation amount must be at least $25 to recieve a Haunts Pass",
      );
    });
