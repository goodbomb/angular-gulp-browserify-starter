'use strict';

function PagesCtrl($scope) {
    $scope.something = ''; // child modules can inherit this
}

PagesCtrl.$inject = ['$scope'];
module.exports = PagesCtrl;