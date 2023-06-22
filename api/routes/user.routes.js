const router = require("express").Router();
const userController = require("../../controller/user.controller");
const authController = require("../../controller/auth.controller");

router.route("/users")
  .get(authController.verifyToken, userController.getUsers)
  .post(userController.createUser);

router.route("/users/count")
  .get(userController.getUserCount)

router.route("/users/:userId")
  .get(authController.verifyToken, userController.getOneUser)
  .delete(authController.verifyToken, userController.deleteUser);

router.route("/auth")
  .post(userController.authUser);

module.exports = router;