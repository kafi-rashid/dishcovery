const mongoose = require("mongoose");

const Dish = mongoose.model("Dish");

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

const getAllIngredients = function(req, res) {
  let pageNumber = 1;
  let pageSize = 10;
  let dishId = req.params.dishId;
  if (req.query && req.query.pageNumber) {
    pageNumber = parseInt(req.query.pageNumber, 10);
  }
  if (req.query && req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize, 10);
  }
  const _validateDish = function(dish) {
    return new Promise((resolve, reject) => {
      if (dish.ingredients && dish.ingredients.length > 0) {
        resolve(dish.ingredients)
      }
      else {
        resolve({
          status: 404,
          message: "No ingredient found!",
          data: null
        })
      }
    });
  }

  Dish.findById(dishId)
    .select("ingredients")
    .lean()
    .exec()
    .then((dish) => _validateDish(dish))
    .then((ingredients) => _setResponse(200, "Total " + ingredients.length, ingredients))
    .catch((error) => _setResponse(500, error, null))
    .finally(() => _sendResponse(res));
}

const addIngredient = function(req, res) {
  const dishId = req.params.dishId;
  const newIngredient = req.body;
  console.log(dishId, newIngredient);
  Dish.findByIdAndUpdate(dishId, { $push: { ingredients: ingredient } }, { new: true })
    .then((dish) => _setResponse(200, "Ingredient added successfully!", dish))
    .catch((error) => _setResponse(500, error, null))
    .finally(() => _sendResponse(res));
};

const getOneIngredient = function(req, res) {
  const _validateIngredient = function(ingredient) {
    return new Promise((resolve, reject) => {
      if (ingredient) {
        resolve(ingredient);
      }
      else {
        reject({
          status: 404,
          message: "Ingredient not found!",
          data: null
        })
      }
    });
  }
  Dish.findOne({ "ingredients._id": req.params.ingredientId }, { "ingredients.$": 1 })
    .then((ingredient) => _validateIngredient(ingredient))
    .then((ingredient) => _setResponse(200, "Ingredient found!", ingredient))
    .catch((error) => _setResponse(500, error, null))
    .finally(() => _sendResponse(res));
};

const updateIngredient = function(req, res) {
  const ingredientId = req.params.ingredientId;
  const updatedIngredient = req.body;
  Dish.findOneAndUpdate(
    { "ingredients._id": ingredientId },
    { $set: { "ingredients.$": updatedIngredient } }
  )
  .then((dish) => _setResponse(200, "Ingredient updated successfully!", dish))
  .catch((error) => _setResponse(500, error, null))
  .finally(() => _sendResponse(res));
};

const patchIngredient = function(req, res) {
  const ingredientId = req.params.ingredientId;
  const updatedIngredient = req.body;
  Dish.findOneAndUpdate(
    { "ingredients._id": ingredientId },
    { $set: updatedIngredient }
  )
  .then((dish) => _setResponse(200, "Ingredient patched successfully!", dish))
  .catch((error) => _setResponse(500, error, null))
  .finally(() => _sendResponse(res));
};

const deleteOneIngredient = function(req, res) {
  const ingredientId = req.params.ingredientId;
  Dish.findOneAndUpdate(
    { "ingredients._id": ingredientId },
    { $pull: { ingredients: { _id: ingredientId } } }
  )
  .then((dish) => _setResponse(200, "Ingredient deleted successfully!", dish))
  .catch((error) => _setResponse(500, error, null))
  .finally(() => _sendResponse(res));
};

module.exports = {
  getAllIngredients,
  addIngredient,
  getOneIngredient,
  updateIngredient,
  patchIngredient,
  deleteOneIngredient
}