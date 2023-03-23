const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    shopName: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    adress: { type: String, required: true },
    latitude: { type: mongoose.Decimal128, required: true },
    longtitude: { type: mongoose.Decimal128, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Customer", customerSchema);
