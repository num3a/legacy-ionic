/**
 * Created by emmanuelernest on 20/10/14.
 */
/**
 * Created by emmanuelernest on 20/10/14.
 */

// http://learn.ionicframework.com/formulas/localstorage/

angular.module('legacy.utils.parse', [])

    .factory('$parseService', ['', function() {
        //TODO: Initialize parse
        var factory = {};

       factory.logIn = function(){

        };

        factory.logOut = function(){

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
    }]);