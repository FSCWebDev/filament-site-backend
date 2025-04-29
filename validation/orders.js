const Joi = require("joi");

const ordersSchema = Joi.object({
  _id: Joi.string(),
  user_id: Joi.string().required(),
  products: Joi.array().required(),
  total_price: Joi.number().required(),
  total_quantity: Joi.number().required(),
  status: Joi.array()
    .allow(["pending", "printing", "shipped", "delivered"])
    .required(),
  created: Joi.date().required(),
});

module.exports = ordersSchema;
