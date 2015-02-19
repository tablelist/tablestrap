angular.module('tablestrapApp').controller('schedulePickerCtrl', [
  '$scope',
  function($scope) {
    $scope.form = {
      schedule: {}
    };

    $scope.logValues = function() {
      console.log($scope.form.schedule);
    };
  }
]);
