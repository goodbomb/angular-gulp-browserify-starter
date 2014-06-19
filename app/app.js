
'use strict';

var angular = require('angular');
var app = angular.module('myApp', []);

var commonCtrl = require('./common/common');

app.controller('commonCtrl', ['$scope', commonCtrl]);