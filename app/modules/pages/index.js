'use strict';
// Home View
module.exports = angular.module('modules.pages', [])
    .controller('PagesCtrl', require('./PagesController'))
    .config(require('./pagesConfig'));