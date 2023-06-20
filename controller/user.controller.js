const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("User");

const response = {
  status: 200,
  message: null,
  data: null
}

const _setResponse = function(status, message, data = null) {
  response.status  = status;
  response.message  = message;
  response.data  = data;
}

const _sendResponse = function(res) {
  res.status(response.status)
    .json(response);
}

const getUsers = function(req, res) {
  User.find()
    .exec()
    .then((users) => {
      if (users && users.length > 0) {
        _setResponse(200, users.length + " user(s) found!", users);
      } else {
        _setResponse(404, "No user found!", null);
      }
    })
    .catch((error) => {
      _setResponse(500, "Something went wrong!", error);
    })
    .finally(() => {
      _sendResponse(res);
    });
}

const createUser = function(req, res) {
  const newUser = req.body;
  bcrypt.genSalt(12)
    .then((salt) => {
      bcrypt.hash(newUser.password, salt)
        .then((hashedPassword) => {
          newUser.password = hashedPassword;
          User.create(newUser)
            .then((user) => {
              _setResponse(200, "User has been created!", user);
            })
            .catch((error) => {
              console.log(error);
              _setResponse(500, "User can not be created!", error);
            })
        })
        .catch((error) => {
          console.log(error);
          _setResponse(500, "Hash can not be generated", error);
        })
    })
    .catch((error) => {
      console.log(error);
      _setResponse(500, "Salt can not be generated", error);
    })
    .finally(() => {
      _sendResponse(res);
    });
}

const authUser = function(req, res) {
  const reqUser = req.body;
  const response = {
    status: 200,
    message: null,
    data: null
  };
  User.findOne({ username: reqUser.username })
    .then((dbUser) => {
      if (!dbUser) {
        _setResponse(401, "Username or password doesn't match!", null);
      } else {
        bcrypt.compare(reqUser.password, dbUser.password)
          .then((passwordMatch) => {
            if (passwordMatch === true) {
              _setResponse(200, "Log in successful!", dbUser);
            } else {
              _setResponse(401, "Username or password doesn't match!", null);
            }
          })
          .catch((error) => {
            _setResponse(500, "An error occurred during authentication!", null);
          })
          .finally(() => {
            _sendResponse(res);
          });
      }
    })
    .catch((error) => {
      _setResponse(500, "An error occurred during authentication!", null);
    })
};

module.exports = {
  createUser,
  getUsers,
  authUser
}