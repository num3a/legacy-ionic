/**
 * Created by emmanuelernest on 20/10/14.
 */
describe('Unit: Login controller', function(){
    var $scope, ctrl, $timeout, $state, parseService;

    //mock Application to allow us to inject our own dependencies
    //mock the controller for the same reason and include $rootScope and $controller
    // Load the module
    beforeEach(function () {

        var parseServiceMock = {
            logIn: jasmine.createSpy('logIn')
        };

        module('legacyApp');
        module('utils.parse',function ($provide) {
            $provide.value('parseService', parseServiceMock);
        });

        // INJECT! This part is critical
        // $rootScope - injected to create a new $scope instance.
        // $controller - injected to create an instance of our controller.
        // $q - injected so we can create promises for our mocks.
        // _$timeout_ - injected to we can flush unresolved promises.
        inject(function ($rootScope, $controller, $q, _$timeout_, $state) {

            // create a scope object for us to use.
            $scope = $rootScope.$new();

            // assign $timeout to a scoped variable so we can use
            // $timeout.flush() later. Notice the _underscore_ trick
            // so we can keep our names clean in the tests.
            $timeout = _$timeout_;

            // now run that scope through the controller function,
            // injecting any services or other injectables we need.
            // **NOTE**: this is the only time the controller function
            // will be run, so anything that occurs inside of that
            // will already be done before the first spec.
            ctrl = $controller("LoginCtrl", {
                $scope: $scope
            });

            spyOn($state,'transitionTo');
           // spyOn($parseService,'logIn');
        });

    });

    it('Controller initial state',function(){
        expect($scope).toBeDefined();
        expect($scope.doLogin).toBeDefined();

        expect($scope.loginData).toEqual({});
        expect($scope.hideBackButton).toBe(true);
    });

    it('User login with userTest account',inject(function(parseService){

        $scope.loginData.username = 'userTest';
        $scope.loginData.password = 'passwordTest';

        expect($scope.loginData).toBeDefined();

        expect($scope.doLogin).toBeDefined();

        $scope.doLogin();

        expect(parseService.logIn).toHaveBeenCalledWith('userTest','passwordTest');
    }));

    it('User tap on registration button',inject(function($state){
        expect($scope.goRegistration).toBeDefined();

        $scope.goRegistration();

        expect($state.transitionTo).toHaveBeenCalledWith('app.register');
    }));
});