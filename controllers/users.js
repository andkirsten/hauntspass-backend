const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hashedPassword) => {
    User.create({
      name,
      email,
      password: hashedPassword,
    })
      .then((user) => {
        res.send({ name, email, _id: user._id });
      })
      .catch((err) => {
        if (err.name === "MongoServerError" && err.code === 11000) {
          next(new ConflictError("This email is already in use"));
        }
        if (err.name === "ValidationError") {
          next(new BadRequestError("Please enter a valid email and password"));
        }
        next(err);
      });
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "Error") {
        next(new UnauthorizedError("Invalid email or password"));
      } else {
        next(err);
      }
    });
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    next(err);
  }
};
