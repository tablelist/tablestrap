angular.module('tablestrapApp').controller('schedulePickerCtrl', [
  '$scope',
  function($scope) {
    $scope.form = {
      schedule: {}
    };
    $scope.formStatus = 'Valid';

    $scope.logValues = function() {
      console.log($scope.form.schedule);
    };

    $scope.$watch('form.schedule', function(newVal) {
    	console.log(newVal);
    }, true);

    $scope.submit = function(form) {
      if (!form.$valid) {
        $scope.formStatus = 'Invalid';
        return;
      }
      $scope.formStatus = 'Valid';
    };
  }
]);
