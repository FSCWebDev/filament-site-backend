const products = require("express").Router();

products.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

products.post("/", (req, res) => {
  res.json({
    id: "someid",
    title: "sometitle",
    quantity: 0,
  });
});

module.exports = products;
