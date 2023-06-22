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

const getCategoriesByDishId = function(req, res) {
  let dishId = req.params.dishId;

  const _validateDish = function(dish) {
    return new Promise((resolve, reject) => {
      if (dish.category && dish.category.length > 0) {
        resolve(dish.category);
      } else {
        reject({
          status: 404,
          message: "No category found!",
          data: null
        });
      }
    })
  }

  Dish.findById(dishId)
    .select("category")
    .lean()
    .exec()
    .then((dish) => _validateDish(dish))
    .then((categories) => _setResponse(200, "Total " + categories.length + " categories found", categories))
    .catch((error) => _setResponse(500, error, null))
    .finally(() => _sendResponse(res));
}

const addCategory = function(req, res) {
  const newCategory = req.body;
  const dishId = req.params.dishId;
  Dish.findByIdAndUpdate(dishId, { $push: { category: newCategory } }, { new: true })
    .then((updatedDish) => _setResponse(200, "Category added successfully!", updatedDish))
    .catch((error) => _setResponse(500, error, null))
    .finally(() => _sendResponse(res));
};

const getOneCategory = function(req, res) {
  const _validateCategory = function(category) {
    return new Promise((resolve, reject) => {
      if (category) {
        resolve(category);
      } else {
        reject({
          status: 404,
          message: "No category found!",
          data: null
        });
      }
    })
  }
  Dish.findOne(
    { "category._id": req.params.categoryId }, 
    { "category.$": 1 }
  )
  .then((category) => _validateCategory(category))
  .then((category) => _setResponse(200, "Category found!", category))
  .catch((error) => _setResponse(500, error, null))
  .finally(() => _sendResponse(res));
};

const updateCategory = function(req, res) {
  const categoryId = req.params.categoryId;
  const updatedCategory = req.body;
  Dish.findOneAndUpdate(
    { "category._id": categoryId },
    { $set: { "category.$": updatedCategory } }
  )
  .then((category) => _setResponse(200, "Category updated successfully!", category))
  .catch((error) => _setResponse(500, error, null))
  .finally(() => _sendResponse(res));
};

const patchCategory = function(req, res) {
  const categoryId = req.params.categoryId;
  const updatedData = req.body;
  Dish.findOneAndUpdate(
    { "category._id": categoryId },
    { $set: updatedData }
  )
  .then((updatedDish) => _setResponse(200, "Category patched successfully!", updatedDish))
  .catch((error) => _setResponse(500, error, null))
  .finally(() => _sendResponse(res));
};

const deleteOneCategory = function(req, res) {
  const categoryId = req.params.categoryId;
  Dish.findOneAndUpdate(
    { "category._id": categoryId },
    { $pull: { category: { _id: categoryId } } }
  )
  .then((updatedDish) => _setResponse(200, "Category deleted successfully!", updatedDish))
  .catch((error) => _setResponse(500, error, null))
  .finally(() => _sendResponse(res));
};

const getAllCategories = function(req, res) {
  Dish.distinct("category.name")
    .exec()
    .then((categories) => _setResponse(200, null, categories))
    .catch((error) => _setResponse(500, error, null))
    .finally(() => _sendResponse(res));
}

module.exports = {
  getAllCategories,
  getCategoriesByDishId,
  addCategory,
  getOneCategory,
  updateCategory,
  patchCategory,
  deleteOneCategory
}