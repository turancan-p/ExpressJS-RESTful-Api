const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer");

const checkAuthentication = require("../middlewares/authentication");

router.get("/", checkAuthentication, customerController.get_all_customers);

router.get(
  "/:productId",
  checkAuthentication,
  customerController.get_one_customer
);

router.post("/", checkAuthentication, customerController.create_new_customer);

router.patch(
  "/:productId",
  checkAuthentication,
  customerController.update_one_customer
);

router.delete(
  "/:productId",
  checkAuthentication,
  customerController.delete_one_customer
);
module.exports = router;
