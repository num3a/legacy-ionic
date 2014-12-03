/**
 * Created by emmanuelernest on 20/10/14.
 */
/**
 * Created by emmanuelernest on 20/10/14.
 */
//TODO: Split into accountService (login, register, edit profile ...) and dataService (post and retrieve legs)
angular.module('services.foursquare', [])

    .factory('foursquareService', function($http, $q) {

       /* https://api.foursquare.com/v2/venues/search
            ?client_id=CLIENT_ID
            &client_secret=CLIENT_SECRET
            &v=20130815
            &ll=40.7,-74
            &query=sushi*/

        var venueUrl = 'https://api.foursquare.com/v2/venues/search';
       // venueUrl = 'https://api.foursquare.com/v2/venues/search?client_id=XLYSQ43EJU5TSG425JQ1IRTM1EYYXUE3B0DK1XUQJKLCKZFD&client_secret=WA0DT2IQ1ILZ0PNBNFWZDCQ5EN1LPNSWUKGF1RPI2JMUIJXP&v=20141101&ll=49.053473,2.017467';
        // client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=20130815&ll=40.7,-74&query=sushi

        var venueData = {
            'client_id' : 'XLYSQ43EJU5TSG425JQ1IRTM1EYYXUE3B0DK1XUQJKLCKZFD',
            'client_secret' : 'WA0DT2IQ1ILZ0PNBNFWZDCQ5EN1LPNSWUKGF1RPI2JMUIJXP',
             'v' : '20141101',
            'll' : '49.053473,2.017467'
            // query : 'sushi'
        };

        var factory = {};

        factory.getVenues = function(location){

           // venueData.ll = location.latitude + ','+ location.longitude;

         return   $http.get(venueUrl, {
             'client_id' : 'XLYSQ43EJU5TSG425JQ1IRTM1EYYXUE3B0DK1XUQJKLCKZFD',
             'client_secret' : 'WA0DT2IQ1ILZ0PNBNFWZDCQ5EN1LPNSWUKGF1RPI2JMUIJXP',
             'v' : '20141101',
             'll' : '49.053473,2.017467'
             // query : 'sushi'
         }).
                success(function(data, status, headers, config) {
                    console.log('foursquare: success');

                    return data;
                 //   deferred.resolve();
                }).
                error(function(data, status, headers, config) {
               //     deferred.reject();
                    console.log('an error occurs when retrieving foursquare venues')
                });
        };

        return factory;
    });