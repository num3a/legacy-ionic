/**
 * Created by emmanuelernest on 20/10/14.
 */
/**
 * Created by emmanuelernest on 20/10/14.
 */

angular.module('utils.parse', [])

    .factory('parseService', function($ionicLoading,$state,$ionicPopup) {

        Parse.initialize('AeZx3H0Al4rbVh5OoMDy48K1I1Lq0dYM1PdgHJgA','gwk1pkiaMStmHZsEWzIkxKtlmw1lTFjNLqt2Nj2O');

        //TODO : return Parse.Promise to avoid ionic manipulations (popup, state, loading ...)
        var factory = {};

        function logIn(username, password) {
            console.log('Doing login', {username: username});

            $ionicLoading.show({
                template: 'Logging in...'
            });
            Parse.User.logIn(username, password, {
                success: function (user) {

                    $ionicLoading.hide();
                    $state.transitionTo('app.home');
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

        factory.postLeg = function(text, imageData, location){
            //TODO: WIP send Leg

            var leg = new Parse.Object('Leg');

            var point = new Parse.GeoPoint({latitude: location.latitude, longitude: location.longitude});

            //var leg = new Leg();

            leg.set("location", point);
            leg.set("Text", text);

            if(imageData != null){
                var file = new Parse.File("image.png",{base64: imageData} );
                leg.set("Image", file);
            }

            leg.save().then(function(model,error){
                console.log('leg posted', model);
            },function(model,error){
                console.log('an error occured:',error);
            });
        };

        factory.getLatestLegs = function(){

            var query = new Parse.Query('Leg');

            //TODO: tune query for retrieving near legs
            query.descending('createdAt');

        return    query.find(null)
                .done(function(results) {
                    console.log("Successfully retrieved " + results.length + " legs.", results);

                    var returnValue = [];
                    // Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];

                        var geoPoint = object.get('location').toJSON();
                        var text = object.get('Text');
                        var image = object.get('Image');

                        returnValue.push({
                            avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg",
                            text: text,
                            image: image.url(),
                            location: {
                                longitude: geoPoint.longitude,
                                latitude: geoPoint.latitude
                            }
                        });
                    }

                  return  returnValue;
                })
                .fail(function(error) {
                    console.log("Error: " + error.code + " " + error.message);
                    return null;
                });
        };

        return factory;
    });