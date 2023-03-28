const express = require("express");
const router = express.Router();

const courierController = require("../controllers/courier");

const checkAuthentication = require("../middlewares/authentication");

router.get("/", checkAuthentication, courierController.get_all_couriers);

router.get(
  "/:courierId",
  checkAuthentication,
  courierController.get_one_courier
);

router.post("/login", checkAuthentication, courierController.courierLogin);

router.patch(
  "/:courierId",
  checkAuthentication,
  courierController.update_one_courier
);

router.delete(
  "/:courierId",
  checkAuthentication,
  courierController.delete_one_courier
);

router.get(
  "/orders/:courierId",
  checkAuthentication,
  courierController.get_courier_orders
);

module.exports = router;
