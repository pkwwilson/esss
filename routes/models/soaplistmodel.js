var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var soapdbSchema = new mongoose.Schema({
	soapfunction : String,
	soapname : String,
	wsdlurl : String,
	endpointurl : String

	});
 
module.exports = mongoose.model('soapdb', soapdbSchema);



