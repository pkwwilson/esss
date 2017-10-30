var express = require('express');
var router = express.Router();
var soap = require('soap');



console.log("Init Router");

var soapdb = require('./models/soaplistmodel');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





console.log("Start api setup");
    // api ---------------------------------------------------------------------
    // get all clients
    router.get('/api/soaplist', function(req, res) {

        // use mongoose to get all soapdbs in the database
        soapdb.find(function(err, soapdbs) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(soapdbs); // return all  in JSON format
        });
    });

    // create  and send back all after creation
    router.post('/api/soaplist', function(req, res) {

        // create, information comes from AJAX request from Angular
        soapdb.create({
            soapfunction : req.body.soapfunction,
            soapname : req.body.soapname,
            wsdlurl : req.body.wsdlurl,
            endpointurl : req.body.endpointurl
        }, function(err, soaps) {
            if (err)
                res.send(err);

            // get and return all  after you create another
            soapdb.find(function(err, soapdbs) {
                if (err)
                    res.send(err)
                res.json(soapdbs);
            });
        });

    });

    // delete 
    router.delete('/api/soaplist/:soapdb_id', function(req, res) {
        soapdb.remove({
            _id : req.params.soapdb_id
        }, function(err, soaps) {
            if (err)
                res.send(err);

            // get and return all after you delete
            soapdb.find(function(err, soapdbs) {
                if (err)
                    res.send(err)
                res.json(soapdbs);
            });
        });
    });

    // delete all config
    router.delete('/api/soaplistclear', function(req, res) {
        soapdb.remove({
        }, function(err, soaps) {
            if (err)
                res.send(err);

            // get and return all  after you create another
            soapdb.find(function(err, soapdbs) {
                if (err)
                    res.send(err)
                res.json(soapdbs);
            });
        });
    });


    // add default config
    router.post('/api/soaplistdef', function(req, res) {
	console.log("here");
	//console.log(req.body);
	
	var soapdefarr = [ 
			   { "soapfunction" : "updateClient", "soapname" : "updateClient" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 
			   { "soapfunction" : "retrieveClientsCount", "soapname" : "retrieveClientsCount" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 
			   { "soapfunction" : "lockClient", "soapname" : "lockClient" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 
			   { "soapfunction" : "updateClientWithMail", "soapname" : "updateClientWithMail" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 
			   { "soapfunction" : "unlockClient", "soapname" : "unlockClient" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 
			   { "soapfunction" : "createClient", "soapname" : "createClient" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 
			   { "soapfunction" : "deleteClient", "soapname" : "deleteClient" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 			   { "soapfunction" : "retrieveClientsList", "soapname" : "retrieveClientsList" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 			   { "soapfunction" : "retrieveClientInformation", "soapname" : "retrieveClientInformation" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" }, 
			   { "soapfunction" : "isClientPresent", "soapname" : "isClientPresent" , 
				"wsdlurl" : "http://demotfp.easysol.net/detect/services/WSClientService?wsdl" , "endpointurl" : "http://demotfp.easysol.net/detect/services/WSClientService" },
		{ 'soapfunction' : 'unregisterDevice' , 'soapname' : 'unregisterDevice' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' },
		{ 'soapfunction' : 'requestAuthenticationToClient' , 'soapname' : 'requestAuthenticationToClient' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' },
		{ 'soapfunction' : 'activateRegisteredDevice' , 'soapname' : 'activateRegisteredDevice' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' },
		{ 'soapfunction' : 'retrieveMobilePushActivationCode' , 'soapname' : 'retrieveMobilePushActivationCode' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' },
		{ 'soapfunction' : 'retrieveMobilePushActivationQRCode' , 'soapname' : 'retrieveMobilePushActivationQRCode' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' },
		{ 'soapfunction' : 'retrieveAuthenticationRequestStatus' , 'soapname' : 'retrieveAuthenticationRequestStatus' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' },
		{ 'soapfunction' : 'sendMobilePushActivationCode' , 'soapname' : 'sendMobilePushActivationCode' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' },
		{ 'soapfunction' : 'retrieveForClientAllRegisteredDevices' , 'soapname' : 'retrieveForClientAllRegisteredDevices' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' },
		{ 'soapfunction' : 'deactivateAllRegisteredDevicesByClient' , 'soapname' : 'deactivateAllRegisteredDevicesByClient' , 
				'wsdlurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService?wsdl' , 'endpointurl' : 'http://demotfp.easysol.net/detect/services/WSDetectPushAuthService' }

			];

        
        soapdb.insertMany(
            soapdefarr
            , function(err, soaps) {
            if (err)
                res.send(err);

            // get and return all after you create another
            soapdb.find(function(err, soapdbs) {
                if (err)
                    res.send(err)
                res.json(soapdbs);
            });
        });

    });



    // call an ES SOAP API


    router.post('/api/callsoap/:soapobj', function(req, res) {
//    router.get('/api/callsoap/', function(req, res) {
        // call soap
	console.log("in callsoap");

	var inpobj = JSON.parse(req.params.soapobj);
	var name = "soapfunction";
	//var value = "retrieveClientsCount";
	var value = inpobj.soapref;
	console.log("value: " + value);

	var query = {};
	query[name] = value;

	soapdb.findOne(query, function(err, soapitem) {
	console.log("in findOne");
	

  
	// if there is an error retrieving, send the error. nothing after res.send(err) will execute

	if (err)
		res.send(err)
		var queryresult = soapitem; // return all  in JSON format
	    console.log("soapitem is: " + queryresult);

		console.log("out of find");
		//var wsdlurl = 'http://demotfp.easysol.net/detect/services/WSClientService?wsdl';
		var wsdlurl = queryresult.wsdlurl;
		var args = inpobj.args;
		console.log("args: " + JSON.stringify(inpobj.args));
		//var args = {};
		var clientOptions = { };

		soap.createClient(wsdlurl, clientOptions, function(err, client) {
		if(err)
			console.error(err);
			else {
			client.wsdl.xmlnsInEnvelope = client.wsdl._xmlnsMap();	

			switch (value) 	{
			  case 'retrieveClientsCount':
				client.retrieveClientsCount(inpobj.args, function(err, result) {			
				  if (err)
	                              res.send(err)
				 res.send(result);
				 console.log(client.lastRequest);
				 });	
    			  break;
			  case 'retrieveClientsList':
				client.retrieveClientsList(inpobj.args, function(err, result) {			
				  if (err)
	                              res.send(err)
				 res.send(result);
				 console.log(client.lastRequest);
				 });	
    			  break;
			  case 'retrieveClientInformation':
				client.retrieveClientInformation(inpobj.args, function(err, result) {			
				  if (err)
	                              res.send(err)
				 res.send(result);
				 console.log(client.lastRequest);
				 });	
    			  break;
			  case 'isClientPresent':
				client.isClientPresent(inpobj.args, function(err, result) {			
				  if (err)
	                              res.send(err)
				 res.send(result);
				 console.log(client.lastRequest);
				 });	
    			  break;
			  case 'createClient':
				client.createClient(inpobj.args, function(err, result) {			
				  if (err)
	                              res.send(err)
				 res.send(result);
				 console.log(client.lastRequest);
				 });	
    			  break;
			  default:
			    console.log('No match in case statement');
			}


	}
  
  });


        });


  });




console.log("End Init SOAPAPI");



module.exports = router;
