const Joi = require("joi");

const usersSchema = Joi.object({
  username: Joi.string().disallow([">", "_", "<", "."]).required(),
  email: Joi.string().email().required(),
  hash: Joi.string().required(),
  role: Joi.string().allow(["buyer", "seller", "admin"]),
  created: Joi.date().required(),
  updated: Joi.date.required(),
});

module.exports = usersSchema;
