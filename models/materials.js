const Schema = require("mongoose").Schema;

const materialsSchema = new Schema({
  type: {
    type: "String",
    enum: ["PLA", "PETG", "TPU"],
  },
  color: String,
  weight_remaining: Number,
  spool_size: Number,
  status: {
    type: String,
    enum: ["Available", "Low", "Out of Stock"],
  },
});

module.exports = materialsSchema;
