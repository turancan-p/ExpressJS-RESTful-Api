const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

const checkAuthentication = require("../middlewares/authentication");

router.get("/", checkAuthentication, orderController.get_all_orders);

router.get("/:orderId", checkAuthentication, orderController.get_one_order);

router.post("/", checkAuthentication, orderController.create_new_order);

module.exports = router;
