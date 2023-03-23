const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const _helper = require("../utils/helper.util");

//done
exports.get_all_orders = (req, res, next) => {
  const shopName = req.user.shopName;

  _helper.get_all_data(req, res, next, Order, shopName);
};

//send orderid
exports.get_one_order = (req, res, next) => {
  const shopName = req.user.shopName;
  const orderId = req.params.orderId;

  _helper.get_one_data(req, res, next, Order, shopName, orderId);
};

//send customerid courierid orderlist
exports.create_new_order = async (req, res, next) => {
  const shopName = req.user.shopName;
  const { customerId, courierId, orderList } = req.body;

  const jsonData = {
    customerId: customerId,
    courierId: courierId,
    orderList: orderList,
  };

  _helper.create_new_order(req, res, next, Order, shopName, jsonData, Product);
};

//send update props
exports.update_one_order = (req, res, next) => {
  const orderId = req.params.orderId;
  const shopName = req.user.shopName;

  _helper.update_one_object(req, res, next, Order, shopName, orderId);
};

//send orderid
exports.delete_one_order = (req, res, next) => {
  const orderId = req.params.orderId;
  const shopName = req.user.shopName;
  _helper.delete_one_object(req, res, next, Order, shopName, orderId);
};
