const mongoose = require("mongoose");

const User = mongoose.model("User");

let status = 200;
let response = {
  message: null,
  data: null
}

const getUsers = function(req, res) {
  User.find()
    .exec()
    .then((users) => {
      status = 200;
      response = users;
    })
    .catch((error) => {
      status = 500;
      response["message"] = "Something went wrong!";
      response["data"] = error;
    })
    .finally(() => {
      res.status(status).json(response);
    });
}

const createUser = function(req, res) {
  const newUser = req.body;
  User.create(newUser)
    .then((user) => {
      status = 200;
      response["message"] = "User has been created!";
      response["data"] = user;
    })
    .catch((error) => {
      status = 500;
      response["message"] = "User can not be created!";
      response["data"] = error;
    })
    .finally(() => {
      res.status(status).json(response);
    });
}

const authUser = function(req, res) {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        status = 401;
        response["status"] = 401;
        response["message"] = "Username or password doesn't match!";
        return;
      }
      if (user.password !== password) {
        status = 401;
        response["status"] = 401;
        response["message"] = "Username or password doesn't match!";
        return;
      }
      status = 200;
      response["status"] = 200;
      response["message"] = "Log in successful!";
      response["data"] = user;
    })
    .catch((error) => {
      status = 500;
      response["status"] = 500;
      response["message"] = "An error occurred during authentication!";
      delete response["data"];
    })
    .finally(() => {
      res.status(status).json(response);
    });
};

module.exports = {
  createUser,
  getUsers,
  authUser
}