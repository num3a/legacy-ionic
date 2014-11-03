/**
 * Created by emmanuelernest on 30/10/14.
 */

describe('Unit: Register controller', function(){
    var $scope, ctrl, $timeout;

    beforeEach(function () {

        var parseServiceMock = {
            signUp: jasmine.createSpy('signUp')
        };

        module('legacyApp');
        module('utils.parse',function ($provide) {
            $provide.value('parseService', parseServiceMock);
        });

        inject(function ($rootScope, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();

            $timeout = _$timeout_;

            ctrl = $controller("RegisterCtrl", {
                $scope: $scope
            });

        });

    });

    it('Controller initial state',function(){
        expect($scope).toBeDefined();
        expect($scope.registrationData).toEqual({ });
        expect($scope.hideBackButton).toBe(false);
    });

    //TODO: FIX TEST TO HANDLE PROMISES RETURNS (with $q)

   /* it('User register',inject(function(parseService){
        $scope.registrationData.username = 'foo';
        $scope.registrationData.email = 'foo@fii.com';
        $scope.registrationData.password = 'zbra';

        $scope.doRegistration();
        expect(parseService.signUp).toHaveBeenCalledWith('foo','zbra','foo@fii.com');
    }));*/


});