angular.module('login', ['utils.parse'])
    .controller('LoginCtrl', function($scope, $timeout, $state, $ionicLoading, $ionicPopup,$ionicSideMenuDelegate,$ionicViewService, parseService) {

        //TODO: save current logged user, user Parse.User.getCurrentUser();

        $ionicViewService.clearHistory();
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.hideBackButton = true;
        // Form data for the login modal

        //TODO: delete hard coded login/passwords
        $scope.loginData = {
            username: 'num3a',
            password: 'tobeskin'
        };

        $scope.goRegistration = function () {
            $state.transitionTo('app.register');
        };

        // Perform the login action when the user submits the login form
        //TODO: username policy - do not allow space in username
        $scope.doLogin = function () {
            var username = $scope.loginData.username;
            var password = $scope.loginData.password;

            $ionicLoading.show({
                template: 'Logging in...'
            });

            parseService.logIn(username,password)
                .done(function(user){
                    $ionicLoading.hide();
                    $state.transitionTo('app.home');

                })
                .fail(function(user, error){
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
                });
        };

        /*
        $scope.forgotPassword = function () {
              Parse.User.requestPasswordReset("email@example.com", {
             success: function() {
             // Password reset request was sent successfully
             },
             error: function(error) {
             // Show the error message somewhere
             alert("Error: " + error.code + " " + error.message);
             }
             });
        };*/
    });