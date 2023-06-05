const router = require("express").Router();
const dishController = require("../../controller/dish.controller");
const categoryController = require("../../controller/category.controller");
const originController = require("../../controller/origin.controller");
const ingredientsController = require("../../controller/ingredients.controller");

router.route("/dishes")
  .get(dishController.getAllDishes)
  .post(dishController.addDish);

router.route("/dishes/:dishId")
  .get(dishController.getOneDish)
  .put(dishController.updateDish)
  .delete(dishController.deleteDish)
  .patch(dishController.patchDish);

router.route("/dishes/:dishId/ingredients")
  .get(ingredientsController.getAllIngredients)
  .post(ingredientsController.addIngredient);

router.route("/dishes/:dishId/ingredients/:ingredientId")
  .get(ingredientsController.getOneIngredient)
  .put(ingredientsController.updateIngredient)
  .delete(ingredientsController.deleteOneIngredient)
  .patch(ingredientsController.patchIngredient);

router.route("/dishes/:dishId/categories")
  .get(categoryController.getAllCategories)
  .post(categoryController.addCategory);

router.route("/dishes/:dishId/categories/:categoryId")
  .get(categoryController.getOneCategory)
  .put(categoryController.updateCategory)
  .patch(categoryController.patchCategory)
  .delete(categoryController.deleteOneCategory);

router.route("/dishes/:dishId/origin") 
  .get(originController.getOrigin)
  .put(originController.updateOrigin)
  .patch(originController.patchOrigin);

module.exports = router;