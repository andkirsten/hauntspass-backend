const axios = require("axios");
const Pass = require("../models/pass");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.createPass = (req, res, next) => {
  console.log(req.user);
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
                    donationId: pass.donationId,
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
            } else {
              next(
                new BadRequestError(
                  "The donation amount must be at least $20 to recieve a Haunts Pass",
                ),
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
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
    .catch((err) => {
      console.log(err);
    });

// api call to verify that the donation is valid and that the donation amount is at least $15

exports.verifyJustGivingId = (donationId) =>
  axios
    .get(`https://api.justgiving.com/8ff4a9f3/v1/donation/${donationId}`)
    .then((res) => {
      if (res) {
        const donationAmt = res.data.donorLocalAmount;
        if (donationAmt >= 15) {
          return true;
        }
        return false;
      }
      return null;
    })
    .catch((err) => {
      console.log(err);
    });
