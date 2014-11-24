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

        function getDistanceBetweenPoints(lat1,lon1,lat2,lon2) {

            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1);
            var a =
                    Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                    Math.sin(dLon/2) * Math.sin(dLon/2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km

            var result = (d == 0) ? 0 : d.toFixed(1);
            return result;
        }

        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
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

           return leg.save();

        };

        factory.getLatestLegs = function (currentLocation, kmDistance){

            if(kmDistance == null)
            {
                kmDistance = 5;
            }

            var legQuery = new Parse.Query('Leg');

            var geoPosition = new Parse.GeoPoint(currentLocation.latitude,currentLocation.longitude);

            legQuery.include(['owner']);
            legQuery.descending('createdAt');
            legQuery.withinKilometers('location',geoPosition,kmDistance);
            legQuery.limit(50);

            return    legQuery.find(null)
                .done(function(results) {
                    console.log("Successfully retrieved " + results.length + " legs.", results);

                    var returnValue = [];
                    // Do something with the returned Parse.Object values
                    for (var i = 0; i < results.length; i++) {
                        var object = results[i];

                        var legPosition = object.get('location').toJSON();
                        var text = object.get('text');
                        var image = object.get('image');
                        var owner = object.get('owner').toJSON();

                        var imageUrl = "";
                        if(image != null){
                            imageUrl = image.url();
                        }

                        var username = owner.username;
                        var distanceInKm = getDistanceBetweenPoints(
                            currentLocation.latitude,currentLocation.longitude,
                            legPosition.latitude,legPosition.longitude);

                        var leg =
                        {
                            avatar : "http://marvelll.fr/wp-content/uploads/2014/04/Photo-dAvatar-2.jpg",
                            textDescription: text,
                            image: imageUrl,
                            location: {
                                longitude: legPosition.longitude,
                                latitude: legPosition.latitude
                            },
                            username:username,
                            distance: distanceInKm
                        };
                        returnValue.push(leg);
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