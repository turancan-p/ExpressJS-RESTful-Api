const Courier = require("../models/courier");
const _helper = require("../utils/helper.util");
const Order = require("../models/order");
const bcrypt = require("bcrypt");

//done
exports.get_all_couriers = (req, res, next) => {
  const shopName = req.user.shopName;

  _helper.get_all_data(req, res, next, Courier, shopName);
};

//done
exports.get_one_courier = (req, res, next) => {
  const shopName = req.user.shopName;
  const courierId = req.params.courierId;

  _helper.get_one_data(req, res, next, Courier, shopName, courierId);
};

//done
exports.create_one_courier = async (req, res, next) => {
  //shopname, namei email, password, phone
  const shopName = req.user.shopName;
  const { name, email, phone, password } = req.body;

  const oldUser = await Courier.findOne({ email: email });
  if (oldUser) {
    return res.status(404).json({
      Error: "Email already exists",
    });
  }

  const oldPhone = await Courier.findOne({ phone: phone });
  if (oldPhone) {
    return res.status(404).json({
      Error: "Phone already exists",
    });
  }
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(409).json({
        Error: err,
      });
    } else {
      const data = {
        name: name,
        email: email,
        password: hash,
        phone: phone,
      };
      _helper.create_one_object(req, res, next, Courier, shopName, data);
    }
  });
};

//login
exports.courierLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({
      Error: "Inputs must be filled",
    });
  }

  Courier.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(400).json({
          Error: "Invalid",
        });
      }
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (err) {
          return res.status(401).json({
            Error: "Auth Failed",
          });
        }
        if (result) {
          const data = {
            email: user[0].email,
            userId: user[0].id,
            shopName: user[0].shopName,
            type: "Courier",
          };
          accessToken = _helper.createAccessToken(data);

          const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
          const realIp = ip.split(",")[0];

          user[0].ip = realIp;

          await user[0]
            .save()
            .then()
            .catch((err) => {
              console.log("failed to save");
            });

          return res.status(200).json({
            accessToken: accessToken,
            user: data,
          });
        }
      });
    });
};

//done
exports.update_one_courier = (req, res, next) => {
  const courierId = req.params.courierId;
  const shopName = req.user.shopName;

  _helper.update_one_object(req, res, next, Courier, shopName, courierId);
};

//done
exports.delete_one_courier = (req, res, next) => {
  const courierId = req.params.courierId;
  const shopName = req.user.shopName;

  _helper.delete_one_object(req, res, next, Courier, shopName, courierId);
};

//done
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
