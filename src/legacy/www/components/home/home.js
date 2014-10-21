'use strict';

angular.module('Application', ['ngResource']).
    factory('UserFactory', function($resource){
    return $resource('Users/users.json')
})
    .controller('MainCtrl', function($scope, UserFactory) {
    $scope.text = 'Hello World!';
    $scope.users = [{
        name: 'yea',
        id: 2
    }];
});