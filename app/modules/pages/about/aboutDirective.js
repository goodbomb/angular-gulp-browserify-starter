'use strict';

module.exports = function aboutDirective() {
    return {
        controller: 'AboutCtrl',
        template: require('./about.html'),
        restrict: 'EA',
        scope: true
    };
};