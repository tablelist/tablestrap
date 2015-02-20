angular.module('tablestrapApp').controller('schedulePickerCtrl', [
  '$scope',
  '$timeout',
  function($scope, $timeout) {
    $scope.form = {
      schedule: [{
        day: 0,
        closed: true
      }, {
        day: 1,
        closed: false,
        hours: [{
          start: '9:00 AM',
          end: '11:00 PM'
        }, {
          start: '12:00 PM',
          end: '01:00 PM'
        }]
      }, {
        day: 2,
        closed: false,
        hours: [{
          start: '1:00 PM',
          end: '5:00 PM'
        }]
      }, {
        day: 3,
        closed: true
      }]
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
