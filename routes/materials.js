const materials = require("express").Router();

materials.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

materials.post("/", (req, res) => {
  res.json({
    id: "someid",
    userId: "someUserId",
    productId: "someProductId",
  });
});

module.exports = materials;
