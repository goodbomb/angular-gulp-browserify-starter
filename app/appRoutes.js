// These routes are to define any app-level paths to modules. 
// For module-level route definitions, use the Routes.js files found in the module folders.

'use strict';

module.exports = function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');

  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      // generate the Directive homeView - when calling the directive, the name must not be camelCased
      template: '<div home-view></div>'
    });

};