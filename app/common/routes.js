'use strict';

module.exports = function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/');

  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      // generate the Directive homeView - actual HTML must not be camelCased
      template: '<div home-view></div>'
    });

};