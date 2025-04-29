const Schema = require("mongoose").Schema;

const productSchema = new Schema({
  title: String,
  description: String,
  base_price: Number,
  available_colors: [],
  image_urls: [],
});

module.exports = productSchema;
