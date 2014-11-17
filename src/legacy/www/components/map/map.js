angular.module('map', ['utils.parse'])
    //TODO: Refactor map controller
    //TODO: user http://tombatossals.github.io/angular-leaflet-directive
    .controller('MapCtrl', ['$scope','leafletData', '$ionicLoading', '$cordovaGeolocation',function($scope,leafletData, $ionicLoading, $cordovaGeolocation, parseService) {
        leafletData.getMap().then(function(map) {
            //L.GeoIP.centerMapOnPosition(map, 2);
            $scope.map = map;
        });
        angular.extend($scope, {
            center: {
                lat: 51.505,
                lng: -0.09,
                zoom: 8
            }
        });
        angular.extend($scope, {
            defaults: {
                tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                maxZoom: 14,
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
                }
            }
        });

        $scope.location = {
            latitude: 0,
            longitude : 0
        };

        $scope.latest = [];

        $scope.mapCreated = function(map) {
            //$scope.map = map;
        };

        $scope.getLatestPost = function() {
            parseService.getLatestLegs($scope.location, 7)
                .done(function(legs){

                    console.log('success',legs);
                    $scope.latest = legs;

                    loadMarker(legs);
                })
                .fail(function(error){
                    console.log('fail',error);
                });
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
                   // $scope.getLatestPost($scope.location, 7);

                    $scope.center.lat = position.coords.latitude;
                    $scope.center.lng = position.coords.longitude;
                    $scope.center.zoom = 15;

                   // $scope.getLatestPost();
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