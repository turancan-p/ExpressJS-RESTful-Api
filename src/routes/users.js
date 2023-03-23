const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");
const courierController = require("../controllers/courier");

const checkAuthentication = require("../middlewares/authentication");

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.post(
  "/courier",
  checkAuthentication,
  courierController.create_one_courier
);

router.get("/:userId", checkAuthentication, userController.user_details);

router.patch("/:userId", checkAuthentication, userController.user_update);

router.delete("/:userId", checkAuthentication, userController.user_delete);

module.exports = router;
