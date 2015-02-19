angular.module('tablestrapApp').controller('schedulePickerCtrl', [
  '$scope',
  function($scope) {
    $scope.form = {
      schedule: {}
    };

    $scope.logValues = function() {
      console.log($scope.form.schedule);
    };

    $scope.$watch('form.schedule', function(val) {
    	console.log(val);
    });

    $scope.submit = function(form) {

      var foo = form;
    };
  }
]);
