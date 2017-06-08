angular.module('SignupModule').controller('SignupController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loading state
	$scope.signupForm = {
		loading: false
	}

	$scope.submitSignupForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.signupForm.loading = true;

		// Submit request to Sails.
		$http.post('/signup', {
			name: $scope.signupForm.name,
			title: $scope.signupForm.title,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		var emailAddressAlreadyInUse = sailsResponse.status == 409;

		if (emailAddressAlreadyInUse) {
			toastr.error('That email address has already been taken, please try again.', 'Error');
			return;
		}

		})
		.finally(function eitherWay(){
			$scope.signupForm.loading = false;
		})
	}

	$scope.submitLoginForm = function (){

    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;

    // Submit request to Sails.
    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        //
        toastr.error('Invalid email/password combination.', 'Error', {
          closeButton: true
        });
        return;
      }

				toastr.error('An unexpected error occurred, please try again.', 'Error', {
					closeButton: true
				});
				return;

    })
    .finally(function eitherWay(){
      $scope.loginForm.loading = false;
    });
  	}


	$scope.submitForgotForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.forgotForm.loading = true;

		// Submit request to Sails.
		$http.post('/forgotPassword', {
			email: $scope.forgotForm.email,
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

			// Handle known error type(s).
      		// Invalid username / password combination.
      		if (sailsResponse.status === 400 || 404) {
        		// $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        		//
        		toastr.error('Invalid email/password combination.', 'Error', {
          			closeButton: true
        		});
        		return;
      		}

				toastr.error('An unexpected error occurred, please try again.', 'Error', {
					closeButton: true
				});
				return;

		})
		.finally(function eitherWay(){
			$scope.forgotForm.loading = false;
		});
	}

	$scope.submitResetForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.resetForm.loading = true;

		// Submit request to Sails.
		$http.post('/resetPassword', {
			password: $reset.signupForm.password,
		})
		.then(function onSuccess(sailsResponse){
			window.location = '/';
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		// If using sails-disk adpater -- Handle Duplicate Key
		})
		.finally(function eitherWay(){
			$scope.resetForm.loading = false;
		});
	};

}]);
