const express = require("express");

const couriers = require("./routes/couriers");
const customers = require("./routes/customers");
const orders = require("./routes/orders");
const products = require("./routes/products");
const users = require("./routes/users");

const Route = express.Router();

Route.use("/user", users).use("/products", products).use("/orders", orders);
// .use("/courier", checkAuthentication, couriers)
// .use("/customer", checkAuthentication, customers)

module.exports = Route;
