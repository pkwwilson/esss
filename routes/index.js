var express = require('express');
var indrouter = express.Router();
var soap = require('soap');



console.log("Init Router");


/* GET home page. */
indrouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});







console.log("End Init Router");



module.exports = indrouter;
