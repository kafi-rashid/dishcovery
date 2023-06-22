const router = require("express").Router();
const dishController = require("../../controller/dish.controller");
const categoryController = require("../../controller/category.controller");
const authController = require("../../controller/auth.controller");

router.route("/dishes")
  .get(dishController.getAllDishes)
  .post(authController.verifyToken, dishController.addDish);

router.route("/dishes/count")
  .get(dishController.getCount);

router.route("/dishes/:dishId")
  .get(dishController.getOneDish)
  .put(authController.verifyToken, dishController.updateDish)
  .delete(authController.verifyToken, dishController.deleteDish)
  .patch(authController.verifyToken, dishController.patchDish);

router.route("/dishes/:dishId/categories")
  .get(categoryController.getCategoriesByDishId)
  .post(authController.verifyToken, categoryController.addCategory);

router.route("/dishes/:dishId/categories/:categoryId")
  .get(categoryController.getOneCategory)
  .put(authController.verifyToken, categoryController.updateCategory)
  .patch(authController.verifyToken, categoryController.patchCategory)
  .delete(authController.verifyToken, categoryController.deleteOneCategory);

router.route("/categories")
  .get(categoryController.getAllCategories);

module.exports = router;