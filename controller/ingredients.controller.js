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

const callbackifyGetAllIngredients = callbackify(function(dishId, pageNumber, pageSize) {
  // let skip = (pageNumber - 1) * pageSize;
  // const test = callbackify(function() {
  //   return Dish.findById(dishId)
  //   .select("ingredients")
  //   .slice("ingredients", [skip, skip + pageSize])
  //   .exec()
  // });
  // return test(function(error, dish) {
  //   callbackify(dish.ingredients);
  // });
  let skip = (pageNumber - 1) * pageSize;
  return Dish.findById(dishId)
    .select("ingredients")
    .exec()
    .then(function(dish) {
      return dish.ingredients
    });
});

const callbackifyAddIngredient = callbackify(function(dishId, ingredient) {
  return Dish.findByIdAndUpdate(dishId, { $push: { ingredients: ingredient } }, { new: true });
});

const callbackifyGetOneIngredient = callbackify(function(ingredientId) {
  return Dish.findOne({ "ingredients._id": ingredientId }, { "ingredients.$": 1 });
});

const callbackifyUpdateIngredients = callbackify(function(ingredientId, updatedIngredient) {
  return Dish.findOneAndUpdate(
    { "ingredients._id": ingredientId },
    { $set: { "ingredients.$": updatedIngredient } }
  );
});

const callbackifyDeleteOneIngredient = callbackify(function(ingredientId) {
  return Dish.findOneAndUpdate(
    { "ingredients._id": ingredientId },
    { $pull: { ingredients: { _id: ingredientId } } }
  );
});

const callbackifyPatchIngredient = callbackify(function(ingredientId, updatedIngredient) {
  return Dish.findOneAndUpdate(
    { "ingredients._id": ingredientId },
    { $set: updatedIngredient }
  );
});


// CONTROLLERS

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
  callbackifyGetAllIngredients(dishId, pageNumber, pageSize, function(error, ingredients) {
    if (error) {
      status = 404;
      response["message"] = error;
      delete response["data"];
    } else {
      if (ingredients.length > 0) {
        status = 200;
        response["message"] = "Total " + ingredients.length + " ingredients found";
        response["data"] = ingredients;  
      } else {
        status = 404;
        response["message"] = "No ingredient found!";
        delete response["data"];
      }
    }
    res.status(status).json(response);
  })
}

const addIngredient = function(req, res) {
  const dishId = req.params.dishId;
  const newIngredient = req.body;
  console.log(dishId, newIngredient);
  callbackifyAddIngredient(dishId, newIngredient, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Ingredient added successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

const getOneIngredient = function(req, res) {
  callbackifyGetOneIngredient(req.params.ingredientId, function(error, ingredient) {
    if (error) {
      status = 404;
      response["message"] = error;
      delete response["data"];
    } else {
      if (ingredient) {
        status = 200;
        response["message"] = "Ingredient found!";
        response["data"] = ingredient;
      } else {
        status = 404;
        response["message"] = "Ingredient not found!";
        delete response["data"];
      }
    }
    res.status(status).json(response);
  });
};

const updateIngredient = function(req, res) {
  const ingredientId = req.params.ingredientId;
  const updatedIngredient = req.body;
  
  callbackifyUpdateIngredients(ingredientId, updatedIngredient, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Ingredient updated successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

const patchIngredient = function(req, res) {
  const ingredientId = req.params.ingredientId;
  const updatedIngredient = req.body;

  callbackifyPatchIngredient(ingredientId, updatedIngredient, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Ingredient patched successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

const deleteOneIngredient = function(req, res) {
  const ingredientId = req.params.ingredientId;
  
  callbackifyDeleteOneIngredient(ingredientId, function(error, updatedDish) {
    if (error) {
      status = 500;
      response["message"] = error;
      delete response["data"];
    } else {
      status = 200;
      response["message"] = "Ingredient deleted successfully!";
      response["data"] = updatedDish;
    }
    res.status(status).json(response);
  });
};

module.exports = {
  getAllIngredients,
  addIngredient,
  getOneIngredient,
  updateIngredient,
  patchIngredient,
  deleteOneIngredient
}