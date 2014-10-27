'use strict';

angular.module('login', [])
    .controller('LoginCtrl',function($scope, $timeout, $state, $ionicLoading, $ionicPopup,$ionicSideMenuDelegate,$ionicViewService) {

        //TODO: save current logged user

        //$parseService.login();

        $ionicViewService.clearHistory();
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.hideBackButton = true;
        // Form data for the login modal
        $scope.loginData = {};

        $scope.goRegistration = function () {
            $state.transitionTo('app.register');
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            var username = $scope.loginData.username;
            var password = $scope.loginData.password;

            $ionicLoading.show({
                template: 'Logging in...'
            });
            Parse.User.logIn(username, password, {
                success: function (user) {

                    $ionicLoading.hide();
                    $state.transitionTo('app.latest');
                },
                error: function (user, error) {
                    // The login failed. Check error to see why.

                    var errorMessage = '';
                    switch (error.code) {
                        case 100:
                            errorMessage = 'Legacy is unreachable. <br />Please check your network settings!';
                            break;

                        case 101:
                            errorMessage = 'Wrong login/password. <br />Please check your credentials!';
                            break;
                        default :
                            errorMessage = error.message;
                            break;
                    }

                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: 'Ooops !',
                        template: errorMessage
                    });
                }
            });
        };

        $scope.forgotPassword = function () {
            /*  Parse.User.requestPasswordReset("email@example.com", {
             success: function() {
             // Password reset request was sent successfully
             },
             error: function(error) {
             // Show the error message somewhere
             alert("Error: " + error.code + " " + error.message);
             }
             });*/
        };
    });