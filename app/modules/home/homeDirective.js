'use strict';

module.exports = function homeDirective() {
    return {
        controller: 'HomeViewCtrl', // Called from homeController.js
        template: require('./home.html'),
        restrict: 'EA',
        scope: true
    };
};