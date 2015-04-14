'use strict';

// module.exports = function() {

  describe('MainController', function() {

    var MainCtrl, $scope;

    beforeEach( inject( function( $controller, $rootScope ) {
      $scope = $rootScope.$new();
      MainCtrl = $controller( 'MainCtrl', { $scope: $scope });
    }));

    it('should pass a dummy test', function(){
      expect( MainCtrl ).to.not.be.undefined;
      expect(false).to.be.false;
    });

  });
// };