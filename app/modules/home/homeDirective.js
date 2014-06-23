'use strict';

module.exports = function homeDirective() {
	return {
		controller: 'homeViewCtrl', // called from homeController.js
		template: require('./home.html'),
		restrict: 'EA',
		scope: true
	};
};