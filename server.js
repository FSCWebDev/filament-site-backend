// Imports
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const materialRoutes = require("./routes/materials");
const userRoutes = require("./routes/users");

// Configurations
const env = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `.env.${env}` });
const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Mongo Server Has Started"))
  .catch(console.log);

// Middleware being used first
app.use(compression());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Routes
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/materials", materialRoutes);
app.use("/users", userRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).send("<h1>Error has occured.</h1>");
});

// Server Listener
app.listen(process.env.PORT, () => {
  console.log("SERVER HAS STARTED");
});
