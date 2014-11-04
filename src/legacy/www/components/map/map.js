angular.module('map', ['utils.parse'])
    //TODO: Refactor map controller
    .controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation, parseService) {
        $scope.location = {
            latitude: 0,
            longitude : 0
        };

        $scope.latest = [];

        $scope.mapCreated = function(map) {
            $scope.map = map;
        };

        $scope.getLatestPost = function() {
            parseService.getLatestLegs($scope.location, 7)
                .done(function(legs){

                    console.log('success',legs);
                    $scope.latest = legs;

                    loadMarker();
                })
                .fail(function(error){
                    console.log('fail',error);
                });
        }

        function loadMarker() {
            for(var i = 0; i < $scope.latest.length; i++){

                var latLng = new google.maps.LatLng($scope.location.latitude,$scope.location.longitude);


                // To add the marker to the map, use the 'map' property
                var marker = new google.maps.Marker({
                    position: latLng,
                    map:  $scope.map,
                    title:"Here"
                });
            }
        }

        $scope.centerOnMe = function () {
            console.log("Centering");
            if (!$scope.map) {
                return;
            }

            $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            $cordovaGeolocation.getCurrentPosition()
                .then(function (position) {

                    //TODO: Configure accuracy, timeout ...
                    $scope.location.latitude  = position.coords.latitude;
                    $scope.location.longitude = position.coords.longitude;

                    $scope.isGeolocated = true;
                    $scope.getLatestPost($scope.location, 7);

                    $scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

                    $scope.getLatestPost();
                    $ionicLoading.hide();
                }, function(error) {
                    console.log('Unable to get location: ', error.message);
                    $ionicLoading.hide();
                });
        };
    });