/**
 * Created by emmanuelernest on 22/10/14.
 */
angular.module('sideMenu', ['utils.parse'])
    .controller('LeftMenuCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup, parseService) {
        $scope.logOut = function(){
            parseService.logOut();

            $state.transitionTo('app.login');
        };
    });;