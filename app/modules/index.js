'use strict';

module.exports = angular.module('modules',
    [
        require('./home').name,
        require('./pages').name // Used for static content pages like "About", "404", etc.
    ])
    .controller('MainCtrl', require('./MainController'));