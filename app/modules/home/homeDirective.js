'use strict';

module.exports = function homeDirective() {
    return {
        controller: 'HomeCtrl', // Called from HomeController.js
        template: require('./home.html'),
        restrict: 'EA',
        scope: true
    };
};