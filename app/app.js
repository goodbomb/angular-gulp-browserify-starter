'use strict';

require('angular');

module.exports = angular.module('myApp',
	[
		require('./common/common.js').name,
		require('./modules/home').name
	])
	.config(require('./config'))
	.constant('version', require('../package.json').version)
	.run(require('./common/common-init.js'));