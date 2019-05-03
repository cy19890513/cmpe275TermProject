var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var http = require('http');
var cors = require('cors');

var indexRouter = require("./app_server/routes/index");

var app = express();

var mongo = require("mongodb");
var monk = require("monk");
var db = monk("willsuwei.com:27017/cmpe280");

// view engine setup
// app.set("views", path.join(__dirname, "/app_server/"));
// app.set("view engine", "jade");

// Deal with CORS cross domain issue
// var whitelist = ['http://localhost:3000', 'http://localhost:3001']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions));

// Allow all domains
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "Its a secret!" }));
app.use(express.static(path.join(__dirname, "app_server/build")));

app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use("/", indexRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// module.exports = app;

app.listen(3000);
