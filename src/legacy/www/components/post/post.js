angular.module('post', ['ionic', 'utils.parse'])
    .controller('PostCtrl',function($scope, $ionicPopup, $timeout, parseService) {
        $scope.legTypes = [
            { id: 1, name: 'Text' },
            { id: 2, name: 'Photo' },
            { id: 3, name: 'Link' },
            { id: 4, name: 'Sound' }
        ];

        $scope.selectedType = {};

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

             //TODO: add logs everywhere in the application
             $cordovaCamera.getPicture(options).then(function(imageData) {
             var text = '';
             parseService.postLeg(text,imageData, $scope.location)
             .done();

                 $state.go('app.post');

             }, function(err) {
             // An error occured. Show a message to the user

             $ionicPopup.alert({
             title: 'Ooops !',
             template: err.message
             });
             });
        };

    });
