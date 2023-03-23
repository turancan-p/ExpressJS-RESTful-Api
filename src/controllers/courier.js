const Courier = require("../models/courier");
const _helper = require("../utils/helper.util");
const Order = require("../models/order");

exports.get_all_couriers = (req, res, next) => {};

exports.get_one_courier = (req, res, next) => {};

exports.create_one_courier = (req, res, next) => {};

exports.update_one_courier = (req, res, next) => {};

exports.delete_one_courier = (req, res, next) => {};

//courierid get order 
exports.get_courier_orders = (req, res, next) => {
  const shopName = req.user.shopName;
  const courierId = req.params.courierId;
  const { orderStatus } = req.body;

  _helper.get_courier_orders(
    req,
    res,
    next,
    Order,
    shopName,
    courierId,
    orderStatus
  );
};
