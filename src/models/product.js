const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    shopName: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
