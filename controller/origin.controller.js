const mongoose = require("mongoose");
const { promisify } = require("util");
const callbackify = require("util").callbackify;

const Dish = mongoose.model("Dish");

let status = 200;
let response = {
  message: null,
  data: null
}

// CALLBACKIFIERS

const callbackifyGetOrigin = callbackify(function(dishId, pageNumber, pageSize) {
  return Dish.findById(dishId)
    .select("origin")
    .exec()
    .then(function(dish) {
      return dish.origin
    });
});

const callbackifyUpdateOrigin = callbackify(function(dishId, updatedOrigin) {
  return Dish.findOneAndUpdate(
    { _id: dishId },
    { $set: { origin: updatedOrigin } },
    { new: true }
  );
});

const callbackifyPatchOrigin = callbackify(function(dishId, updatedOrigin) {
  return Dish.findOneAndUpdate(
    { _id: dishId, "origin._id": updatedOrigin._id },
    { $set: { "origin.$": updatedOrigin } },
    { new: true }
  );
});


// CONTROLLERS

const getOrigin = function(req, res) {
  const dishId = req.params.dishId;
  callbackifyGetOrigin(dishId, function(error, origin) {
    if (error) {
      status = 404;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Origin found";
      response["data"] = origin; 
    }
    res.status(status).json(response);
  })
}

const updateOrigin = function(req, res) {
  const dishId = req.params.dishId;
  const updatedOrigin = req.body;
  callbackifyUpdateOrigin(dishId, updatedOrigin, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Origin updated successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

const patchOrigin = function(req, res) {
  const dishId = req.params.dishId;
  const updatedOrigin = req.body;
  callbackifyPatchOrigin(dishId, updatedOrigin, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Origin patched successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};


module.exports = {
  getOrigin,
  updateOrigin,
  patchOrigin
}