const mongoose = require("mongoose");
const User = require("../models/user");

const bcrypt = require("bcrypt");

const _helper = require("../utils/helper.util");

//done
exports.user_signup = async (req, res, next) => {
  try {
    const { name, email, phone, password, shopName } = req.body;
    if (!(email && password && phone && name && shopName)) {
      return res.status(404).json({
        Error: "Inputs must be filled",
      });
    }

    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(404).json({
        Error: "Email already exists",
      });
    }

    const oldPhone = await User.findOne({ phone: phone });
    if (oldPhone) {
      return res.status(404).json({
        Error: "Phone already exists",
      });
    }

    const oldShopName = await User.findOne({ shopName: shopName });
    if (oldShopName) {
      return res.status(404).json({
        Error: "Shopname already exists",
      });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          Error: err,
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: name,
          email: email,
          password: hash,
          phone: phone,
          shopName: shopName,
        });
        user
          .save()
          .then(async (result) => {
            res.status(201).json({
              Response: "User Created",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              Error: "Error",
            });
          });
      }
    });
  } catch (error) {
    return res.status(500).json({
      Error: "None",
    });
  }
};

//done
exports.user_login = (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({
      Error: "Inputs must be filled",
    });
  }
  User.find({ email: email })
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
exports.user_update = (req, res, next) => {
  const shopName = req.user.shopName;
  const id = req.params.userId;
  _helper.update_one_object(req, res, next, User, shopName, id);
};

//done
exports.user_details = (req, res, next) => {
  const shopName = req.user.shopName;
  const userId = req.params.userId;

  User.findOne({ _id: userId, shopName: shopName })
    .select("_id name email phone shopName")
    .exec()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ Error: "User cannot found" });
    });
};

//done
exports.user_delete = (req, res, next) => {
  const shopName = req.user.shopName;
  const userId = req.params.userId;

  _helper.delete_one_object(req, res, next, User, shopName, userId);
};
