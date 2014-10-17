angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

    $scope.logout = function(){
        var currentUser = Parse.User.current();

        if(currentUser =! null) {
            Parse.User.logOut();
        }
    };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

      var username = $scope.loginData.username;
      var password = $scope.loginData.password;

      Parse.User.logIn(username, password, {
          success: function(user) {

            $scope.closeLogin();

              $state.transitionTo('app.latest');
          },
          error: function(user, error) {
              // The login failed. Check error to see why.
          }
      });

  };
})

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
    .controller('LatestsCtrl', function($scope){

        function getLatestPost() {
            return [
                {
                    image : "http://images.playfrance.com/news/64941/zoom/0297.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                },
                {
                    image : "http://images.playfrance.com/news/64941/zoom/0297.jpg",
                    avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg"
                }
            ]
        }

        $scope.latest = getLatestPost();
    })
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
