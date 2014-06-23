'use strict';

module.exports = function homeInit($rootScope) {

	$rootScope.page = {
		title: '- Home',
		description: ''
	};

    $rootScope.moduleClasses = {
        'home': true
    };

    $rootScope.pageClasses = {
        'page': true
    };
};