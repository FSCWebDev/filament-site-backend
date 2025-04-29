const materials = require("express").Router();
const data = require("../data.json");
const { validateData, findData, createData } = require("../middleware/general");
const materialValidator = require("../validation/materials");
const Material = require("../models/materials");

// TODO: Implement authorization here
materials.get("/", (req, res) => {
  res.json(data);
});

// TODO: Implement authorization here
materials.post(
  "/",
  validateData(materialValidator),
  findData(Material, ["weight_remaining"], ["color", "type"]),
  createData(Material),
  async (req, res) => {
    res.json(req.validatedData);
  }
);

// TODO: Implement authorization here
materials.put("/", (req, res) => {
  res.send("Route works");
});

// TODO: Implement authorization here
materials.patch("/", (req, res) => {
  res.send("Route works");
});

module.exports = materials;
