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
            parseService.signUp(username,password,email)
                .done(function(user){
                    $ionicLoading.hide();

                   var popup = $ionicPopup.alert({
                        title: 'Registration OK',
                        template: 'You can login now.'
                    });

                    popup.then(function(){
                        $state.transitionTo('app.login');
                    });
                })
                .fail(function(user, error){
                    // Show the error message somewhere and let the user try again.
                    $ionicLoading.hide();

                    var errorMessage = '';
                    switch(error.code)
                    {
                        case -1:
                            errorMessage = "Please fill all fields."
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
                });
        };

    });