const express = require("express");
const router = express.Router();
const uploadRoute = require("./upload");
const solveRoute = require("./solve");
module.exports = () => {
  router.use("/upload", uploadRoute());
  router.use("/solve", solveRoute());
  return router;
};
