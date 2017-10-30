var express = require('express');
var router = express.Router();
var soap = require('soap');



console.log("Init Router");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});







console.log("End Init Router");



module.exports = router;
