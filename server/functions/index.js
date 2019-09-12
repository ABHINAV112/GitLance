const functions = require("firebase-functions");
const cors = require('cors')({origin: true});
const express = require("express");
const app = express();
const apis = require("./api");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
app.use(bodyParser.json());

app.use(cors);
app.use("/api", apis());
// app.get("*",function(req,res){
//     return res.send(__dirname+'/build/index.html')
// })
exports.app = functions.https.onRequest(app);
