const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().max(30).required(),
  description: Joi.string().max(200).required(),
  base_price: Joi.number().required(),
  available_colors: Joi.array().required(),
  image_urls: Joi.array().required(),
});

module.exports = productSchema;
