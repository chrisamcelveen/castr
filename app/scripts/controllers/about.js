'use strict';

/**
 * @ngdoc function
 * @name castrApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the castrApp
 */
angular.module('castrApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
