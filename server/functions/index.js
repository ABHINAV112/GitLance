const functions = require('firebase-functions');

const express = require('express');
const app = express();
const apis = require('./api');
const routes = require('./routes');
app.use('/', routes());

app.use('/api', apis());

exports.app = functions.https.onRequest(app);

