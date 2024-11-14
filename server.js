/********************************************
 * DO NOT EDIT THIS FILE
 * the verification process may break
 *******************************************/

var express = require("express");
var app = express();
app.disable("x-powered-by"); // Only need to disable once here
var fs = require("fs");
var path = require("path");

app.use(function (req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, content-type, Accept",
  });
  next();
});

app.get("/file/*?", function (req, res, next) {
  if (req.params[0] === ".env") {
    return next({ status: 401, message: "ACCESS DENIED" });
  }
  fs.readFile(path.join(__dirname, req.params[0]), function (err, data) {
    if (err) {
      return next(err);
    }
    res.type("txt").send(data.toString());
  });
});

var main = require("./myApp.js");
app.get("/app-info", function (req, res) {
  // List middlewares mounted on the '/' camper's app
  var appMainRouteStack = main._router.stack
    .filter((s) => s.path === "")
    .map((l) => l.name)
    // Filter out express default middlewares
    .filter(
      (n) => !(n === "query" || n === "expressInit" || n === "serveStatic")
    );

  // Filter out CORS Headers
  var hs = Object.keys(res.getHeaders()).filter(
    (h) => !h.match(/^access-control-\w+/)
  );
  var hObj = {};
  hs.forEach((h) => {
    hObj[h] = res.getHeaders()[h];
  });
  delete res.get("strict-transport-security"); // Retain only if necessary for verification
  res.json({ headers: hObj, appStack: appMainRouteStack });
});

app.get("/package.json", function (req, res, next) {
  fs.readFile(__dirname + "/package.json", function (err, data) {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

app.use(function (req, res, next) {
  res.status(404).type("txt").send("Not Found");
});

module.exports = app;

/********************************************
 * DO NOT EDIT THIS FILE
 * the verification process may break
 *******************************************/
