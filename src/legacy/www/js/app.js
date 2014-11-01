// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('legacyApp', ['ionic', 'introduction','home','sideMenu','registration','login','utils.parse'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        Parse.initialize('AeZx3H0Al4rbVh5OoMDy48K1I1Lq0dYM1PdgHJgA','gwk1pkiaMStmHZsEWzIkxKtlmw1lTFjNLqt2Nj2O');

      });
    })

    .config(function($stateProvider, $urlRouterProvider ) {

      $stateProvider

          .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "components/sideMenu/leftMenu.html",
            controller: 'LeftMenuCtrl'
          })
          .state('app.home', {
              url: "/home",
              views: {
                  'menuContent' :{
                      templateUrl: "components/home/home.html",
                      controller: 'HomeCtrl'
                  }
              }
          }) .state('app.register', {
            url: "/register",
            views: {
              'menuContent' :{
                templateUrl: "components/register/register.html",
                controller: 'RegisterCtrl'
              }
            }
          })
          .state('app.login', {
            url: "/login",
            views: {
              'menuContent' :{
                templateUrl: "components/login/login.html",
                controller: 'LoginCtrl'
              }
            }
          })
        /*  .state('app.single', {
            url: "/playlists/:playlistId",
            views: {
              'menuContent' :{
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
              }
            }
          })*/

          .state('app.introduction',{
            url: "/intro",
            views: {
              'menuContent' :{
                templateUrl: "components/introduction/intro.html",
                controller: 'IntroCtrl'
              }
            }
          });


      // if none of the above states are matched, use this as the fallback

     /*   var isFirstLaunch = $localStorage.get('isFirstLaunch', true);

        if(isFirstLaunch){
            $localStorage.set('isFirstLaunch', false );
            $urlRouterProvider.otherwise('/app/intro');
        }
        else
        {*/
            $urlRouterProvider.otherwise('/app/intro');

    });

