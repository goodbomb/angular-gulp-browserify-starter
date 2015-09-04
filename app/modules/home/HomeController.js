'use strict';
// Controller naming conventions should start with an uppercase letter
function HomeCtrl($scope, ServiceName) {
    $scope.testVar = 'We are up and running using a required module!';

    ServiceName.on('socket:message', function(ev, data) {
        console.log(ev);
        console.log(data);
    });
}

// $inject is necessary for minification. See http://bit.ly/1lNICde for explanation.
HomeCtrl.$inject = ['$scope', 'ServiceName'];
module.exports = HomeCtrl;