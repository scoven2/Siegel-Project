// dependencies
var express = require("express");
var path = require("path")

var session = require("express-sesion");
var passport = require("./config/passport");

// compress
var compression = require('compression')

// express app and listening port
var app = express();
var PORT = process.env.PORT || 8090;

// compress all responses
app.use(compression())

// requiring our models for syncing
var db = require("./models");

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up handlebars
var exphbs = require("express-handlebars");

//