var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var path = require('path'); 
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var soap = require('soap');

var database = require('./db/config/database');

// routes =======================
var index   = require('./routes/index');
var users   = require('./routes/users');
var soapapi = require('./routes/SOAPapi');

var app = express();

console.log("Init didss");

console.log("connect db");
var promise = mongoose.connect(database.url, {
  useMongoClient: true,
  /* other options */
});
console.log("end connect db");

 
// view engine setup  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(favicon(path.join(__dirname + '/public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users); 

app.use('/', soapapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


console.log("End api setup");

module.exports = app;

// log startup message
console.log("Started txn");
