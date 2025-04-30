const users = require("express").Router();
const userValidator = require("../validation/users");
const Users = require("../models/users");
const {
  validateData,
  findData,
  createData,
  updateData,
  updateOrCreateData,
  deleteData,
} = require("../middleware/general");

users.get("/", async (req, res) => {
  const docs = await Users.find();
  res.send(docs);
});

users.post(
  "/",
  validateData(userValidator),
  findData(Users, ["email", "hash"]),
  createData(Users),
  (req, res) => {
    res.json(req.createdDoc);
  }
);

users.put(
  "/",
  validateData(userValidator),
  findData(Users, ["user_id"]),
  updateOrCreateData(Users),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

users.patch(
  "/",
  validateData(userValidator),
  findData(Users, ["user_id"]),
  updateData(Users),
  (req, res) => {
    res.json(req.foundDoc);
  }
);

users.delete(
  "/",
  validateData(userValidator),
  findData(Users, ["user_id"]),
  deleteData(),
  (req, res) => {
    res.json(req.deletedDoc);
  }
);

module.exports = users;
