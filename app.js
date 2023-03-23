const express = require("express");
const bodyParser = require("body-parser");
const configs = require("./src/configs/config");
const logger = require("morgan");
const router = require("./src/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const mongoConnect = require("./src/services/db");

const mainDb = mongoConnect.mongodb_connection();

const app = express();
const port = configs.port;

app.listen(port, () => {
  console.log(`\n Server listening on port ${port} \n`);
});

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // or "https://turan-can.com" just your website
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // or "*" for allow any
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/", router);

app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

module.exports = app;
