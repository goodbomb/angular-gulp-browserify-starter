'use strict';

module.exports = function homeDirective() {
    return {
        controller: 'HomeCtrl', // Called from HomeController.js
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'EA',
        scope: true,
        template: require('./home.html')
    };
};