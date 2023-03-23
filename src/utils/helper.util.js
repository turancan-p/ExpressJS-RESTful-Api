const jwt = require("jsonwebtoken");
const env = require("dotenv/config");
const { default: mongoose } = require("mongoose");

module.exports = {
  createAccessToken: (data) => {
    return (token = jwt.sign(data, process.env.AUTH_SECRET, {
      expiresIn: "1d",
    }));
  },
  createRefreshToken: (data) => {
    return (token = jwt.sign(data, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    }));
  },
  get_all_data: async (req, res, next, Object, shopName) => {
    if (!Object && shopName) {
      return res.status(404).json({
        Error: "Inputs must be filled",
      });
    }
    await Object.find({ shopName: shopName })
      .exec()
      .then((results) => {
        return res.status(200).json(results);
      });
  },
  get_one_data: async (req, res, next, Object, shopName, id) => {
    if (!(Object && shopName && id)) {
      return res.status(404).json({
        Error: "Inputs must be filled",
      });
    }
    Object.findOne({ _id: id, shopName: shopName })
      .exec()
      .then((results) => {
        if (results === null) return res.status(500).json("Data not found");

        return res.status(200).json(results);
      });
  },
  create_one_object: async (req, res, next, Object, shopName, jsonData) => {
    if (!(Object && shopName && jsonData)) {
      return res.status(404).json({
        Error: "Inputs must be filled",
      });
    }
    const checkOldObject = await Object.find({
      shopName: shopName,
      name: jsonData.name,
    });

    if (checkOldObject.length >= 1) {
      return res.status(500).json({ Error: "Already exist" });
    }

    jsonData["_id"] = new mongoose.Types.ObjectId();
    jsonData["shopName"] = shopName;
    const object = new Object(jsonData);

    object.save().then((result) => {
      return res.status(200).json(result);
    });
  },
  update_one_object: async (req, res, next, Object, shopName, id) => {
    if (!(Object && shopName && id)) {
      return res.status(404).json({
        Error: "Inputs must be filled",
      });
    }
    const updateOpts = {};

    for (const opts of req.body) {
      updateOpts[opts.propName] = opts.value;
    }

    Object.updateOne({ _id: id, shopName: shopName }, { $set: updateOpts })
      .exec()
      .then((result) => {
        if (result.modifiedCount <= 0) {
          return res.status(500).json({ Error: "Update failed" });
        }
        return res.status(200).json({ Response: "Updated successfully" });
      });
  },
  delete_one_object: async (req, res, next, Object, shopName, id) => {
    if (!(Object && shopName && id)) {
      return res.status(404).json({
        Error: "Inputs must be filled",
      });
    }
    Object.findOneAndDelete({ _id: id, shopName: shopName })
      .exec()
      .then((result) => {
        if (!result) {
          return res.status(500).json({ Error: "Not found" });
        }
        return res.status(200).json({ Response: "Deleted successfully" });
      });
  },
  //just for new order
  create_new_order: async (
    req,
    res,
    next,
    Object,
    shopName,
    jsonData,
    ProductObject
  ) => {
    if (!(Object && shopName && jsonData)) {
      return res.status(500).json({ Error: "Inputs must be filled" });
    }
    let totalPrice = 0;
    for (const x in jsonData.orderList) {
      console.log(jsonData.orderList[x]);
      await ProductObject.findById(jsonData.orderList[x].productId)
        .exec()
        .then((product) => {
          totalPrice += product.price * jsonData.orderList[x].quantity;
        });
    }

    jsonData["_id"] = new mongoose.Types.ObjectId();
    jsonData["shopName"] = shopName;
    jsonData["totalPrice"] = totalPrice;

    const object = new Object(jsonData);
    object.save().then((result) => {
      return res.status(200).json(result);
    });
  },
  //just for get courier orders
  get_courier_orders: async (
    req,
    res,
    next,
    Object,
    shopName,
    courierId,
    orderStatus
  ) => {
    if (!Object && shopName && courierId && orderStatus) {
      return res.status(404).json({
        Error: "Inputs must be filled",
      });
    }
    Object.find({
      shopName: shopName,
      courierId: courierId,
      orderStatus: orderStatus,
    })
      .exec()
      .then((results) => {
        return res.status(200).json(results);
      });
  },
};
