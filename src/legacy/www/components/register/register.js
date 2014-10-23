/**
 * Created by emmanuelernest on 23/10/14.
 */
angular.module('registration', [])
    .controller('RegisterCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup) {
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
            signUp(username,password,email);
        };

        function signUp(username, password, email){

            var user = new Parse.User();
            user.set("username", username);
            user.set("password", password);
            user.set("email", email);

            user.signUp(null, {
                success: function(user) {
                    $ionicLoading.hide();

                    login(username,password);
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    $ionicLoading.hide();

                    var errorMessage = '';
                    switch(error.code)
                    {
                        case -1:
                            errorMessage = "User cannot register with an empty name."
                            break;
                        case 202:
                            errorMessage= "User " + username + " already exist."
                            break;
                        case 203:
                            errorMessage= "Email " + email + " already exist."
                            break;

                        default :
                            errorMessage = "Error: " + error.code + " " + error.message;
                            break;
                    }

                    $ionicPopup.alert({
                        title: 'Ooops !',
                        template: errorMessage
                    });
                }
            });
        }

        function login(username, password){
            $ionicLoading.show({
                template: 'Logging in...'
            });
            Parse.User.logIn(username, password, {
                success: function(user) {

                    $ionicLoading.hide();
                    $state.transitionTo('app.latest');
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.

                    var errorMessage = '';
                    switch(error.code)
                    {
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
        }
    });