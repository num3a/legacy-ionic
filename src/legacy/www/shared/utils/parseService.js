/**
 * Created by emmanuelernest on 20/10/14.
 */
/**
 * Created by emmanuelernest on 20/10/14.
 */
//TODO: Split into accountService (login, register, edit profile ...) and dataService (post and retrieve legs)
angular.module('utils.parse', [])

    .factory('parseService', function() {

        Parse.initialize('AeZx3H0Al4rbVh5OoMDy48K1I1Lq0dYM1PdgHJgA','gwk1pkiaMStmHZsEWzIkxKtlmw1lTFjNLqt2Nj2O');

        var factory = {};

        function logIn(username, password) {

         return Parse.User.logIn(username, password)
                .done(function(user){
                    console.log('ParseService: Login successful.', user);
                })
                .fail(function(user,error){
                    console.log('ParseService: Log in failed', user, error);
                });
        }

        factory.logIn = function(username,password){
            return logIn(username, password);
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

           return user.signUp(null)
                .done(function(user){
                    console.log('ParseService: sign up with success.', user);

                })
                .fail(function(user, error){
                    console.log('ParseService: failed to sign up with: ', user, error);
                });
        };

        factory.postLeg = function(text, imageData, location){

            var leg = new Parse.Object('Leg');

            var point = new Parse.GeoPoint({latitude: location.latitude, longitude: location.longitude});

            var currentUser = Parse.User.current();

            leg.set("location", point);
            leg.set("text", text);
            leg.set('owner',currentUser);

            if(imageData != null){
                var file = new Parse.File("image.png",{base64: imageData} );
                leg.set("Image", file);
            }

           return leg.save()
               .done(function(model){
                   console.log('ParseService: Leg posted', model);
               })
               .fail(function(model,error){
                   console.log('ParseService: an error occured:', error);

               });
        };

        factory.getLatestLegs = function(location, kmDistance){

            if(kmDistance == null)
            {
                kmDistance = 5;
            }

            var query = new Parse.Query('Leg');
            var geoPosition = new Parse.GeoPoint(location.latitude,location.longitude);

            query.descending('createdAt');
            query.withinKilometers('location',geoPosition,kmDistance);
            query.limit(30);

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

                        var leg =
                        {
                            avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg",
                            text: text,
                            image: image.url(),
                            location: {
                                longitude: geoPoint.longitude,
                                latitude: geoPoint.latitude
                            }
                        };
                        returnValue.push(leg);

                      //  console.log('ParseService: Add object to returnValue',leg);
                    }

                    return  returnValue;
                })
                .fail(function(error) {
                    console.log("ParseService: Error: " + error.code + " " + error.message);
                    return null;
                });
        };

        return factory;
    });