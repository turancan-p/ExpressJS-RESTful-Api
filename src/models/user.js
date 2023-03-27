const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    shopName: { type: String, required: true, unique: true },
    authorization: { type: String, default: "User" },
    ip: { type: String, default: "" },
    accessToken: { type: String, default: "" },
  },
  { versionKey: false }
);

module.exports.User = mongoose.model("User", userSchema);
