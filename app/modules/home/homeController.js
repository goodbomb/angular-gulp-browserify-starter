'use strict';
// Controller naming conventions should start with an uppercase letter
function HomeViewCtrl($scope) {
	$scope.testVar = 'We are up and running using a required module!';
}

module.exports = HomeViewCtrl;