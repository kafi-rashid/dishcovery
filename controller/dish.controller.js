const mongoose = require("mongoose");

const Dish = mongoose.model("Dish");

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

const getAllDishes = function(req, res) {
  let offset = 0;
  let count = 10;
  let query = {};
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    if (req.query.count > 10) {
      _setResponse(404, "Can not fetch more than 10 dishes!", null);
      _sendResponse(res);
      return;
    } else {
      count = parseInt(req.query.count, 10);
    }
  }
  if (req.query && req.query.search) {
    query = { "title": { $regex: new RegExp(req.query.search, "i") } }; 
  }
  return Dish.find(query)
    .skip(offset)
    .limit(count)
    .exec()
    .then((dish) => {
      if (dish.length > 0) {
        _setResponse(200, dish.length + " dish found!", dish);
      } else {
        _setResponse(404, "No dish found!", null);
      }
    })
    .catch((error) => {
      _setResponse(500, error, null);
    })
    .finally(() => {
      _sendResponse(res)
    })
}

const getOneDish = function(req, res) {
  return Dish.findById(req.params.dishId)
    .then((dish) => {
      if (dish) {
        _setResponse(200, "Dish found!", dish);
      } else {
        _setResponse(404, "Dish not found!", null);
      }
    })
    .catch((error) => {
      _setResponse(404, error, null);
    })
    .finally(() => {
      _sendResponse(res)
    });
}

const addDish = function(req, res) {
  Dish.create(req.body, { new: true })
    .then((dish) => {
      _setResponse(200, "Dish has been added!", dish);
    })
    .catch((error) => {
      _setResponse(500, error, null);
    })
    .finally(() => {
      res.status(200).json(response);
    });
}

const updateDish = function(req, res) {
  const dishId = req.params.dishId;
  const dish = req.body;
  Dish.findByIdAndUpdate(dishId, dish, { new: true })
    .then((dish) => {
      if (dish) {
        _setResponse(200, "Dish updated successfully!", dish);
      } else {
        _setResponse(404, "Dish not found!", null);
        _sendResponse(res)
        return;
      }
    })
    .catch((error) => {
      _setResponse(500, error, null);
    })
    .finally(() => {
      _sendResponse(res)
    });
};

const patchDish = function(req, res) {
  const dishId = req.params.dishId;
  const dish = req.body;
  Dish.findByIdAndUpdate(dishId, dish, { new: true })
    .then((dish) => {
      if (dish) {
        _setResponse(200, "Dish updated successfully!", dish);
      } else {
        _setResponse(404, "Dish not found!",);null;
        _sendResponse(res)
        return;
      }
    })
    .catch((error) => {
      _setResponse(500, error, null);
    })
    .finally(() => {
      _sendResponse(res)
    });
};

const deleteDish = function(req, res) {
  Dish.findByIdAndDelete(dishId)
    .then((dish) => {
      if (dish) {
        _setResponse(204, "Dish deleted successfully!", dish);
      } else {
        _setResponse(404, error, null);
      }
    })
    .catch((error) => {
      _setResponse(500, error, null);
    })
    .finally(() => {
      _sendResponse(res)
    });
};

const getCount = function(req, res) {
  let query = {};
  if (req.query && req.query.search) {
    query = { "title": { $regex: new RegExp(req.query.search, "i") } }; 
  }
  Dish.find(query)
    .count()
    .then((count) => {
      _setResponse(200, null, count);
    })
    .catch((error) => {
      _setResponse(500, "Something went wrong!", error);
    })
    .finally(() => {
      _sendResponse(res)
    });
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