const express = require("express");
var cors = require("cors");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("dotenv").config();
var aws = require("aws-sdk");
aws.config.update({
  region: "us-east-1", // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

var comprehend = new aws.Comprehend({
  apiVersion: "2017-11-27",
  region: "us-east-1",
});

app.use(cors());

app.get("/api/", function (req, res) {
  res.json({ success: true });
});

app.post("/api/analyse", function (req, res) {
  const { sentence } = req.body;
  var params = {
    LanguageCode: "en",
    Text: sentence,
  };
  comprehend.detectSentiment(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else res.json({ result: data.Sentiment });
  });
});

module.exports = app;
