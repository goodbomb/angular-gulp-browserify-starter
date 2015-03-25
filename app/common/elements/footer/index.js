'use strict';

module.exports = angular.module('common.elements.commonFooter', [])
	.directive('commonFooter', function () {
		return {
			template: require('./common-footer.html'),
			restrict: 'EA',
			replace: true
		};
	});