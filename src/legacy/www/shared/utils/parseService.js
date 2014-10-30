/**
 * Created by emmanuelernest on 20/10/14.
 */
/**
 * Created by emmanuelernest on 20/10/14.
 */

angular.module('utils.parse', [])

    .factory('parseService', function($ionicLoading,$state,$ionicPopup) {
        //TODO: Initialize parse
        var factory = {};

        function logIn(username, password) {
            console.log('Doing login', {username: username});

            $ionicLoading.show({
                template: 'Logging in...'
            });
            Parse.User.logIn(username, password, {
                success: function (user) {

                    $ionicLoading.hide();
                    $state.transitionTo('app.latest');
                },
                error: function (user, error) {
                    // The login failed. Check error to see why.

                    var errorMessage = '';
                    switch (error.code) {
                        case 100:
                            errorMessage = 'Legacy is unreachable. <br />Please check your network settings!';
                            break;

                        case 101:
                            errorMessage = 'Wrong login/password. <br />Please check your credentials!';
                            break;
                        default :
                            errorMessage = error.message;
                            break;
                    }

                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: 'Ooops !',
                        template: errorMessage
                    });
                }
            });
        }

        factory.logIn = function(username,password){
            logIn(username, password);
        };

        factory.logOut = function(){
            var currentUser = Parse.User.current();

            if(currentUser =! null) {
                Parse.User.logOut();
            }
        };

        factory.signUp = function(username, password, email){

                var user = new Parse.User();
                user.set("username", username);
                user.set("password", password);
                user.set("email", email);

                user.signUp(null, {
                    success: function(user) {
                        $ionicLoading.hide();

                        logIn(username,password);
                    },
                    error: function(user, error) {
                        // Show the error message somewhere and let the user try again.
                        $ionicLoading.hide();

                        var errorMessage = '';
                        switch(error.code)
                        {
                            case -1:
                                errorMessage = "Please fill all fields."
                                break;
                            case 202:
                                errorMessage= "User " + username + " already exist."
                                break;
                            case 203:
                                errorMessage= "Email " + email + " already exist."
                                break;

                            default :
                                errorMessage = "Error: " + error.code + " " + error.message;
                                break;
                        }

                        $ionicPopup.alert({
                            title: 'Ooops !',
                            template: errorMessage
                        });
                    }
                });

        };

        factory.saveFile = function(fileName, data, type){

        };

        factory.postLeg = function(){
            //TODO: WIP send Leg
            var Leg = new Parse.Object.extend('Leg');

            var imageData = 'mock image data';
            var file = new Parse.File("avatar.png",{base64: imageData} );

            var point = new Parse.GeoPoint({latitude: 40.0, longitude: -30.0});

            var leg = new Leg();

            leg.set("location", point);
            leg.set("image", file);
            leg.set("text", 'zbraaa');

            leg.save().then(function(model,error){},function(model,error){});
        };

        return factory;
    });