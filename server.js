// dependencies
var express = require("express");
var path = require("path")

var session = require("express-sesion");
var passport = require("./config/passport");

var compression = require('compression')

var app = express();
var PORT = process.env.PORT || 8090;

app.use(compression())