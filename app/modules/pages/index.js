'use strict';
// Home View
module.exports = angular.module('modules.pages', [
        require('./about').name
    ])
    .config(require('./pagesConfig'))
    .controller('PagesCtrl', require('./PagesController'));