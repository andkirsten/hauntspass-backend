const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const ConflictError = require("../utils/errors/ConflictError");
const BadRequestError = require("../utils/errors/BadRequestError");

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      next(new ConflictError("User already exists"));
    }
    if (err.name === "ValidationError") {
      next(new BadRequestError("Incorrect email or password"));
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    })
    .catch((err) => {
      if (err.name === "Error") {
        next(new BadRequestError("Incorrect email or password"));
      }
      next(err);
    });
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    if (err.name === "CastError") {
      next(new BadRequestError("Invalid user ID"));
    }
    next(err);
  }
};
