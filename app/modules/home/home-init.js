'use strict';

function homeInit($rootScope) {

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
}

homeInit.$inject = ['$rootScope'];
module.exports = homeInit;