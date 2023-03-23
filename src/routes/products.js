const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

const checkAuthentication = require("../middlewares/authentication");

router.get("/", checkAuthentication, productController.get_all_products);

router.get(
  "/:productId",
  checkAuthentication,
  productController.get_one_product
);

router.post("/", checkAuthentication, productController.create_new_product);

router.patch(
  "/:productId",
  checkAuthentication,
  productController.update_one_product
);

router.delete(
  "/:productId",
  checkAuthentication,
  productController.delete_one_product
);

module.exports = router;
