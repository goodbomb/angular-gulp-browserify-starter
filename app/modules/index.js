'use strict';

module.exports = angular.module('modules',
    [
        require('./home').name,
        require('./pages').name // Used for static content pages like "About", "404", etc.
    ])
    .config(require('./modulesRoutes')) // This file only defines the module routes, but you can define multiple config files.
    .controller('MainCtrl', require('./MainController'));