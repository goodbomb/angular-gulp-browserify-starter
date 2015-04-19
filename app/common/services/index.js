'use strict';

// Services and Factories have their first letter capitalized like Controllers

module.exports = angular.module('common.services', [])
    .factory('ServiceName', require('./ServiceName.js'));