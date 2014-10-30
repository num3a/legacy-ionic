/**
 * Created by emmanuelernest on 30/10/14.
 */


describe('Unit: Left Menu controller', function(){
    var $scope, ctrl, $timeout;

    beforeEach(function () {

        var parseServiceMock = {
            logOut: jasmine.createSpy('logOut')
        };

        module('legacyApp');
        module('utils.parse',function ($provide) {
            $provide.value('parseService', parseServiceMock);
        });

        inject(function ($rootScope, $controller, $q, _$timeout_, $state) {
            $scope = $rootScope.$new();

            $timeout = _$timeout_;

            ctrl = $controller("LeftMenuCtrl", {
                $scope: $scope
            });

        });

    });

    it('Controller initial state',function(){
        expect($scope).toBeDefined();
        expect($scope.logOut).toBeDefined();
    });

    it('User register',inject(function(parseService, $state){

        spyOn($state,'transitionTo');

        $scope.logOut();

        expect(parseService.logOut).toHaveBeenCalled();
        expect($state.transitionTo).toHaveBeenCalled();
    }));


});