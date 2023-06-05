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

const callbackifyGetAllCategories = callbackify(function(dishId) {
  return Dish.findById(dishId)
    .select("category")
    .exec()
    .then(function(dish) {
      return dish.category
    });
});

const callbackifyAddCategory = callbackify(function(dishId, category) {
  return Dish.findByIdAndUpdate(dishId, { $push: { category: category } }, { new: true });
});

const callbackifyGetOneCategory = callbackify(function(categoryId) {
  return Dish.findOne(
    { "category._id": categoryId }, 
    { "category.$": 1 }
  );
});

const callbackifyUpdateCategory = callbackify(function(categoryId, updatedCategory) {
  return Dish.findOneAndUpdate(
    { "category._id": categoryId },
    { $set: { "category.$": updatedCategory } }
  );
});

const callbackifyDeleteOneCategory = callbackify(function(categoryId) {
  return Dish.findOneAndUpdate(
    { "category._id": categoryId },
    { $pull: { category: { _id: categoryId } } }
  );
});

const callbackifyPatchCategory = callbackify(function(categoryId, updatedData) {
  return Dish.findOneAndUpdate(
    { "category._id": categoryId },
    { $set: updatedData }
  );
});


// CONTROLLERS

const getAllCategories = function(req, res) {
  let pageNumber = 1;
  let pageSize = 10;
  let dishId = req.params.dishId;
  if (req.query && req.query.pageNumber) {
    pageNumber = parseInt(req.query.pageNumber, 10);
  }
  if (req.query && req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize, 10);
  }
  callbackifyGetAllCategories(dishId, function(error, categories) {
    if (error) {
      status = 404;
      response["message"] = error;
      delete response["data"];
    } else {
      if (categories.length > 0) {
        status = 200;
        response["message"] = "Total " + categories.length + " categories found";
        response["data"] = categories;  
      } else {
        status = 404;
        response["message"] = "No category found!";
        delete response["data"];
      }
    }
    res.status(status).json(response);
  })
}

const addCategory = function(req, res) {
  const newCategory = req.body;
  const dishId = req.params.dishId;
  callbackifyAddCategory(dishId, newCategory, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Category added successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

const getOneCategory = function(req, res) {
  callbackifyGetOneCategory(req.params.categoryId, function(error, category) {
    if (error) {
      status = 404;
      response["message"] = error;
      delete response["data"];
    } else {
      if (category) {
        status = 200;
        response["message"] = "Category found!";
        response["data"] = category;
      } else {
        status = 404;
        response["message"] = "Category not found!";
        delete response["data"];
      }
    }
    res.status(status).json(response);
  });
};

const updateCategory = function(req, res) {
  const categoryId = req.params.categoryId;
  const updatedCategory = req.body;
  
  callbackifyUpdateCategory(categoryId, updatedCategory, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Category updated successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

const patchCategory = function(req, res) {
  const categoryId = req.params.categoryId;
  const updatedData = req.body;

  callbackifyPatchCategory(categoryId, updatedData, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Category patched successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

const deleteOneCategory = function(req, res) {
  const categoryId = req.params.categoryId;
  
  callbackifyDeleteOneCategory(categoryId, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Category deleted successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

module.exports = {
  getAllCategories,
  addCategory,
  getOneCategory,
  updateCategory,
  patchCategory,
  deleteOneCategory
}