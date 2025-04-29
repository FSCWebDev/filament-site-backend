const orders = require("express").Router();

orders.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

orders.post("/", (req, res) => {
  res.json({
    id: "someid",
    userId: "someUserId",
    productId: "someProductId",
  });
});

module.exports = orders;
