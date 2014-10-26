angular.module('legacy.controllers', [])
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
    .controller('LatestsCtrl', function($scope, $ionicViewService){

        $ionicViewService.clearHistory();


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

        $scope.hideBackButton = true;
        $scope.latest = getLatestPost();
    })
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
