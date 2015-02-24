'use strict';

/**
 * @ngdoc function
 * @name calendarApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the calendarApp
 */
angular.module('calendarApp')
  .controller('CalendarCtrl', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
    $scope.currentDate = new Date();
    $scope.todayDate = new Date();
    $scope.firstDay = new Date();
    $scope.lastDay = new Date();
    $scope.actualDayNumber = 0;
    $scope.dates = null;
    $scope.busyDates = null;
    $scope.enableLeftArrow = true;
    $scope.enableRightArrow = true;
    $scope.days = ['pn', 'wt', 'śr', 'cz', 'pt', 'so', 'n'];
    $scope.months = [
      'styczeń',
      'luty',
      'marzec',
      'kwiecień',
      'maj',
      'czerwiec',
      'lipiec',
      'sierpień',
      'wrzesień',
      'październik',
      'listopad',
      'grudzień'];
    $scope.dayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                   11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                   21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    $scope.firstDayColumnNumber = 0;

    $scope.moveMonth = function(step) {
      $scope.currentDate.setMonth($scope.currentDate.getMonth() + step);
      $scope.actualDayNumber = 0;
      $scope.busyDates = $filter('filter')($scope.dates, {
        miesiac: '' + ($scope.currentDate.getMonth() + 1),
        rok: '' + $scope.currentDate.getFullYear()
      }, true);
      if($scope.currentDate.getFullYear() - $scope.todayDate.getFullYear() > -2) {
        $scope.enableLeftArrow = true;
      } 
      if($scope.currentDate.getFullYear() - $scope.todayDate.getFullYear() === -2) {
        $scope.enableLeftArrow = ($scope.currentDate.getMonth() !== 0);
      }
      if($scope.currentDate.getFullYear() - $scope.todayDate.getFullYear() < 2) {
        $scope.enableRightArrow = true;
      } 
      if($scope.currentDate.getFullYear() - $scope.todayDate.getFullYear() === 2) {
        $scope.enableRightArrow = ($scope.currentDate.getMonth() !== 11);
      }
    };

    $scope.setFirstDay = function() {
      $scope.firstDay.setYear($scope.currentDate.getFullYear());
      $scope.firstDay.setMonth($scope.currentDate.getMonth());
      $scope.firstDay.setDate(1);
    };

    $scope.isLeapYear = function() {
      if($scope.currentDate.getFullYear() % 100 === 0 && $scope.currentDate.getFullYear() % 400 !== 0) {
        return false;
      }
      if($scope.currentDate.getFullYear() % 400 === 0) {
        return true;
      }
      if($scope.currentDate.getFullYear() % 4 === 0) {
        return true;
      }
    };

    $scope.numberOfDays = function() {
      switch($scope.currentDate.getMonth()) {
        case 0 : return 31;
        case 1 : return ($scope.isLeapYear() ? 29 : 28);
        case 2 : return 31;
        case 3 : return 30;
        case 4 : return 31;
        case 5 : return 30;
        case 6 : return 31;
        case 7 : return 31;
        case 8 : return 30;
        case 9 : return 31;
        case 10 : return 30;
        case 11 : return 31;
      }
    };

    $scope.convertDayToColumn = function(day) {
      return ((day - 1) >= 0 ? (day - 1) : 6);
    };

    $scope.firstDayOfMonth = function() {
      $scope.setFirstDay();
      $scope.firstDayColumnNumber = $scope.convertDayToColumn($scope.firstDay.getDay());
      return $scope.firstDay.getDay();
    };

    $scope.columnsNumber = 7;
    $scope.rowsNumber = 5;
    $scope.getNumber = function(num) {
      if($scope.convertDayToColumn($scope.firstDayOfMonth()) + $scope.numberOfDays() === 28) {
        $scope.rowsNumber = 4;
      } else if($scope.convertDayToColumn($scope.firstDayOfMonth()) + $scope.numberOfDays() <= 35) {
        $scope.rowsNumber = 5;
      } else {
        $scope.rowsNumber = 6;
      }
      return new Array(num);   
    };

    $scope.isBusy = function(day) {
      var busy = $filter('filter')($scope.busyDates, {
        dzien: '' + day,
        rodzaj: '1'
      }, true);
      return busy !== null ? busy.length > 0 : false;
    };

    $scope.isUnavailable = function(day) {
      var busy = $filter('filter')($scope.busyDates, {
        dzien: '' + day,
        rodzaj: '4'
      }, true);
      return busy !== null ? busy.length > 0 : false;
    };

    $scope.isToday = function(day) {
      return $scope.currentDate.getFullYear() === $scope.todayDate.getFullYear() &&
              $scope.currentDate.getMonth() === $scope.todayDate.getMonth() &&
               day === $scope.todayDate.getDate();
    };

    var init = function () {
      $http.get('http://fenixzespol.pl/api.php').
        success(function(data) {
            $scope.dates = data;
            $scope.busyDates = $filter('filter')($scope.dates, {
              miesiac: '' + ($scope.currentDate.getMonth() + 1),
              rok: '' + $scope.currentDate.getFullYear()
            }, true);
        });
    };

    init();

  }]);