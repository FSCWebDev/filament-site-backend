const Schema = require("mongoose").Schema;

const ordersSchema = new Schema({
  user_id: String,
  products: [],
  total_price: Number,
  total_quantity: Number,
  status: {
    type: String,
    enum: ["pending", "printing", "shipped", "delivered"],
  },
  created: { type: Date, default: Date.now() },
});

module.exports = ordersSchema;
