/**
 * Created by emmanuelernest on 01/11/14.
 */
angular.module('home', ['ngCordova','utils.parse'])
    .controller('HomeCtrl', function($scope, $timeout, $state, $ionicLoading, $ionicPopup,$ionicSideMenuDelegate,$ionicViewService,$cordovaCamera, $cordovaGeolocation, parseService) {

            $scope.location = {
                latitude: 0,
                longitude : 0
            };

            $scope.isGeolocated = false;
            $ionicViewService.clearHistory();

            $scope.takePhoto = function() {
                var options = {
                    quality : 100,
                    destinationType : Camera.DestinationType.DATA_URL,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : true,
                    encodingType: Camera.EncodingType.PNG,
                    targetWidth: 500,
                    targetHeight: 500,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                //TODO: add login everywhere in the application
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    // Success! Image data is here

                    /*  String.prototype.getBytes = function () {
                     var bytes = [];
                     for (var i = 0; i < this.length; ++i) {
                     bytes.push(this.charCodeAt(i));
                     }
                     return bytes;
                     };*/

                    // var bytesData = imageData.getBytes();
                    var text = 'zbra';
                    parseService.postLeg(text,imageData, $scope.location);
                //    sendImage(imageData);

                }, function(err) {
                    // An error occured. Show a message to the user

                    $ionicPopup.alert({
                        title: 'Ooops !',
                        template: err.message
                    });
                });
            };

        $cordovaGeolocation.getCurrentPosition()
            .then(function (position) {

                //TODO: Configure accuracy, timeout ...
                $scope.location.latitude  = position.coords.latitude;
                $scope.location.longitude = position.coords.longitude;

                $scope.isGeolocated = true;
            }, function(err) {
                // error
            });

        $scope.hideBackButton = true;

        $scope.getLatestPost = function() {
         var parse =   parseService.getLatestLegs()
                .done(function(legs){

                    console.log('success',legs);
                    $scope.latest = legs;

                })
                .fail(function(error){
                    console.log('fail',error);
                });
        }

        $scope.getLatestPost();
    });