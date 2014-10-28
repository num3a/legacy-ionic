angular.module('legacy.controllers', ['ngCordova'])
    .controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
    .controller('LatestsCtrl', function($scope, $ionicViewService, $cordovaGeolocation, $cordovaCamera,$ionicLoading){
        //TODO: Refactor latest controller
        //TODO: add parse service angular module

        $scope.latitude = 0;
        $scope.longitude = 0;
        $scope.isGeolocated = true;
        $ionicViewService.clearHistory();

        $scope.takePhoto = function() {
            var options = {
                quality : 10,
                destinationType : Camera.DestinationType.DATA_URL,
                sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit : true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
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
                sendImage(imageData);
            }, function(err) {
                // An error occured. Show a message to the user
            });
        };

        $cordovaGeolocation.getCurrentPosition()
            .then(function (position) {
                $scope.latitude  = position.coords.latitude;
                $scope.longitude = position.coords.longitude;

                $scope.isGeolocated = true;
            }, function(err) {
                // error
            });

        function getLatestPost() {
            return [
                {
                    image : "http://images.playfrance.com/news/64941/zoom/0297.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "img/media/simpson.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "img/media/design.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "http://images.playfrance.com/news/64941/zoom/0297.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "img/media/simpson.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "img/media/design.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "http://images.playfrance.com/news/64941/zoom/0297.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "img/media/simpson.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "img/media/design.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                }
            ]
        }

        function sendImage(imageData) {

            $ionicLoading.show({
                template: 'Sending ...'
            });

            var file = new Parse.File("myfile.png",{base64: imageData} );

            file.save().then(function () {
                // The file has been saved to Parse.
                $ionicLoading.hide();
            }, function (error) {
                aler(error);
                // The file either could not be read, or could not be saved to Parse.
            });

        }

        $scope.hideBackButton = true;
        $scope.latest = getLatestPost();
    })
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
