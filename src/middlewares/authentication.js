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

      console.log(user.type);
      if (user.type === "User") {
        await User.findById(user.userId)
          .select("ip")
          .exec()
          .then(async (result) => {
            console.log(result.ip);
            if (result.ip !== realIp)
              return res.status(401).json({
                Error: "Auth Failed",
              });
          });
      }

      if (user.type === "Courier") {
        await Courier.findById(user.userId)
          .select("ip")
          .exec()
          .then(async (result) => {
            console.log(result.ip);
            if (result.ip !== realIp)
              return res.status(401).json({
                Error: "Auth Failed",
              });
          });
      }

      next();
    });
  }
};
