/*jshint expr: true*/

'use strict';

describe('MainController', function() {

    var ctrl, scope;

    beforeEach(angular.mock.module('modules'));

    beforeEach(function() {

        angular.mock.inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('MainCtrl', {
                $scope: scope
            });
        });

    });


    it('should exist', function() {
        expect(ctrl).to.not.be.undefined;
    });

});