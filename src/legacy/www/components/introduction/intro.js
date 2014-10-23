/**
 * Created by emmanuelernest on 21/10/14.
 */

angular.module('introduction', [])
.controller('IntroCtrl',function($scope, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate){

        $ionicSideMenuDelegate.canDragContent(false);

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        };
        // Called to navigate to the main app
        $scope.startApp = function() {
            $state.go('app.login');
        };
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
});

