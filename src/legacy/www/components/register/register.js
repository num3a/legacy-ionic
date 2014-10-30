/**
 * Created by emmanuelernest on 23/10/14.
 */
angular.module('registration', ['utils.parse'])
    .controller('RegisterCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup, parseService) {
        $scope.registrationData = {};

        $scope.hideBackButton = false;

        $scope.doRegistration = function(){
            console.log('Doing registration', $scope.registrationData);
            var email = $scope.registrationData.email;
            var username = $scope.registrationData.username;
            var password = $scope.registrationData.password;

            $ionicLoading.show({
                template: 'Registration...'
            });
            parseService.signUp(username,password,email);
        };

    });