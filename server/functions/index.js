var functions = require("firebase-functions");
var cors = require('cors')({origin: true});
var express = require("express");
var app = express();
var apis = require("./api");
var bodyParser = require("body-parser");
var admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
app.use(bodyParser.json());

app.use(cors);
app.use("/api", apis());
// app.get("*",function(req,res){
//     return res.send(__dirname+'/build/index.html')
// })
exports.app = functions.https.onRequest(app);

exports.setMoney = functions.auth.user().onCreate(async (user) => {
  // db.collection('money').doc('')
  var db = admin.firestore();
  console.log(user);
  db.collection('money').doc(user.uid).set({'money':50});
  return ('success');
});