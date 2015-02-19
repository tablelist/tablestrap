angular.module('tablestrapApp').controller('schedulePickerCtrl', [
  '$scope',
  '$timeout',
  function($scope, $timeout) {
    $scope.form = {
      schedule: []
        // schedule: [{
        //   day: 0,
        //   closed: false
        // }, {
        //   day: 1,
        //   closed: false,
        //   hours: [{
        //     start: getTime(new Date('1970/01/01' + ' 9:00 AM')),
        //     end: getTime(new Date('1970/01/01' + ' 12:00 PM'))
        //   }]
        // }, {
        //   day: 2,
        //   closed: false
        // }, {
        //   day: 3,
        //   closed: false
        // }]
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

    function getTime(date) {
      var hours = date.getHours();
      var hours = (hours + 24 - 2) % 24;
      var min = date.getMinutes();
      var mid = 'AM';
      if (hours == 0) { //At 00 hours we need to show 12 am
        hours = 12;
      } else if (hours > 12) {
        hours = hours % 12;
        mid = 'PM';
      }

      return hours + ':' + min + ' ' + mid;
    }
  }
]);
