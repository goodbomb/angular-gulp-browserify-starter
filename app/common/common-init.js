'use strict';

function commonInit($rootScope, $state) {
	$rootScope.$state = $state;
	
	// Change bodyClasses on state change (ui-router)
    $rootScope.$on('$stateChangeSuccess',function(event, toState){
	    $rootScope.bodyClasses = toState.moduleClasses + ' ' + toState.pageClasses;
    });
}

commonInit.$inject = ['$rootScope', '$state'];
module.exports = commonInit;