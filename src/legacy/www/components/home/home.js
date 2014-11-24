/**
 * Created by emmanuelernest on 01/11/14.
 */
angular.module('home', ['ngCordova', 'utils.parse'])
    .controller('HomeCtrl', function ($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicPopup, $ionicSideMenuDelegate, $ionicViewService, $cordovaCamera, $cordovaGeolocation, parseService) {

        $scope.hideBackButton = true;
        $scope.legTypes = [
            {id: 1, name: 'Text'},
            {id: 2, name: 'Photo'},
            {id: 3, name: 'Link'},
            {id: 4, name: 'Sound'}
        ];
        $scope.location = {
            latitude: 0,
            longitude: 0
        };
        $scope.postData = {
            text : "",
            selectedType : {}
        };
        $scope.latest = [];
        $scope.isGeolocated = false;

        $ionicViewService.clearHistory();

        $ionicModal.fromTemplateUrl('components/home/post.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openPostLeg = function () {
            $scope.modal.show();
        };

        $scope.closePostLeg = function () {
            $scope.modal.hide();
        };

        $scope.postLeg = function () {
            console.log('post a leg, call parseService...');
            var text = $scope.postData.text;

            parseService.postLeg(text,null,$scope.location)
                .done(function(model){
                    console.log('posted: ', model);
                })
                .fail(function(){
                    console.log('you \'ve failed this city !')
                })
                .always(function(){
                    $scope.closePostLeg();
                    getNearestLegs();
                })
        };

        function getNearestLegs() {
            $ionicLoading.show({
                template: 'Acquiring your position...'
            });
            parseService.getLatestLegs($scope.location, 7)
                .done(function (legs) {
                    console.log('Legs retrieved with success !', legs);
                    $scope.latest = legs;
                })
                .fail(function (error) {
                    console.log('An error occured when retrieving legs', error);
                })
                .always(function(){
                    $ionicLoading.hide();
                });
        }


        function initialization() {

            $ionicLoading.show({
                template: 'Acquiring your position...'
            });


            $cordovaGeolocation.getCurrentPosition()
                .then(function (position) {
                    $scope.location.latitude = position.coords.latitude;
                    $scope.location.longitude = position.coords.longitude;
                    $scope.isGeolocated = true;

                    getNearestLegs();
                    $ionicLoading.hide();
                }, function (error) {
                    console.log('An error occured when retrieving position', error);
                    $ionicLoading.hide();
                });

        }

        initialization();
    })
    ;