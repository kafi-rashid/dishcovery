const mongoose = require("mongoose");
const callbackify = require("util").callbackify;

const Dish = mongoose.model("Dish");

let status = 200;
let response = {
  message: null,
  data: null
}

// CALLBACKIFIERS

const callbackifyGetAllDishes = callbackify(function(pageNumber, pageSize) {
  let skip = (pageNumber - 1) * pageSize;
  return Dish.find()
    .skip(skip)
    .limit(pageSize).exec();
});

const callbackifyGetOneDish = callbackify(function(dishId) {
  return Dish.findById(dishId);
});

const callbackifyAddDish = callbackify(function(dish) {
  return Dish.create(dish);
});

const callbackifyUpdateDish = callbackify(function(dishId, dish) {
  return Dish.findByIdAndUpdate(dishId, dish, { new: true });
});

const callbackifyPatchDish = callbackify(function(dishId, dish) {
  return Dish.findByIdAndUpdate(dishId, dish, { new: true });
});

const callbackifyDeleteDish = callbackify(function(dishId) {
  return Dish.findByIdAndDelete(dishId);
});


// CONTROLLERS

const getAllDishes = function(req, res) {
  let pageNumber = 1;
  let pageSize = 10;
  if (req.query && req.query.pageNumber) {
    pageNumber = parseInt(req.query.pageNumber, 10);
  }
  if (req.query && req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize, 10);
  }
  callbackifyGetAllDishes(pageNumber, pageSize, function(error, dish) {
    if (error) {
      status = 404;
      response["message"] = error;
      delete response["data"];
    } else {
      if (dish.length > 0) {
        status = 200;
        response = dish;  
      } else {
        status = 404;
        response["message"] = "No dish found!";
        delete response["data"];
      }
    }
    res.status(status).json(response);
  })
}

const getOneDish = function(req, res) {
  callbackifyGetOneDish(req.params.dishId, function(error, dish) {
    if (error) {
      status = 404;
      response["message"] = error;
      delete response["data"];
      res.status(status).json(response);
    } else {
      if (dish) {
        status = 200;
        response = dish;
      } else {
        status = 404;
        response["message"] = "Dish not found!";
        delete response["data"];
      }
      res.status(status).json(response);
    }
  })
}

const addDish = function(req, res) {
  callbackifyAddDish(req.body, function(error, acknowledgement) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = acknowledgement;
    }
    res.status(status).json(response);
  })
}

const updateDish = function(req, res) {
  const dishId = req.params.dishId;
  const dish = req.body;
  callbackifyUpdateDish(dishId, dish, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Dish updated successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

const patchDish = function(req, res) {
  const dishId = req.params.dishId;
  const dish = req.body;
  callbackifyPatchDish(dishId, dish, function(error, patchedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Dish patched successfully!";
      response["data"] = patchedDish;
    }
    res.status(status).json(response);
  });
};

const deleteDish = function(req, res) {
  callbackifyDeleteDish(req.params.dishId, function(error, deletedDish) {
    if (error) {
      status = 404;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Dish deleted successfully!";
      response["data"] = deletedDish;
    }
    res.status(status).json(response);
  });
};

module.exports = {
  getAllDishes,
  getOneDish,
  addDish,
  updateDish,
  patchDish,
  deleteDish
}