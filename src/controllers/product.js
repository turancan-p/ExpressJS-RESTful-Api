const Product = require("../models/product");
const mongoose = require("mongoose");
const _helper = require("../utils/helper.util");

//done
exports.get_all_products = (req, res, next) => {
  const shopName = req.user.shopName;

  _helper.get_all_data(req, res, next, Product, shopName);
};

//done
exports.get_one_product = (req, res, next) => {
  const shopName = req.user.shopName;
  const productId = req.params.productId;

  _helper.get_one_data(req, res, next, Product, shopName);
};

//done
exports.create_new_product = async (req, res, next) => {
  const shopName = req.user.shopName;
  const { name, price } = req.body;

  const product = {
    name: name,
    price: price,
  };

  _helper.create_one_object(req, res, next, Product, shopName, product);
};

//done
exports.update_one_product = (req, res, next) => {
  const productId = req.params.productId;
  const shopName = req.user.shopName;

  _helper.update_one_object(req, res, next, Product, shopName, productId);
};

//done
exports.delete_one_product = (req, res, next) => {
  const productId = req.params.productId;
  const shopName = req.user.shopName;

  if (!(shopName, productId)) {
    return res.status(404).json({
      Error: "Inputs must be filled",
    });
  }
  _helper.delete_one_object(req, res, next, Product, shopName, productId);
};
