const router = require("express").Router();
const ingredientsController = require("../../controller/ingredients.controller");
const authController = require("../../controller/auth.controller");

router.route("/dishes/:dishId/ingredients")
  .get(ingredientsController.getAllIngredients)
  .post(authController.verifyToken, ingredientsController.addIngredient);

router.route("/dishes/:dishId/ingredients/:ingredientId")
  .get(ingredientsController.getOneIngredient)
  .put(authController.verifyToken, ingredientsController.updateIngredient)
  .delete(authController.verifyToken, ingredientsController.deleteOneIngredient)
  .patch(authController.verifyToken, ingredientsController.patchIngredient);

module.exports = router;