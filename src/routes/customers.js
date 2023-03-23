const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer");

const checkAuthentication = require("../middlewares/authentication");

router.post("/", checkAuthentication, customerController.create_new_customer);

module.exports = router;
