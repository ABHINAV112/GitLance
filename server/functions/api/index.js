var express = require("express");
var router = express.Router();
var uploadRoute = require("./upload");
var solveRoute = require("./solve");
var paymentRoute = require("./payment");
module.exports = () => {
  router.use("/upload", uploadRoute());
  router.use("/solve", solveRoute());
  router.use("/payment",paymentRoute());
  return router;
};
