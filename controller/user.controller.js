const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

const User = mongoose.model("User");

const response = {
  status: process.env.HTTP_RESPONSE_SUCCESS_CODE,
  message: null,
  data: null
}

const _setResponse = function(status, message, data = null) {
  response.status  = parseInt(status, 10);
  response.message  = message;
  response.data  = data;
}

const _sendResponse = function(res) {
  res.status(response.status)
    .json(response);
}

const getUsers = function(req, res) {
  const _validateUsers = function(users) {
    return new Promise((resolve, reject) => {
      if (users && users.length > 0) {
        resolve(users);
      }
      else {
        reject({
          status: process.env.HTTP_RESPONSE_NOT_FOUND_CODE,
          message: process.env.HTTP_RESPONSE_NOT_FOUND_MESSAGE,
          data: null
        })
      }
    });
  }

  User.find()
    .exec()
    .then((users) => _validateUsers(users))
    .then((validUsers) => _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, process.env.HTTP_RESPONSE_SUCCESS_MESSAGE, validUsers)) 
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE, process.env.HTTP_RESPONSE_INTERNAL_ERROR_MESSAGE, error))
    .finally(() => _sendResponse(res));
}

const createUser = function(req, res) {
  const newUser = req.body;

  const _generateSalt = function() {
    const salt = parseInt(process.env.SALT_ROUND);
    return bcrypt.genSalt(salt);
  };

  const _hashPassword = function(user, salt) {
    return bcrypt.hash(user.password, salt);
  };

  const _createUser = function(newUser, hashedPassword) {
    newUser.password = hashedPassword;
    return User.create(newUser);
  };

  _generateSalt()
    .then((salt) => _hashPassword(newUser, salt))
    .then((hashedPassword) => _createUser(newUser, hashedPassword))
    .then((user) => _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, process.env.HTTP_RESPONSE_SUCCESS_MESSAGE, user))
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE, process.env.HTTP_RESPONSE_INTERNAL_ERROR_MESSAGE, error))
    .finally(() => _sendResponse(res));
}

const authUser = function(req, res) {
  const reqUser = req.body;

  const _validateUser = function(user) {
    return new Promise((resolve, reject) => {
      if (user) {
        resolve(user);
      } else {
        reject({
          status: process.env.HTTP_RESPONSE_AUTH_FAILED_CODE,
          message: process.env.HTTP_RESPONSE_AUTH_FAILED_MESSAGE,
          data: null
        });
      }
    });
  };

  const _comparePassword = function(reqUser, dbUser) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(reqUser.password, dbUser.password)
        .then((passwordMatched) => {
          if (passwordMatched === true) {
            resolve(dbUser);
          } else {
            reject({
              status: process.env.HTTP_RESPONSE_AUTH_FAILED_CODE,
              message: process.env.HTTP_RESPONSE_AUTH_FAILED_MESSAGE,
              data: null
            });
          }
        })
        .catch((error) => {
          reject({
            status: process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE,
            message: process.env.HTTP_RESPONSE_INTERNAL_ERROR_MESSAGE,
            data: error
          });
        });
    });
  };

  const _signToken = function(dbUser) {
    const signOptions = {
      expiresIn: "24h"
    };
    const signJwt = promisify(jwt.sign);
    return signJwt({ user: dbUser._id }, "dishcovery", signOptions)
      .then((token) => {
        // Returning fullName and _id for now, 
        const toReturn = {
          fullName: dbUser.fullName,
          _id: dbUser._id,
          token: token
        };
        return {
          status: process.env.HTTP_RESPONSE_SUCCESS_CODE,
          message: process.env.HTTP_RESPONSE_SUCCESS_MESSAGE,
          data: toReturn
        };
      })
      .catch((error) => {
        reject({
          status: process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE,
          message: process.env.HTTP_RESPONSE_INTERNAL_ERROR_MESSAGE,
          data: error
        });
      });
  };

  User.findOne({ username: reqUser.username })
    .then((dbUser) => _validateUser(dbUser))
    .then((user) => _comparePassword(reqUser, user))
    .then((user) => _signToken(user))
    .then((resData) => _setResponse(resData.status, resData.message, resData.data))
    .catch((error) => _setResponse(error.status, error.message, error.data))
    .finally(() => _sendResponse(res))
}

module.exports = {
  createUser,
  getUsers,
  authUser
}