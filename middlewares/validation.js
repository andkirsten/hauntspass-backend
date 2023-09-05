const { Joi, celebrate } = require("celebrate");

const validateSignup = celebrate({
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

module.exports = { validateSignup, validateLogin };
