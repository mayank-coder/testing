angular.module('EditModule').controller('EditController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

	// set-up loading state
	$scope.editForm = {
		loading: false
	}

	$scope.submitEditForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.editForm.loading = true;

		// Submit request to Sails.
		$http.post('/edit', {
			name: $scope.editForm.name,
			title: $scope.editForm.title,
			email: $scope.editForm.email
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
			$scope.editForm.loading = false;
		})
	};

}]);
