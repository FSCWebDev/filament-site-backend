const users = require("express").Router();

users.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

users.post("/", (req, res) => {
  res.json({
    id: "someid",
    userId: "someUserId",
    productId: "someProductId",
  });
});

module.exports = users;
