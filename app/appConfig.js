// These routes are to define any app-level paths to modules. 
// For module-level route definitions, use the Routes.js files found in the module folders.

'use strict';

function appRoutes($stateProvider, $urlRouterProvider) {

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise('/');

	// Now set up the states
	var home = {
		name: 'home', // state name
		url: '/', // url path that activates this state
		template: '<div home-view></div>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
		data: {
			moduleClasses: 'page', // assign a module class to the <body> tag
			pageClasses: 'home', // assign a page-specific class to the <body> tag
			pageTitle: 'Home', // set the title in the <head> section of the index.html file
			pageDescription: 'Meta Description goes here' // meta description in <head>
		}
	};

	$stateProvider.state(home);

}

appRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
module.exports = appRoutes;