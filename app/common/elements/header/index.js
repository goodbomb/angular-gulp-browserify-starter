'use strict';

module.exports = angular.module('common.elements.commonHeader', [])
	.directive('commonHeader', function () {
		return {
			template: require('./common-header.html'),
			restrict: 'EA',
			replace: true
		};
	});