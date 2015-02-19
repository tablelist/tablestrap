angular.module('tablestrap').directive('schedulePicker', function() {
  return {
    restrict: 'E',
    require: 'ngModel',
    template: '' +
      '<div class="schedule-picker clearfix">' +
      '<div class="schedule-day clearfix" ng-repeat="scheduleDay in scheduleDays">' +
      '<label><input type="checkbox" ng-checked="!scheduleDay.closed" ng-click="scheduleDay.select()"><span class="scheduleDay-name">{{ getDayFromNumber(scheduleDay.day) }}</span></label>' +
      '<div class="time-picker-range" ng-repeat="hoursRange in scheduleDay.hours">' +
      '<div class="time-picker start-time" ng-class="{ error: hoursRange.invalidStartTime }">' +
      '<select class="time-select" ng-model="hoursRange.start">' +
      '<option ng-repeat="time in times" value="{{time}}">{{time}}</option>' +
      '</select>' +
      '<div class="meridian">' +
      '<select ng-model="hoursRange.startMeridian" ng-options="period as period.name for period in periods">' +
      '</select>' +
      '<i class="fa fa-chevron-down"></i>' +
      '</div>' +
      '</div>' +
      '<div class="splitter">-</div>' +
      '<div class="time-picker end-time" ng-class="{ error: hoursRange.invalidEndTime }">' +
      '<select class="time-select" ng-model="hoursRange.end">' +
      '<option ng-repeat="time in times" value="{{time}}">{{time}}</option>' +
      '</select>' +
      '<div class="meridian">' +
      '<select ng-model="hoursRange.endMeridian" ng-options="period as period.name for period in periods">' +
      '</select>' +
      '<i class="fa fa-chevron-down"></i>' +
      '</div>' +
      '</div>' +
      '<a class="time-picker-remove" href="#" ng-click="scheduleDay.removeHours($index)"><i class="fa fa-times"></i></a>' +
      '</div>' +
      '<a class="time-picker-add" href="#" ng-click="scheduleDay.addHours()" ng-hide="scheduleDay.closed"><i class="fa fa-plus"></i></a>' +
      '<div class="time-picker-disabled" ng-show="scheduleDay.closed" ng-click="scheduleDay.select()"></div>' +
      '</div>' +
      '</div>',
    link: function($scope, $element, $attrs, ctrl) {
      $scope.periods = [{
        name: 'AM'
      }, {
        name: 'PM'
      }];

      $scope.times = [
        '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30',
        '4:00', '4:30', '5:00', '5:30', '6:00', '6:30', '7:00', '7:30',
        '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30'
      ];

      function ScheduleDay(day) {
        this.day = day;
        this.closed = true;
        this.modified = false;

        //validation
        this.invalidRange = false;
        this.invalidStartTime = false;
        this.invalidEndTime = false;

        this.hours = [{
          start: null,
          startMeridian: $scope.periods[0],
          end: null,
          endMeridian: $scope.periods[1]
        }];
      }
      ScheduleDay.prototype.addHours = function() {
        var _this = this;
        _this.closed = false;

        _this.hours.push({
          start: null,
          startMeridian: $scope.periods[0],
          end: null,
          endMeridian: $scope.periods[1],
        });
      };
      ScheduleDay.prototype.select = function() {
        var _this = this;
        if (_this.closed) {
          _this.closed = false;
          _this.reset();
        } else {
          _this.closed = true;
        }
      };
      ScheduleDay.prototype.removeHours = function(index) {
        var _this = this;

        if (_this.hours.length === 1) {
          _this.closed = true;
        } else {
          _this.hours.splice(index, 1);
        }
        _this.validate();
      };
      ScheduleDay.prototype.reset = function() {
        var _this = this;
        _this.hours = [];
        _this.addHours();
      };
      ScheduleDay.prototype.validate = function() {
        var _this = this;

        if (_this.hours && _this.hours.length) {
          for (var i = 0; i < _this.hours.length; i++) {
            var hourGroup = _this.hours[i];

            if (_this.closed) {
              hourGroup.invalidStartTime = false;
              hourGroup.invalidEndTime = false;
              hourGroup.invalidRange = false;

              if (hourGroup.start) hourGroup.start = null;
              if (hourGroup.end) hourGroup.end = null;
            } else {
              if (!hourGroup.start) hourGroup.invalidStartTime = true;
              else hourGroup.invalidStartTime = false;
              if (!hourGroup.end) hourGroup.invalidEndTime = true;
              else hourGroup.invalidEndTime = false;

              if (hourGroup.invalidStartTime && hourGroup.invalidEndTime) {
                hourGroup.invalidRange = true;
              } else {
                hourGroup.invalidRange = false;
              }
            }
          }
        }
      };

      $scope.scheduleDays = [
        new ScheduleDay(1),
        new ScheduleDay(2),
        new ScheduleDay(3),
        new ScheduleDay(4),
        new ScheduleDay(5),
        new ScheduleDay(6),
        new ScheduleDay(0)
      ];

      $scope.getDayFromNumber = function(dayNumber) {
        switch (dayNumber) {
          case 0:
            return 'Sun';
            break;
          case 1:
            return 'Mon';
            break;
          case 2:
            return 'Tue';
            break;
          case 3:
            return 'Wed';
            break;
          case 4:
            return 'Thur';
            break;
          case 5:
            return 'Fri';
            break;
          case 6:
            return 'Sat';
            break;
          default:
            throw new Error('invalid day :' + dayNumber);
            break;
        }
      };

      $attrs.$observe('required', function() {
        return validate(ctrl.$viewValue);
      });

      ctrl.$parsers.unshift(validate);
      ctrl.$formatters.push(validate);

      $scope.$watch('scheduleDays', function(val) {
        ctrl.$setViewValue(val);
      }, true); //deep watch the collection of schedule days to update the model

      //private helpers
      function validate(viewValue) {
        var requiredAttr = $attrs.required;

        validateScheduleValues();

        if (requiredAttr && !viewValue) {
          ctrl.$setValidity('required', false);
        } else {
          ctrl.$setValidity('required', true);
        }

        // ctrl.$setValidity('required', false);
        // ctrl.$setValidity('invalidRange', false);

        return viewValue;
      }

      function validateScheduleValues() {
        var i;
        var j;
        var invalidRange;
        var invalidStartTime;
        var invalidEndTime;

        for (i = 0; i < $scope.scheduleDays.length; i++) {
          var schedule = $scope.scheduleDays[i];

          schedule.validate();

          if (schedule.closed) {
            continue;
          }

          if (!schedule.closed && (!schedule.hours || !schedule.hours.length)) {
            invalidRange = true;
            break;
          }

          if (schedule.hours && schedule.hours.length) {
            for (j = 0; j < schedule.hours.length; j++) {
              var hours = schedule.hours[j];

              if (!schedule.closed && (!hours.start || !hours.end)) {
                invalidRange = true;
                invalidStartTime = true;
                invalidEndTime = true;
                break;
              }
              // if (!REGEXES.time.test(hours.start) || !REGEXES.time.test(hours.end)) {
              //   // hours.invalidStartTime = true;
              //   // hours.invalidEndTime = true;
              //   ctrl.$setValidity('invalidStartTime', true);
              //   ctrl.$setValidity('invalidEndTime', true);
              //   continue;
              // }

              //convert times to dates
              // hours.start = moment('1970/01/01 ' + hours.start, 'YYYY/MM/DD HH:mm A').date(schedule.day);
              // hours.end = moment('1970/01/01 ' + hours.end, 'YYYY/MM/DD HH:mm A').date(schedule.day);

              // if (hours.end < hours.start) { //if the end time is before the start assume it's actually the following day
              //   hours.end.add(1, 'day');
              // }
            }

            //schedule.hours = _.sortBy(schedule.hours, 'start'); //order the hour groups (so 9:00AM-10:00AM comes before 11:00AM-1:00PM)

            //loop through again now that start and end times are actual dates - validate we don't have overlapping times within each day
            // _.each(schedule.hours, function(hours) {
            //   if (_.some(schedule.hours, function(otherHours) {
            //       if (otherHours === hours) return false;
            //       if (otherHours.start >= hours.start && otherHours.start < hours.end) return true;
            //       else return false;
            //     })) {
            //     console.log(schedule.hours);
            //     return next(new Errors.InvalidArgumentError('schedule hours cannot have overlapping times within any given day'));
            //   }
            // });
          }
        }

        // data.schedule = _.sortBy(data.schedule, 'day'); //order the days in the schedule (so mon. comes before tues.)

        // //loop through schedules again to verify we don't have overlapping times between days
        // _.each(data.schedule, function(schedule) {
        //   var dayBeforeSchedule = _.find(data.schedule, function(sched) {
        //     if (sched.day !== schedule.day) {
        //       if (schedule.day == 0) return sched.day == 6; //if sunday, return schedule for saturday
        //       else return sched.day == (schedule.day - 1); //otherwise, return schedule for day before
        //     }
        //   });

        //   //if there is a schedule for the day before, validate that times don't overlap between days
        //   if (dayBeforeSchedule && ((dayBeforeSchedule.hours && dayBeforeSchedule.hours.length) && (schedule.hours && schedule.hours.length))) {
        //     var firstHourGroupOfCurrentDay;

        //     if (schedule.day == 0) { //because we are checking sunday, add a week to the date so it comes after saturday - fixes validation issues
        //       firstHourGroupOfCurrentDay = _.clone(schedule.hours[0]);
        //       firstHourGroupOfCurrentDay.start.add(7, 'days');
        //       firstHourGroupOfCurrentDay.end.add(7, 'days');
        //     } else {
        //       firstHourGroupOfCurrentDay = schedule.hours[0];
        //     }

        //     var lastHourGroupFromPreviousDay = dayBeforeSchedule.hours[dayBeforeSchedule.hours.length - 1];

        //     // console.log('FIRST HOUR GROUP CURRENT DAY: ');
        //     // console.log(firstHourGroupOfCurrentDay);
        //     // console.log('\n');
        //     // console.log('LAST HOUR GROUP PREVIOUS DAY: ');
        //     // console.log(lastHourGroupFromPreviousDay);

        //     if (firstHourGroupOfCurrentDay.start < lastHourGroupFromPreviousDay.end) {

        //       // console.log('\n');
        //       // console.log(firstHourGroupOfCurrentDay.start.format('YYYY/MM/DD HH:mm A'));
        //       // console.log('is before ');
        //       // console.log(lastHourGroupFromPreviousDay.end.format('YYYY/MM/DD HH:mm A'));
        //       // console.log('\n');

        //       return next(new Errors.InvalidArgumentError('schedules hours cannot have overlapping times between days'));
        //     }
        //   }
        // });

        if (invalidRange) {
          ctrl.$setValidity('invalidRange', false);
        } else {
          ctrl.$setValidity('invalidRange', true);
        }

        if (invalidStartTime) {
          ctrl.$setValidity('invalidStartTime', false);
        } else {
          ctrl.$setValidity('invalidStartTime', true);
        }

        if (invalidEndTime) {
          ctrl.$setValidity('invalidEndTime', false);
        } else {
          ctrl.$setValidity('invalidEndTime', true);
        }
      }
    }
  };
});
