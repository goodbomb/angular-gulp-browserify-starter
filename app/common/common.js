window.jQuery = window.$ = require('jquery');

require('angular-bootstrap');
require('angular-ui-router');
require('angular-animate');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');

module.exports = angular.module('common',
	[
        'ui.bootstrap',
        'ui.router',
        'ngAnimate',
        require('./components/header').name
	]);