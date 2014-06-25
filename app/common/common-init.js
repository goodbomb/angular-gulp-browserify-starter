'use strict';

function commonInit($rootScope, $state) {
	$rootScope.$state = $state;
	
	// Set bodyClasses, pageTitle, and pageDescription on state change (ui-router)

    $rootScope.$on('$stateChangeSuccess', function(event, toState){
		if ( angular.isDefined( toState.data.pageTitle ) ) {
			$rootScope.pageTitle = toState.data.pageTitle;
			$rootScope.pageDescription = toState.data.pageDescription;
			$rootScope.bodyClasses = toState.data.moduleClasses + ' ' + toState.data.pageClasses;
		}
	});
}

commonInit.$inject = ['$rootScope', '$state'];
module.exports = commonInit;