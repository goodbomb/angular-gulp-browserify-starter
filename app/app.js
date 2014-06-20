'use strict';

require('angular');

module.exports = angular.module('myApp',
	[
		require('./common/common.js').name,
		require('./modules/home').name
	])
	.config(require('./common/routes'))
	.constant('version', require('../package.json').version);