/**
 * Created by emmanuelernest on 22/10/14.
 */
angular.module('sideMenu', [])
    .controller('LeftMenuCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        $scope.logout = function(){
            var currentUser = Parse.User.current();

            if(currentUser =! null) {
                Parse.User.logOut();
            }
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            var username = $scope.loginData.username;
            var password = $scope.loginData.password;

            $ionicLoading.show({
                template: 'Loading...'
            });

            Parse.User.logIn(username, password, {
                success: function(user) {

                    $scope.closeLogin();
                    $ionicLoading.hide();
                    $state.transitionTo('app.latest');
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: 'Ooops !',
                        template: 'Error: ' + error.message
                    });


                }
            });

        };
    });