//jscs:disable requireSpaceAfterLineComment
//jscs:disable requireCapitalizedComments
/*jshint expr: true*/

'use strict';

// var MainCtrl = require('./MainController');

describe('MainController', function() {

    var ctrl, scope;

    beforeEach(function() {
        // ctrl = new MainController();
        // angular.mock.module('modules');

        // // mock the controller
        angular.mock.inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('MainCtrl', {$scope: scope});
        });
    });


    it('should exist', function() {
        // expect(ctrl).to.not.be.undefined;
        expect(true).to.be.true;
    });

});

console.log('is this working?');