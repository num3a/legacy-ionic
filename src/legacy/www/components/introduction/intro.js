/**
 * Created by emmanuelernest on 21/10/14.
 */

angular.module('introduction', ['legacy.utils'])
.controller('IntroCtrl',function($scope, $state, $ionicSlideBoxDelegate, $ionicSideMenuDelegate, $localStorage){

        skipIntro();

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

        function skipIntro(){
            var isFirstLaunch = $localStorage.get('isFirstLaunch', 'true');

            if(isFirstLaunch == 'true'){
                $localStorage.set('isFirstLaunch', false );

            }
            else
            {
                $state.go('app.login');
            }
        }
});

