const db = require("../models");
const User = db.users;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) { 
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
  });

  // Save Tutorial in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {};

// Find a single user with an id
exports.findOne = (req, res) => {};

// Update a user by the id in the request
exports.update = (req, res) => {};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {};

// Delete all user from the database.
exports.deleteAll = (req, res) => {};
