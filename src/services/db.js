const mysql = require("mysql");
const config = require("../configs/config");
const mongoose = require("mongoose");

exports.mysql_connection = () => {
  const connection = mysql.createConnection(config.database.mysql);

  connection.connect((error) => {
    if (error) console.log(`Error: ${error}`);
    console.log("\n MYSQL Connected! \n");
  });
};

exports.postgresql_connection = () => {};

exports.mongodb_connection = () => {
  const options = {
    dbName: "mainApp",
  };
  const conn = mongoose
    .connect(config.database.mongodb, options)
    .then((res) => console.log("\n MongoDB Connected! \n"))
    .catch((error) => console.log(`Error: ${error}`));
};

exports.aws_connection = () => {};
