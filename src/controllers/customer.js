const Customer = require("../models/customer");
const _helper = require("../utils/helper.util");

//done
exports.get_all_customers = (req, res, next) => {
  const shopName = req.user.shopName;
  _helper.get_all_data(req, res, next, Customer, shopName);
};

//done
exports.get_one_customer = (req, res, next) => {
  const shopName = req.user.shopName;
  const customerId = req.params.customerId;

  _helper.get_one_data(req, res, next, Customer, shopName, customerId);
};

//done
exports.create_new_customer = async (req, res, next) => {
  const shopName = req.user.shopName;
  const { name, phone, adress, latitude, longtitude } = req.body;

  const data = {
    name: name,
    phone: phone,
    adress: adress,
    latitude: latitude,
    longtitude: longtitude,
  };

  _helper.create_one_object(req, res, next, Customer, shopName, data);
};

//done
exports.update_one_customer = (req, res, next) => {
  const customerId = req.params.customerId;
  const shopName = req.user.shopName;

  _helper.update_one_object(req, res, next, Customer, shopName, customerId);
};

//done
exports.delete_one_customer = (req, res, next) => {
  const customerId = req.params.customerId;
  const shopName = req.user.shopName;

  _helper.delete_one_object(req, res, next, Customer, shopName, customerId);
};
