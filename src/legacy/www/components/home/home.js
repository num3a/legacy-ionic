'use strict';

angular.module('appli', ['ngResource']).
    factory('UserFactory', function($resource){
        return $resource('Users/users.json')
    })
    .controller('MainCtrl', function($scope, UserFactory) {
        $scope.text = 'Hello World!';
        $scope.users = [{
            name: 'yea',
            id: 2
        },
            {
                name: 'lool',
                id:4
            }];
    });