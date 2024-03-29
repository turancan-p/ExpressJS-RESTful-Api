const mongoose = require("mongoose");

const courierSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    shopName: { type: String, required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    authorization: { type: String, default: "Courier" },
    ip: { type: String },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Courier", courierSchema);
