var app = angular.module('txncheck', ['ui.router']);

app.factory('posts', [function(){
                      var o = {
                      posts: [{title: 'hello', link:'www.com', upvotes: 5}]
                      };
                      return o;
                      }]);


app.factory('menu', [function(){
                      var o = {

                      menu: [   
				{title: 'Client Information', stateid:'clientmnu'},
				{title: 'Customer Self Service', stateid:'selfmnu'},
				{title: 'Administrator Functions', stateid:'admnmnu'},
                     		{title: 'Settings', stateid:'settmnu'}         ]
				};
                      return o;
                      }]);


app.config([
            '$stateProvider',
            '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
            
            
            $stateProvider
            .state('init', {
                   url: '/init',
                   templateUrl: '/init.html',
                   controller: 'initCtrl'
                   });


            $stateProvider
            .state('auth', {
                   url: '/auth',
                   templateUrl: '/auth.html',
                   controller: 'authCtrl'
                   });

            $stateProvider
            .state('clientmnu', {
                   url: '/clientmnu',
                   templateUrl: '/clientmnu.html',
                   controller: 'clientvCtrl'
                   });
            $stateProvider
            .state('clientdet', {
                   url: '/clientdet:sharedKey',
                   templateUrl: '/clientdet.html',
                   controller: 'clientdetCtrl'
                   });
            $stateProvider
            .state
		('selfmnu', {
                   url: '/selfmnu',
                   templateUrl: '/selfmnu.html',
                   controller: 'selfvCtrl'
                   });
            $stateProvider
            .state
		('selfno', {
                   url: '/selfno:sharedKey',
                   templateUrl: '/selfno.html',
                   controller: 'selfnoCtrl'
                   });
            $stateProvider
            .state
		('selfyes', {
                   url: '/selfyes:sharedKey',
                   templateUrl: '/selfyes.html',
                   controller: 'selfvCtrl'
                   });
            $stateProvider
            .state
		('selfadd', {
                   url: '/selfadd:sharedKey',
                   templateUrl: '/selfadd.html',
                   controller: 'selfaddCtrl'
                   });
            $stateProvider
            .state
		('admnmnu', {
                   url: '/admnmnu',
                   templateUrl: '/admnmnu.html',
                   controller: 'admnvCtrl'
                   });
            $stateProvider
            .state
		('settmnu', {
                   url: '/settmnu',
                   templateUrl: '/settmnu.html',
                   controller: 'settvCtrl'
                   });

            $stateProvider
            .state('soaplistv', {
                   url: '/soaplistv',
                   templateUrl: '/soaplistv.html',
                   controller: 'settvCtrl'
                   });

            $stateProvider
            .state('soapaddv', {
                   url: '/soapaddv',
                   templateUrl: '/soapaddv.html',
                   controller: 'settvCtrl'
                   });

            $stateProvider
            .state('soapresetv', {
                   url: '/soapresetv',
                   templateUrl: '/soapresetv.html',
                   controller: 'settvCtrl'
                   });

            
            $stateProvider
            .state('home', {
                   url: '/home',
                   templateUrl: '/home.html',
                   controller: 'MainCtrl'
                   });

            $stateProvider
            .state('about', {
                   url: '/about',
                   templateUrl: '/about.html',
                   controller: 'MainCtrl'
                   });
  
            
            $urlRouterProvider.otherwise('init');
            }]);


app.controller('initCtrl', [
			    '$scope',
			    '$state',
			    'menu',
			
			    function($scope, $state, menu){

                            $scope.menu = menu.menu;

                            $scope.initialisepage = function(menu){
                            $state.go(menu.stateid);
                            };

                            }]);








app.controller('authCtrl', [
                             '$scope',
                             '$http',
                             function($scope, $http){
          


    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/didclients')
        .success(function(data) {
            $scope.didclients = data;
            console.log(data);
        })                   
        .error(function(data) {
            console.log('Error: ' + data);
        });


                             }]);


// settmnu control

app.controller('settvCtrl', [
                             '$scope',
                             '$http',
                             function($scope, $http){
          

    $scope.formData = {};

    // when landing on the page, get all soapsettings and show them
    $http.get('/api/soaplist')
        .success(function(data) {
            $scope.soapdbs = data;
            console.log(data);
        })                   
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.addsoap = function() {
        $http.post('/api/soaplist', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.soapdbs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deletesoap = function(id) {
        $http.delete('/api/soaplist/' + id)
            .success(function(data) {
                $scope.txndbs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // soap reset
    $scope.soapreset = function() {
	console.log("Soap Reset");
        $http.delete('/api/soaplistclear/')
            .success(function(data) {
                $scope.txndbs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        $http.post('/api/soaplistdef', $scope.bulkformData)
            .success(function(data) {
 
                $scope.soapdbs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    // delete a todo after checking it
    $scope.deletetxn = function() {
        $http.delete('/api/soaplistclear/')
            .success(function(data) {
                $scope.txndbs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };



                             }]); // end control



// selfvCtrl control

app.controller('selfvCtrl', [
                             '$scope',
			     '$state',
                             '$stateParams',
			     '$http',
                             function($scope, $state, $stateParams, $http){
                                                          
                             
                             
                             $scope.checksharedKey = function(){
                             if($scope.sharedKeyInput === '') { return; }

				var usesharedKey = $scope.sharedKeyInput;
	
   				 var jsonreqobj = JSON.stringify({ "soapref" : "isClientPresent" , 
				      "args" : { "sharedKey" : $scope.sharedKeyInput } });
			console.log("jsonreq: " + jsonreqobj);			
  			  $http.post('/api/callsoap/' + jsonreqobj)
        			.success(function(data) {
            			console.log(data);
            			$scope.clientPresenceresultCode = data.return.resultCode;

switch($scope.clientPresenceresultCode) {
    case "97":
        //{ alert("97 - not present") };
	$state.go('selfno', ({sharedKey : usesharedKey }) );
        break;
    case "503":
        { alert("503 - client is present") };
        break;
    default:
        { alert("unknown") }; 
}; 

	    			 // if($scope.clientPresenceresultCode = "97") { $state.go('selfno', ({sharedKey : usesharedKey }) ); } // 503 means it is present
        			})                   
        			.error(function(data) {
            			console.log('Error: ' + data);
        			});

//switch($scope.clientPresenceresultCode) {
//    case "97":
//        { alert("97 - not present") };
//	$state.go('selfno', ({sharedKey : usesharedKey }) );
//        break;
//    case "503":
//        { alert("503 - client is present") };
//        break;
//    default:
//        { alert("unknown") }; 
//}; 
				

                             }; // end checksharedKey
                             
                             
                             }]); // end selfvCtrl

// selfnoCtrl control

app.controller('selfnoCtrl', [
                             '$scope',
			     '$state',
                             '$stateParams',
			     '$http',
                             function($scope, $state, $stateParams, $http){
                                                          
                             
                             $scope.itemsharedKey = $stateParams.sharedKey;
				console.log("skey: " + $scope.itemsharedKey);


                             $scope.gotoadd = function(){
  				$state.go('selfadd', ({sharedKey : $scope.itemsharedKey }) );
                             }; // end checksharedKey
                             
                             
                             }]); // end selfvCtrl



// selfyesCtrl control

app.controller('selfyesCtrl', [
                             '$scope',
			     '$state',
                             '$stateParams',
			     '$http',
                             function($scope, $state, $stateParams, $http){
                                                          
                             
                             $scope.itemsharedKey = $stateParams.sharedKey;
				console.log("skey: " + $scope.itemsharedKey);


                             $scope.gotoadd = function(){
  				$state.go('selfadd', ({sharedKey : $scope.itemsharedKey }) );
                             }; // end checksharedKey
                             
                             
                             }]); // end selfvCtrl





// selfaddCtrl control

app.controller('selfaddCtrl', [
                             '$scope',
			     '$state',
                             '$stateParams',
			     '$http',
                             function($scope, $state, $stateParams, $http){
                                                          
                             
                             $scope.itemsharedKey = $stateParams.sharedKey;
			     var useskey = $stateParams.sharedKey;
				console.log("skey: " + $scope.itemsharedKey);


                             $scope.selfservadd = function( skey, busid, mail, cell ){

    var jsonreqobj = JSON.stringify({ "soapref" : "createClient" , "args" : { "sharedKey" : useskey, "businessIdentifier" : busid , "mail" : mail , "cellPhoneNumber" : cell } });
	console.log(jsonreqobj);

    // when landing on the page, call callsoap with param of retrieveClientsCount
    $http.post('/api/callsoap/' + jsonreqobj)
        .success(function(data) {
            console.log(data);
            $scope.clientcreateresultCode = data.createClientResponse.resultCode;
		if($scope.clientcreateresultCode = "1020") { alert("Successfully Added") };       
	    //$scope.clientLists = $scope.calltwofunction();
	    $scope.calltwofunction();
        })                   
        .error(function(data) {
            console.log('Error: ' + data);
        }); 
  				
                             }; // end selfservadd
                             
                             
                             }]); // end selfvCtrl



// clientmenu control


app.controller('clientvCtrl', [
                             '$scope',
                             '$http',
			     '$state',

                             function($scope, $http, $state){
          

    $scope.formData = {};
    $scope.clientCount = "<Fetching>";


    var jsonreqobj = JSON.stringify({ "soapref" : "retrieveClientsCount" , "args" : "" });
	console.log(jsonreqobj);

    // when landing on the page, call callsoap with param of retrieveClientsCount
    $http.post('/api/callsoap/' + jsonreqobj)
        .success(function(data) {
            console.log(data);
            $scope.clientCountresultCode = data.return.resultCode;
	    $scope.clientCount = data.return.clientsCount;
	    //$scope.clientLists = $scope.calltwofunction();
	    $scope.calltwofunction();
        })                   
        .error(function(data) {
            console.log('Error: ' + data);
        });


$scope.calltwofunction = function () {

    var jsonreqobj = JSON.stringify({ "soapref" : "retrieveClientsList" , 
				      "args" : { "retrieveClientRequest" : { "pagination" : { "pageNumber" : "1" , "pageSize" : $scope.clientCount } } } });
	console.log("jsonreq: " + jsonreqobj);
    $http.post('/api/callsoap/' + jsonreqobj)
        .success(function(data) {
            console.log(data);
            $scope.clientlistcode = data.retrieveClientsListResponse.resultCode;
	    $scope.clientlist = data.retrieveClientsListResponse.clients;
        })                   
        .error(function(data) {
            console.log('Error: ' + data);
        });
   }; //end calltwofunction



                             }]); // end control

// clientdet control


app.controller('clientdetCtrl', [
                             '$scope',
                             '$http',
			     '$state',
			     '$stateParams',

                             function($scope, $http, $state, $stateParams){


    itemsharedkey = $stateParams.sharedKey;

    var jsonreqobjdet = JSON.stringify({ "soapref" : "retrieveClientInformation" , 
				      "args" : { "sharedKey" : itemsharedkey } });
	console.log("jsonreq: " + jsonreqobjdet);
    $http.post('/api/callsoap/' + jsonreqobjdet)
        .success(function(data) {
            console.log(data);
            $scope.clientinfocode = data.retrieveClientInformationResponse.resultCode;
	    $scope.clientinfo = data.retrieveClientInformationResponse.client;
	    console.log("info: " + $scope.clientinfo);
        })                   
        .error(function(data) {
            console.log('Error: ' + data);
        });

             
                             
                             }]); // end control






// clientst control


app.controller('clientstCtrl', [
                             '$scope',
                             '$http',

                             function($scope, $http){
          

    $scope.formData = {};

    // when landing on the page, get all stats and show them

    $http.get('/api/clientstats')
        .success(function(data) {
            $scope.clientstatinfo = data;
            console.log(data);

	    //2nd call
	    $http.get('/api/genclientstats')
	        .success(function(gendata) {
	            $scope.genclientstatinfo = gendata;
	            console.log(gendata);
	        })                   
	        .error(function(gendata) {
	            console.log('Error: ' + gendata);
	        });
		//end 2nd call

        })                   
        .error(function(data) {
            console.log('Error: ' + data);
        });




             
                             
                             }]); // end control












                           
                             
                             
                  

