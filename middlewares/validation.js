const { Joi, celebrate } = require("celebrate");

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.empty": "Name is required",
      "string.max": "Name must be at most 30 characters long",
    }),
    email: Joi.string().required().email().messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
    }),

    password: Joi.string().required().min(8).messages({
      "string.min": "Password must be at least 8 characters long",
      "string.empty": "Password is required",
      "string.max": "Password must be at most 30 characters long",
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": "Please provide a valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": "Password must be at least 8 characters long",
      "string.empty": "Password is required",
      "string.max": "Password must be at most 30 characters long",
    }),
  }),
});

const validatePass = celebrate({
  body: Joi.object().keys({
    donationId: Joi.string().required().messages({
      "string.empty":
        "Please provide the Receipt Reference from your confirmation email",
    }),
    passAmt: Joi.number().required().min(1).messages({
      "number.min": "Pass must include at least 1 person",
      "number.empty":
        "Please enter the number of people your pass will include",
    }),
  }),
});

module.exports = { validateSignup, validateLogin, validatePass };
