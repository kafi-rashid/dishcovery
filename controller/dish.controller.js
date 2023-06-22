const mongoose = require("mongoose");
require("dotenv").config();

const Dish = mongoose.model(process.env.DB_MODEL);

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

const getAllDishes = function(req, res) {
  let offset = parseInt(process.env.DB_DEFAULT_OFFSET);
  let count = parseInt(process.env.DB_DEFAULT_COUNT);
  let query = {};
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    if (req.query.count > count) {
      _setResponse(process.env.HTTP_RESPONSE_NOT_FOUND_CODE, process.env.DB_DEFAULT_COUNT_EXCEED_MESSAGE, null);
      _sendResponse(res);
      return;
    } else {
      count = parseInt(req.query.count, 10);
    }
  }
  if (req.query && req.query.search) {
    query = { "title": { $regex: new RegExp(req.query.search, "i") } }; 
  }

  const _validateDishes = function(dishes) {
    return new Promise((resolve, reject) => {
      if (dishes && dishes.length > 0) {
        resolve(dishes);
      }
      else {
        reject({
          status: process.env.HTTP_RESPONSE_NOT_FOUND_CODE,
          message: process.env.HTTP_RESPONSE_NOT_FOUND_MESSAGE,
          data: null
        })
      }
    })
  }

  return Dish.find(query)
    .skip(offset)
    .limit(count)
    .exec()
    .then(dishes => _validateDishes(dishes))
    .then((dishes) => _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, process.env.HTTP_RESPONSE_SUCCESS_MESSAGE, dishes))
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE, error, null))
    .finally(() => _sendResponse(res));
}

const getOneDish = function(req, res) {

  const _validateDish = function(dish) {
    return new Promise((resolve, reject) => {
      if (dish) {
        resolve(dish);
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

  return Dish.findById(req.params.dishId)
    .then((dish) => _validateDish(dish))
    .then((dish) => _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, process.env.HTTP_RESPONSE_SUCCESS_MESSAGE, dish))
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_NOT_FOUND_CODE, error, null))
    .finally(() => _sendResponse(res));
}

const addDish = function(req, res) {
  Dish.create(req.body, { new: true })
    .then((dish) => _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, process.env.HTTP_RESPONSE_SUCCESS_MESSAGE, dish))
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE, error, null))
    .finally(() => res.status(process.env.HTTP_RESPONSE_SUCCESS_CODE).json(response));
}

const updateDish = function(req, res) {
  const dishId = req.params.dishId;
  const dish = req.body;

  const _validateDish = function(dish) {
    return new Promise((resolve, reject) => {
      if (dish) {
        resolve(dish);
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

  Dish.findByIdAndUpdate(dishId, dish, { new: true })
    .then((dish) => _validateDish(dish))
    .then((dish) =>  _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, process.env.HTTP_RESPONSE_SUCCESS_MESSAGE, dish))
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE, error, null))
    .finally(() => _sendResponse(res));
};

const patchDish = function(req, res) {
  const dishId = req.params.dishId;
  const dish = req.body;

  const _validateDish = function(dish) {
    return new Promise((resolve, reject) => {
      if (dish) {
        resolve(dish);
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

  Dish.findByIdAndUpdate(dishId, dish, { new: true })
    .then((dish) => _validateDish(dish))
    .then((dish) =>  _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, process.env.HTTP_RESPONSE_SUCCESS_MESSAGE, dish))
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE, error, null))
    .finally(() => _sendResponse(res));
};

const deleteDish = function(req, res) {
  const dishId = req.params.dishId;

  const _validateDish = function(dish) {
    return new Promise((resolve, reject) => {
      if (dish) {
        resolve(dish);
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

  Dish.findByIdAndDelete(dishId)
    .then((dish) => _validateDish(dish))
    .then((dish) =>  _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, process.env.HTTP_RESPONSE_SUCCESS_MESSAGE, dish))
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE, error, null))
    .finally(() => _sendResponse(res));
};

const getCount = function(req, res) {
  let query = {};
  if (req.query && req.query.search) {
    query = { "title": { $regex: new RegExp(req.query.search, "i") } }; 
  }
  Dish.find(query)
    .count()
    .then((count) => _setResponse(process.env.HTTP_RESPONSE_SUCCESS_CODE, null, count))
    .catch((error) => _setResponse(process.env.HTTP_RESPONSE_INTERNAL_ERROR_CODE, process.env.HTTP_RESPONSE_INTERNAL_ERROR_MESSAGE, error))
    .finally(() => _sendResponse(res));
}

module.exports = {
  getAllDishes,
  getOneDish,
  addDish,
  updateDish,
  patchDish,
  deleteDish,
  getCount
}