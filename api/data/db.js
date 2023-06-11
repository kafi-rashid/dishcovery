const mongoose = require("mongoose");
const callbackify = require("util").callbackify;
require("dotenv").config();
require("../models/dish.model.js");
require("../models/user.model.js");

const callbackifyMongooseConnectionClosed = callbackify(function() {
  return mongoose.connection.close();
})

const callbackifyMongooseConnected = callbackify(function(url) {
  return mongoose.connect(url);
})

callbackifyMongooseConnected(process.env.DB_ADDRESS + "/" + process.env.DB_NAME, function() {
  console.log("Connection established!");
});

mongoose.connection.on("connected", function() {
  console.log("Mongoose connected!");
});

mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnected!");
});

mongoose.connection.on("error", function() {
  console.log("Mongoose having issues!");
});

process.on("SIGINT", function() {
  callbackifyMongooseConnectionClosed(function() {
    console.log("Connection has been closed!");
    process.exit(0);
  })
});