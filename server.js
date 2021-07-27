// dependencies
var express = require("express");
var path = require("path")

var session = require("express-session");
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

app.engine("handlebars", exphbs({
    defaultLayout: "main",
}));
app.set("view engine", "handlebars");

// static directory
app.use(express.static("public"));

// use sessions to know the user's login status
app.use(session({ secret: "poohandshia", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// routes
require("./routes/html-routes.js")(app);
require("./routes/movie-api-routes.js")(app);
require("./routes/purchase-api-routes.js")(app);
require("./routes/shoppingcart-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// sync sequelize models and starting using express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("==> Listening on port %s. Visit http://localhost%s/ in your browser.", PORT, PORT);
    });
});