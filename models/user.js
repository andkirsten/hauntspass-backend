const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const validator = require("validator");

const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [30, "Name must be no more than 30 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("No user with this email");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Invalid password");
        }
        return user;
      });
    });
};

const User = mongoose.model("user", userSchema);

module.exports = User;
