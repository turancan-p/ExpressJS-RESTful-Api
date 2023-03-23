const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Courier = require("../models/courier");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (typeof token !== "undefined") {
    if (token == null) {
      return res.status(401).json({
        Error: "Auth Failed",
      });
    }
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const realIp = ip.split(",")[0];

    const accessToken = token && token.split(" ")[1];
    jwt.verify(accessToken, process.env.AUTH_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({
          Error: "Auth Failed",
        });
      }
      req.user = user;

      if (user.type === "User") {
        await User.findById(user.userId)
          .select("ip accessToken")
          .exec()
          .then(async (result) => {
            if (!result) {
              return res.status(401).json({
                Error: "Auth Failed",
              });
            } else if (accessToken !== result.accessToken) {
              return res.status(401).json({
                Error: "Auth Failed",
              });
            } else if (result.ip !== realIp) {
              return res.status(401).json({
                Error: "Auth Failed",
              });
            } else {
              next();
            }
          });
      }

      if (user.type === "Courier") {
        await Courier.findById(user.userId)
          .select("ip accessToken")
          .exec()
          .then(async (result) => {
            if (!result) {
              return res.status(401).json({
                Error: "Auth Failed",
              });
            } else if (accessToken !== result.accessToken) {
              return res.status(401).json({
                Error: "Auth Failed",
              });
            } else if (result.ip !== realIp) {
              return res.status(401).json({
                Error: "Auth Failed",
              });
            } else {
              next();
            }
          });
      }
    });
  }
};
