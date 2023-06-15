const mongoose = require("mongoose");

const Dish = mongoose.model("Dish");

const response = {
  status: 200,
  message: null,
  data: null
}

const getAllDishes = function(req, res) {
  console.log("getAllDishes");
  let offset = 0;
  let count = 10;
  let query = {};
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    if (req.query.count > 10) {
      response.status = 404;
      response.message = "Can not fetch more than 10 dishes!";
      response.data = null;
      res.status(response.status).json(response);
      return;
    } else {
      count = parseInt(req.query.count, 10);
    }
  }
  if (req.query && req.query.search) {
    query = { "title": { $regex: new RegExp(req.query.search, "i") } }; 
  }
  console.log(query);
  return Dish.find(query)
    .skip(offset)
    .limit(count)
    .exec()
    .then((dish) => {
      if (dish.length > 0) {
        response.status = 200;
        response.message = dish.length + " dish found!";
        response.data = dish;  
      } else {
        response.status = 404;
        response.message = "No dish found!";
        response.data = null;
      }
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    })
}

const getOneDish = function(req, res) {
  return Dish.findById(req.params.dishId)
    .then((dish) => {
      if (dish) {
        response.status = 200;
        response.message = "Dish found!";
        response.data = dish;
      } else {
        response.status = 404;
        response.message = "Dish not found!";
        response.data = null;
      }
    })
    .catch((error) => {
      response.status = 404;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
}

const addDish = function(req, res) {
  Dish.create(req.body, { new: true })
    .then((dish) => {
      response.status = 200;
      response.message = "Dish has been added!";
      response = dish;
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
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
        response.status = 200;
        response.message = "Dish updated successfully!";
        response.data = dish;
      } else {
        response.status = 404;
        response.message = "Dish not found!";
        response.data = null;
        res.status(response.status).json(response);
        return;
      }
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
};

const patchDish = function(req, res) {
  const dishId = req.params.dishId;
  const dish = req.body;
  Dish.findByIdAndUpdate(dishId, dish, { new: true })
    .then((dish) => {
      if (dish) {
        response.status = 200;
        response.message = "Dish updated successfully!";
        response.data = dish;
      } else {
        response.status = 404;
        response.message = "Dish not found!";
        response.data = null;
        res.status(response.status).json(response);
        return;
      }
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
    });
};

const deleteDish = function(req, res) {
  Dish.findByIdAndDelete(dishId)
    .then((dish) => {
      if (dish) {
        response.status = 204;
        response.message = "Dish deleted successfully!";
        response.data = dish;
      } else {
        response.status = 404;
        response.message = error;
        response.data = null;
      }
    })
    .catch((error) => {
      response.status = 500;
      response.message = error;
      response.data = null;
    })
    .finally(() => {
      res.status(response.status).json(response);
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
      response.status = 200;
      response.message = null;
      response.data = count;
    })
    .catch((error) => {
      response.status = 500;
      response.message = "Something went wrong!";
      response.data = error;
    })
    .finally(() => {
      res.status(response.status).json(response);
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