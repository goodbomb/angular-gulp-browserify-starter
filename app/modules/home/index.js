'use strict';
// Home View
module.exports = angular.module('home', [])
	.directive('homeView', require('./homeDirective'))
	.controller('homeViewCtrl', require('./homeController'))
	.run(require('./home-init.js'));