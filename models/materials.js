const mongoose = require("mongoose");

const materialsSchema = new mongoose.Schema({
  type: {
    type: "String",
    enum: ["PLA", "PETG", "TPU"],
  },
  color: String,
  weight_remaining: Number,
  spool_size: { type: Number, default: 1000 },
  status: {
    type: String,
    enum: ["Available", "Low", "Out of Stock"],
  },
});

const Material = mongoose.model("Material", materialsSchema, "materials");

module.exports = Material;
