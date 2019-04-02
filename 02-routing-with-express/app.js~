var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var path = require("path");
var session = require("express-session");
var morgan = require('morgan');
var exphbs = require('express-handlebars');

var setUpPassport = require("./setuppassport");
var routes = require("./routes");

var app = express();
mongoose.connect('mongodb://localhost/questions', {
  useCreateIndex: true,
  useNewUrlParser: true
}, function(err) {
  // if we failed to connect, abort
  if (err) throw err;
});
setUpPassport();

app.set("port", process.env.PORT || 3000);

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifvalue: function(a, b, options) {
      console.log("ifvalue being used");
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    /*partialsDir: [
        'shared/templates/',
        'views/partials/'
    	]*/
    partialsDir: 'views/partials/'
  }
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
