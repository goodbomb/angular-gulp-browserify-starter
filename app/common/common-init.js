'use strict';

module.exports = function commonInit($rootScope) {

    var moduleClasses = $rootScope.moduleClasses;
    var pageClasses = $rootScope.pageClasses;

    // merge moduleClasses and pageClasses into bodyClasses
    $rootScope.bodyClasses = $.extend({}, moduleClasses, pageClasses);    
};