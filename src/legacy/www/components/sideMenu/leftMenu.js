/**
 * Created by emmanuelernest on 22/10/14.
 */
angular.module('sideMenu', [])
    .controller('LeftMenuCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup) {
        $scope.logout = function(){
            var currentUser = Parse.User.current();

            if(currentUser =! null) {
                Parse.User.logOut();
            }

            $state.transitionTo('app.login');
        };
    });