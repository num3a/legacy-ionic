/**
 * Created by emmanuelernest on 30/10/14.
 */

describe('Unit: Intro controller', function(){
    var $scope, ctrl, $timeout, $state;

    beforeEach(function () {

        var localStorageMock = {
            get: jasmine.createSpy('get'),
            set: jasmine.createSpy('set')
        };

        module('legacyApp');
        module('utils.localStorage',function ($provide) {
            $provide.value('localStorage', localStorageMock);
        });

        inject(function ($rootScope, $controller, $q, _$timeout_, $state) {
            $scope = $rootScope.$new();

            $timeout = _$timeout_;

            ctrl = $controller("IntroCtrl", {
                $scope: $scope
            });

        });

    });

    it('Controller initial state',function(){
        expect($scope).toBeDefined();

    });

    it('User start app',inject(function($state){
        expect($scope.startApp).toBeDefined();
        spyOn($state, 'transitionTo');

        $scope.startApp();
        expect($state.transitionTo).toHaveBeenCalledWith('app.login');
    }));

    it('User go throught app introction', inject(function($state,$ionicSlideBoxDelegate, localStorage){

        expect($scope.nextSlide).toBeDefined();
        expect($scope.next).toBeDefined();
        expect($scope.previous).toBeDefined();
        expect($scope.slideChanged).toBeDefined();
        expect($scope).toBeDefined();

        spyOn($ionicSlideBoxDelegate,'next');
        $scope.nextSlide();
        expect($ionicSlideBoxDelegate.next).toHaveBeenCalled();

        $scope.next();
        expect($ionicSlideBoxDelegate.next.callCount).toBe(2);

        spyOn($ionicSlideBoxDelegate,'previous');
        $scope.previous();
        expect($ionicSlideBoxDelegate.previous).toHaveBeenCalled();

        $scope.slideChanged(2);
        expect($scope.slideIndex).toBe(2);

        spyOn($state,'go');
        $scope.skipIntro();


        expect(localStorage.get).toHaveBeenCalledWith('isFirstLaunch','true');
        expect($state.go).toHaveBeenCalledWith('app.login');

        $scope.skipIntro(true);
        expect(localStorage.set).toHaveBeenCalledWith('isFirstLaunch',false);
    }));

});