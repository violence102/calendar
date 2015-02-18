'use strict';

/**
 * @ngdoc function
 * @name calendarApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the calendarApp
 */
angular.module('calendarApp')
  .controller('CalendarCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.currentDate = new Date();
    $scope.firstDay = new Date();
    $scope.lastDay = new Date();
    $scope.actualDayNumber = 0;
    $scope.dates = [];
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
      $scope.getDates();
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

    $scope.getDates = function() {
      console.log('getData');
      $http.get('http://www.fenixzespol.pl/api.php').
        success(function(data) {
            $scope.dates = data;
        });
    };
  }]);