'use strict';

require('angular');

module.exports = angular.module('myApp',
	[
		require('./common/common.js').name,
		require('./modules/home').name
	])
	.config(require('./appRoutes'))
	.constant('version', require('../package.json').version);