// Imports
const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const apiRouter = require("./routes/api.js");

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
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// Routes
app.use("/api", apiRouter);

// Error handler
// TODO: Implement a general error handler
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// Server Listener
app.listen(process.env.PORT, () => {
  console.log("SERVER HAS STARTED");
});
