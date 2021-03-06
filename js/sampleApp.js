(function(){
	var sampleApp = angular.module('sampleModule', []);
	
	//sample controller which uses service to fetch the data
	sampleApp.controller('sampleController', ['$scope','$http','$log', function($scope, $http, $log){
		//var scope = this;
		$scope.data = {};
		$scope.httpProvider = $http;
		$scope.logProvider = $log;
		// Replace with your customerId	
		$scope.customerId = "$REPLACE_ME";

		// Replace with your directoryId	
		$scope.directoryId = "$REPLACE_ME";
		
		$scope.userName = null;
		$scope.admin_password =null;
		$scope.admin_userName = null;
		$scope.headerJWT = null;
		$scope.uuid = null;
		$scope.basicAccountInfo = null;
		$scope.create_card_name = null;
		$scope.lockuserName = null;
		$scope.lockuserDir = null;
		$scope.add_ToMultipleAccounts = null;
		$scope.add_roleToAccount = null;
		$scope.delete_roleFromAccount = null;
		$scope.delete_roleUUID= "00000000-0000-0000-0000-000000000000";
		$scope.lockuuid = "00000000-0000-0000-0000-000000000000";
		$scope.add_roleUUID = "00000000-0000-0000-0000-000000000000";
		$scope.deleteUserId = "00000000-0000-0000-0000-000000000000";
		$scope.change_uuid = "00000000-0000-0000-0000-000000000000";
		$scope.get_account_ByUuid = "00000000-0000-0000-0000-000000000000";
		$scope.ar_uuids = "00000000-0000-0000-0000-000000000000";
		$scope.add_roleToMultilpleUUID = "00000000-0000-0000-0000-000000000000";
		$scope.add_roleToAccountUUID = "00000000-0000-0000-0000-000000000000";
		
		$scope.authenticate = function() {
			$scope.logProvider.log('in authenticate');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			
			var requestJson = {
				"userName": $scope.userName, 
				"password": $scope.password
			}
			var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'authenticate',
				 data: requestJson
			}
			$scope.httpProvider(service).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.logProvider.log('success');
				$scope.logProvider.log(response.data);
				
				$scope.data = response.data;
				$scope.headerJWT = response.headers('Authorization');
				if(response.status == 200)
					$scope.uuid = response.data.data;
				else
					$scope.uuid = response.data.data.ac_tfa_uuid;
			  
			  }, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.logProvider.log('failure');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
				$scope.headerJWT = null;
				$scope.uuid = null;
			  });
		}

		$scope.authenticateTFA = function() {
			$scope.logProvider.log('in authenticateTFA');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;

			var requestJson = {
				"ac_tfa_uuid": $scope.uuid,
				"ac_tfa_type": 1,
				"ac_tfa_code": $scope.tfa_auth_code
			}
			var service = {
				 method: 'PUT',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/validateTFALogin',
				 data: requestJson
			}
			$scope.httpProvider(service).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.logProvider.log('success');
				$scope.logProvider.log(response.data);
				
				$scope.data = response.data;
				$scope.headerJWT = response.headers('Authorization');
				$scope.uuid = response.data.data;
			  
			  }, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.logProvider.log('failure');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
				$scope.headerJWT = null;
				$scope.uuid = null;
			  });
		}


		$scope.admin_authenticate = function() {
			$scope.logProvider.log('in authenticate admin');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			
			var requestJson = {
				"userName": $scope.admin_userName, 
				"password": $scope.admin_password
			}
            // admins are always present in the default directory
			var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/default/' + 'authenticate',
				 data: requestJson
			}
			$scope.httpProvider(service).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.logProvider.log('success');
				$scope.logProvider.log(response.data);
				
				$scope.data = response.data;
				$scope.headerJWT = response.headers('Authorization');
				$scope.uuid = response.data.data;
			  
			  }, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.logProvider.log('failure');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
				$scope.headerJWT = null;
				$scope.uuid = null;
			  });
		}
		
		$scope.getUserByName = function() {
			$scope.logProvider.log('in getUserByName');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {$scope.uuid, 
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + $scope.userName
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}
		
		$scope.logout = function() {
			$scope.logProvider.log('in logout');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				var requestJson = {
				  "true_client_ip": "",
				  "rest_client_ip": "",
				  "remote_ip": ""
				}
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/logout',
				 data: requestJson
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data.data);
					$scope.data = response.data;
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				});
			}
		}

		$scope.changePassword = function() {
			$scope.logProvider.log('in changePassword');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var requestJson = {
					"uuid": $scope.uuid, 
					"currentPassword": $scope.change_currentpassword,
					"newPassword": $scope.change_newpassword,
					"confirmPassword": $scope.change_confirmpassword
				}
				var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/changepassword',
				 data: requestJson
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}
		
		$scope.getBasicProfileByUUID = function() {
			$scope.logProvider.log('in getBasicProfileByUUID');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'accountbasic' + '/'+ $scope.uuid
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}
		$scope.getAccountHistory = function() {
			$scope.logProvider.log('in getAccountHistory');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'history' + '/uuid/' + $scope.uuid
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}
		$scope.searchByColumnName = function() {
			$scope.logProvider.log('in searchByColumnName');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var requestJson = {
					"columnName": $scope.search_columnName, 
					"value": $scope.search_value
				}
				var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/search',
				 data: requestJson
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.getAccountRoleByUUID = function() {
			$scope.logProvider.log('in getAccountRoleByUUID');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'accountrole' + '/'+ $scope.uuid
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.getAccountRolesByUUID = function() {
			$scope.logProvider.log('in getAccountRolesByUUID');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'accountroles' + '/'+ $scope.uuid
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}
	
		$scope.register = function() {
		var requestJson = {
			  "accountCredentials": {
			    "a_uuid": "",
			    "userName": $scope.userName_Register,
			    "password": $scope.password_Register,
			    "isLocked": false,
			    "attemptsRemain": "",
			    "a_tfa_type": $scope.a_tfa_type_Register,
			    "rest_client_ip": "",
			    "true_client_ip": "",
			    "remote_ip": ""
			  },
			  "accountCard": {
			    "ac_uuid": "",
			    "cardNumber": $scope.cardNumber_Register,
			    "cardnumber_last4": $scope.cardnumber_last4_Register,
			    "expiry": $scope.expiry_Register,
			    "vin": $scope.vin_Register,
			    "cardName": $scope.cardName_Register,
			    "pin": $scope.pin_Register,
			    "rest_client_ip": "",
			    "true_client_ip": "",
			    "remote_ip": ""
			  },
			  "accountDependent": {
			    "ad_uuid": "",
			    "firstName": $scope.firstName_ad_Register,
			    "lastName": $scope.lastName_ad_Register,
			    "relationship": $scope.relationship_ad_Register,
			    "rest_client_ip": "",
			    "true_client_ip": "",
			    "remote_ip": ""
			  },
			  "accountBasic": {
			    "ab_id": "",
			    "firstName": $scope.firstName_Register,
			    "middleName": $scope.middleName_Register,
			    "lastName": $scope.lastName_Register,
			    "address": $scope.address_Register,
			    "city": $scope.city_Register,
			    "state": $scope.state_Register,
			    "zip": $scope.zip_Register,
			    "dob": $scope.dob_Register,
			    "ssn": $scope.ssn_Register,
			    "email": $scope.email_Register,
			    "phonenum": $scope.phonenum_Register,
			    "tfa_phonenum": $scope.tfa_phonenum_Register,
			    "admin_uuid": "",
			    "rest_client_ip": "",
			    "true_client_ip": "",
			    "remote_ip": ""
			  },
			  "accountRole": {
			    "ar_uuid": "",
			    "roleName": $scope.roleName_Register,
			    "rest_client_ip": "",
			    "true_client_ip": "",
			    "remote_ip": ""
			  },
			  "rest_client_ip": "",
			  "true_client_ip": "",
			  "remote_ip": ""
			}

			//set the BA header
			$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerBA;
			
			var service = {
			 method: 'POST',
			 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId,
			 data: requestJson
			}
			$scope.httpProvider(service).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.logProvider.log('success');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
				$scope.uuid = response.data.data;
			  }, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.logProvider.log('failure');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
			  });
		}
	

		$scope.updateBasicProfile = function() {
			$scope.logProvider.log('in updateBasicProfile');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountbasic/' + $scope.uuid
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data.data);
					var basicAccountInfo = response.data.data;
					//make call to update the user profile
					var requestJson = {
						"ab_id": basicAccountInfo.ab_id, 
						  "firstName":$scope.update_firstName,
						  "middleName": $scope.update_middleName,
						  "lastName": $scope.update_lastName,
						  "address": $scope.update_address,
						  "city": $scope.update__city,
						  "state": $scope.update_state,
						  "zip": $scope.update_zip,
						  "dob": $scope.update_dob,
						  "ssn": $scope.update_ssn,
						  "email": $scope.update_email,
						  "phonenum": $scope.update_phoneNumber,
						  "tfa_phonenum": $scope.update_tfaPhoneNumber
					}
					var updateService = {
						method: 'PUT',
						url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountbasic',
						data: requestJson
					}
					$scope.httpProvider(updateService).then(function successCallback(response) {
						// this callback will be called asynchronously
						// when the response is available
						$scope.logProvider.log('updateService success');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  }, function errorCallback(response) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.logProvider.log('updateService failure');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  });					
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = "Unable to fetch basic user profile";
				  });
			}
		}

		$scope.createBasicProfile = function() {
			$scope.logProvider.log('in createBasicProfile');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
					var requestJson = {
						"ab_id": $scope.uuid, 
						  "firstName":$scope.create_firstName,
						  "middleName": $scope.create_middleName,
						  "lastName": $scope.create_lastName,
						  "address": $scope.create_address,
						  "city": $scope.create__city,
						  "state": $scope.create_state,
						  "zip": $scope.create_zip,
						  "dob": $scope.create_dob,
						  "ssn": $scope.create_ssn,
						  "email": $scope.create_email,
						  "phonenum": $scope.create_phoneNumber,
						  "tfa_phonenum": $scope.create_tfaPhoneNumber
					}
					var createBasicProfileService = {
						method: 'POST',
						url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountbasic',
						data: requestJson
					}
					$scope.httpProvider(createBasicProfileService).then(function successCallback(response) {
						// this callback will be called asynchronously
						// when the response is available
						$scope.logProvider.log('createBasicProfileService success');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  }, function errorCallback(response) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.logProvider.log('createBasicProfileService failure');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  });
			}
		}
	


		$scope.createAccountDependent = function() {
			$scope.logProvider.log('in createAccountDependent');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
					var requestJson = {

						"ad_uuid": $scope.uuid, 
						"firstName": $scope.create_dependent_first_Name,
						"lastName": $scope.create_dependent_last_Name,
						"relationship": $scope.create_dependent_relationship
					}
					var createAccountDependent = {
						method: 'POST',
						url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountdependent',
						data: requestJson
					}
					$scope.httpProvider(createAccountDependent).then(function successCallback(response) {
						// this callback will be called asynchronously
						// when the response is available
						$scope.logProvider.log('createAccountDependent success');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  }, function errorCallback(response) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.logProvider.log('createAccountDependent failure');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  });	
			}
		}

		$scope.updateAccountDependent = function() {
			$scope.logProvider.log('in updateAccountDependent');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
					//make call to update the user profile
					var requestJson = {
						"ad_uuid": $scope.uuid, 
						"firstName": $scope.update_dependent_first_Name,
						"lastName": $scope.update_dependent_last_Name,
						"relationship": $scope.update_dependent_relationship
					}
					var updateAccountDependent = {
						method: 'PUT',
						url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountdependent',
						data: requestJson
					}
					$scope.httpProvider(updateAccountDependent).then(function successCallback(response) {
						// this callback will be called asynchronously
						// when the response is available
						$scope.logProvider.log('updateAccountDependent success');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  }, function errorCallback(response) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.logProvider.log('updateAccountDependent failure');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  });	
			}
		}

		$scope.createAccountCard = function() {
			$scope.logProvider.log('in createAccountDependent');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
					//make call to update the user profile
					var requestJson = {
						"ac_uuid": $scope.uuid, 
						"cardNumber": $scope.create_card_number,
						"cardnumber_last4" : $scope.create_card_number_last_4,
						"expiry": $scope.create_card_expiry,
						"cardName": $scope.create_card_name,
						"pin": $scope.create_card_pin
					}
					var createAccountCard = {
						method: 'POST',
						url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountcard',
						data: requestJson
					}
					$scope.httpProvider(createAccountCard).then(function successCallback(response) {
						// this callback will be called asynchronously
						// when the response is available
						$scope.logProvider.log('createAccountCard success');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  }, function errorCallback(response) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.logProvider.log('createAccountCard failure');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  });
			}
		}

		$scope.updateAccountCard = function() {
			$scope.logProvider.log('in updateAccountCard');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
					//make call to update the user profile
					var requestJson = {
						"ac_uuid": $scope.uuid, 
						"cardNumber": $scope.update_card_number,
						"cardnumber_last4": $scope.update_card_number_last_4,
						"expiry": $scope.update_card_expiry,
						"cardName": $scope.update_card_name,
						"pin": $scope.update_card_pin
					}
					var updateAccountCard = {
						method: 'PUT',
						url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountcard',
						data: requestJson
					}
					$scope.httpProvider(updateAccountCard).then(function successCallback(response) {
						// this callback will be called asynchronously
						// when the response is available
						$scope.logProvider.log('createAccountDependent success');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  }, function errorCallback(response) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.logProvider.log('createAccountDependent failure');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  });
			}
		}

		$scope.getAccountsByRole = function() {
			$scope.logProvider.log('in getAccountsByRole');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var requestJson = {
						"roleName": $scope.getAccountsByRole_roleName
				}

				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'accounts' +  '/' + $scope.getAccountsByRole_roleName
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.addRole = function() {
			$scope.logProvider.log('in add role to the System');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
					var requestJson = {
						"roleName": $scope.add_roleName
				}
				var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/role',
				 data: requestJson
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.deleteRole = function() {
			$scope.logProvider.log('in delete role from the system');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var requestJson ={
					  "roleName": $scope.add_roleName,
					  "rest_client_ip": "",
					  "true_client_ip": "",
					  "remote_ip": ""
				}
				var service = {
				dataType: 'json',
				method: 'DELETE', 
				url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/role',
				data: requestJson,
				headers: {'Content-Type': 'application/json'},
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}


		$scope.addRoleToMultipleAccounts = function() {
			$scope.logProvider.log('in add role to the multiple accounts');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var uuids = $scope.add_roleToMultilpleUUID.split(',')
				var requestJson = {
					"ar_uuids": uuids,
					"roleName": $scope.add_ToMultipleAccounts,
					 "rest_client_ip": "",
					 "true_client_ip": "",
					 "remote_ip": ""
				}
				var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountrole' +'/multiuser',
				 data: requestJson
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.addRoleToAccount = function() {
			$scope.logProvider.log('in add role to Account');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
					var requestJson = {
						"ar_uuid": $scope.add_roleToAccountUUID,
						"roleName": $scope.add_roleToAccount
				}
				var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountrole',
				 data: requestJson
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.deleteRoleFromAccount = function() {
			$scope.logProvider.log('in delete role from Account');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var requestJson = {
						"ar_uuid": $scope.delete_roleUUID,
						"roleName": $scope.delete_roleFromAccount
				}
				var service = {
				dataType: 'json',
				method: 'DELETE', 
				url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/accountrole',
				data: requestJson,
				headers: {'Content-Type': 'application/json'},
				}

				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.getAccountByUUID = function() {
			$scope.logProvider.log('in getAccountsByRole');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var requestJson = {
						"uuid": $scope.get_account_ByUuid
				}

				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'uuid' + '/'+ $scope.get_account_ByUuid
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.getAcountsByRole = function() {
			$scope.logProvider.log('in getAcountsByRole');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			var requestJson = {
						"roleName": $scope.get_roleName
			}
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + $scope.roleName,
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.deleteUsers = function() {
			$scope.logProvider.log('in deleteUsers');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var deleteUuids = $scope.deleteUserId.split(',')
				var requestJson = {
					"userIds":  deleteUuids,
					"admin_uuid": "",
					 "rest_client_ip": "",
					 "true_client_ip": "",
					 "remote_ip": ""
				}

				var service = {
						method: 'POST',
						url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/deleteUser',
						data: requestJson
					}
					$scope.httpProvider(service).then(function successCallback(response) {
						// this callback will be called asynchronously
						// when the response is available
						$scope.logProvider.log('deleteUsers success');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  }, function errorCallback(response) {
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.logProvider.log('deleteUsers failure');
						$scope.logProvider.log(response.data);
						$scope.data = response.data;
					  });
				}
		}

		$scope.requestPasswordReset = function() {
			var requestJson = {
				"ch_username": $scope.forgot_password_user_Name, 

			}
			var service = {
			 method: 'POST',
			 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'forgotpassword',
			 data: requestJson
			}
			$scope.httpProvider(service).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.logProvider.log('success');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
			  }, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.logProvider.log('failure');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
			  });
		}


		$scope.resetPassword = function() {
			var requestJson = {
				"randomCode": $scope.reset_pwd_random_code, 
				"passWrd": $scope.reset_pwd_password,

			}
			var service = {
			 method: 'POST',
			 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'resetpassword',
			 data: requestJson
			}
			$scope.httpProvider(service).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.logProvider.log('success');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
			  }, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.logProvider.log('failure');
				$scope.logProvider.log(response.data);
				$scope.data = response.data;
			  });
		}

		$scope.getAllRoles = function() {
			$scope.logProvider.log('in getAcountsByRole');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'roles'
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.getAllUsers = function() {
			$scope.logProvider.log('in getAcountsByRole');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'GET',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/' + 'all'
				}
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}


		$scope.admin_lockUserName = function() {
			$scope.logProvider.log('in admin_lockUserName');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'PUT',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.lockuserNameDir + '/lockusername/' + $scope.lockuserName
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.admin_unlockUserName = function() {
			$scope.logProvider.log('in admin_unlockUserName');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'PUT',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.lockuserDir + '/unlockusername/' + $scope.lockuserName
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.admin_lockUUID = function() {
			$scope.logProvider.log('in admin_lockUUID');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
                var requestJson = {
                    "target_uuid": $scope.lockuuid, 
                }
				var service = {
				 method: 'PUT',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.lockuserDir + '/lockuuid',
                 data: requestJson
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.admin_unlockUUID = function() {
			$scope.logProvider.log('in admin_unlockUUID');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
                var requestJson = {
                    "target_uuid": $scope.lockuuid, 
                }
				var service = {
				 method: 'PUT',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.lockuserDir + '/unlockuuid',
                 data: requestJson
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  }, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
				  });
			}
		}

		$scope.enableTFAStep1 = function() {
			$scope.logProvider.log('in enableTFA');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				var requestJson = {
					"ac_tfa_uuid": $scope.uuid, 
					"acc_tfa_sms_phonenum": $scope.tfa_phonenum,
					"ac_tfa_type": "1"
				}				
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/sendSmsTFACode',
				 data: requestJson
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data.data);
					$scope.data = response.data;
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = "Unable to send TFA token to this phone";
				});
			}
		}
		$scope.enableTFAStep2 = function() {
			$scope.logProvider.log('in enableTFA');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				var requestJson = {
					"ac_tfa_uuid": $scope.uuid, 
					"acc_tfa_sms_phonenum": $scope.tfa_phonenum,
					"ac_tfa_code": $scope.tfa_code,
					"ac_tfa_type": "1"
				}				
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'PUT',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/enableSmsTFA',
				 data: requestJson
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data.data);
					$scope.data = response.data;
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
					// $scope.data = "Unable to enable TFA";
				});
			}
		}

		$scope.disableTFAStep1 = function() {
			$scope.logProvider.log('in enableTFA');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				var requestJson = {
					"ac_tfa_uuid": $scope.uuid, 
					"acc_tfa_sms_phonenum": $scope.tfa_phonenum,
					"ac_tfa_type": "1"
				}				
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'POST',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/sendSmsTFACode',
				 data: requestJson
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data.data);
					$scope.data = response.data;
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = "Unable to send TFA token to this phone";
				});
			}
		}
		$scope.disableTFAStep2 = function() {
			$scope.logProvider.log('in enableTFA');
			//remove the Authorization header
			delete $scope.httpProvider.defaults.headers.common.Authorization;
			if ($scope.headerJWT == null || $scope.uuid == null) {
				$scope.data = 'Please login first';
			} else {
				var requestJson = {
					"ac_tfa_uuid": $scope.uuid, 
					"acc_tfa_sms_phonenum": $scope.tfa_phonenum,
					"ac_tfa_code": $scope.tfa_code,
					"ac_tfa_type": "1"
				}				
				//set the JWT header
				$scope.httpProvider.defaults.headers.common.Authorization = $scope.headerJWT;
				var service = {
				 method: 'PUT',
				 url: 'https://api.securedb.co/securedbapi/account/' + $scope.customerId + '/' + $scope.directoryId + '/disableSmsTFA',
				 data: requestJson
				}		
				$scope.httpProvider(service).then(function successCallback(response) {
					// this callback will be called asynchronously
					// when the response is available
					$scope.logProvider.log('success');
					$scope.logProvider.log(response.data.data);
					$scope.data = response.data;
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.logProvider.log('failure');
					$scope.logProvider.log(response.data);
					$scope.data = response.data;
					// $scope.data = "Unable to enable TFA";
				});
			}
		}
			
	}]);
	
	

})();
