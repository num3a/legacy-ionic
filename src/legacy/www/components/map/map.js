angular.module('map', ['utils.parse'])
    //TODO: Refactor map controller
    //TODO: user http://tombatossals.github.io/angular-leaflet-directive
    .controller('MapCtrl', ['$scope', '$ionicLoading', '$cordovaGeolocation', 'parseService',function($scope, $ionicLoading, $cordovaGeolocation, parseService) {
        // Provide your access token
        L.mapbox.accessToken = 'pk.eyJ1IjoibnVtM2EiLCJhIjoiUXJsQkxPOCJ9.E6vvpp0XcGvKP2f3qmx8Lg';

        $scope.location = {
            latitude: 48.9637363,
            longitude : 2.2603136
        };
        $scope.zoomLevel = 15;

        $scope.mapMovedCallback = function(bounds) {
            console.log('You repositioned the map to:');
            console.log(bounds);
        };

        $scope.mapZoomedCallback = function(bounds) {
            console.log('You zoomed the map to:');
            console.log(bounds);
        };

        $scope.latest = [];

        $scope.mapCreated = function(map) {
            //$scope.map = map;
        };

        function getLatestPost() {
            parseService.getLatestLegs($scope.location, 7)
                .done(function(legs){

                    console.log('success',legs);
                    $scope.latest = legs;

                    //loadMarker(legs);
                })
                .fail(function(error){
                    console.log('fail',error);
                });
        }

        $scope.centerOnMe = function () {

            console.log("Centering");
            $scope.reposition = true;
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
                   // $scope.getLatestPost($scope.location, 7);
                    getLatestPost();
                    $ionicLoading.hide();
                }, function(error) {
                    console.log('Unable to get location: ', error.message);
                    $ionicLoading.hide();
                });
        };

        function loadMarker(legs) {
            var length = $scope.latest.length;

            for(var i = 0; i < length; i++){

                var coordinates = new google.maps.LatLng(legs[i].location.latitude,legs[i].location.longitude);

                var image = {
                    url: legs[i].image,
                    // This marker is 20 pixels wide by 32 pixels tall.
                    size: new google.maps.Size(100, 100),
                    // The origin for this image is 0,0.
                    origin: new google.maps.Point(0,0),
                    // The anchor for this image is the base of the flagpole at 0,32.
                    anchor: new google.maps.Point(0, 100)
                };

                // To add the marker to the map, use the 'map' property
                var marker = new google.maps.Marker({
                    position: coordinates,
                    map:  $scope.map,
                    title:"Here",
                    icon: image
                });
            }
        }
    }]);