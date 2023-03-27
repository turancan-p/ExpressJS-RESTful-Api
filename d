[1mdiff --git a/src/controllers/user.js b/src/controllers/user.js[m
[1mindex 3ce9ae2..3085d2c 100644[m
[1m--- a/src/controllers/user.js[m
[1m+++ b/src/controllers/user.js[m
[36m@@ -1,5 +1,5 @@[m
 const mongoose = require("mongoose");[m
[31m-const User = require("../models/user");[m
[32m+[m[32mconst { User } = require("../models/user");[m
 [m
 const bcrypt = require("bcrypt");[m
 [m
[1mdiff --git a/src/models/user.js b/src/models/user.js[m
[1mindex 57601fa..69cb1ef 100644[m
[1m--- a/src/models/user.js[m
[1m+++ b/src/models/user.js[m
[36m@@ -21,4 +21,4 @@[m [mconst userSchema = mongoose.Schema([m
   { versionKey: false }[m
 );[m
 [m
[31m-module.exports = mongoose.model("User", userSchema);[m
[32m+[m[32mmodule.exports.User = mongoose.model("User", userSchema);[m
[1mdiff --git a/src/utils/helper.util.js b/src/utils/helper.util.js[m
[1mindex a0a9c2b..63c0830 100644[m
[1m--- a/src/utils/helper.util.js[m
[1m+++ b/src/utils/helper.util.js[m
[36m@@ -22,7 +22,7 @@[m [mmodule.exports = {[m
     await Object.find({ shopName: shopName })[m
       .exec()[m
       .then((results) => {[m
[31m-        return res.status(200).json(results);[m
[32m+[m[32m        return res.status(200).json({ Response: result });[m
       });[m
   },[m
   get_one_data: async (req, res, next, Object, shopName, id) => {[m
[36m@@ -36,7 +36,7 @@[m [mmodule.exports = {[m
       .then((results) => {[m
         if (results === null) return res.status(500).json("Data not found");[m
 [m
[31m-        return res.status(200).json(results);[m
[32m+[m[32m        return res.status(200).json({ Response: result });[m
       });[m
   },[m
   create_one_object: async (req, res, next, Object, shopName, jsonData) => {[m
[36m@@ -59,7 +59,7 @@[m [mmodule.exports = {[m
     const object = new Object(jsonData);[m
 [m
     object.save().then((result) => {[m
[31m-      return res.status(200).json(result);[m
[32m+[m[32m      return res.status(200).json({ Response: result });[m
     });[m
   },[m
   update_one_object: async (req, res, next, Object, shopName, id) => {[m
[36m@@ -127,7 +127,7 @@[m [mmodule.exports = {[m
 [m
     const object = new Object(jsonData);[m
     object.save().then((result) => {[m
[31m-      return res.status(200).json(result);[m
[32m+[m[32m      return res.status(200).json({ Response: result });[m
     });[m
   },[m
   //just for get courier orders[m
[36m@@ -152,7 +152,7 @@[m [mmodule.exports = {[m
     })[m
       .exec()[m
       .then((results) => {[m
[31m-        return res.status(200).json(results);[m
[32m+[m[32m        return res.status(200).json({ Result: results });[m
       });[m
   },[m
 };[m
