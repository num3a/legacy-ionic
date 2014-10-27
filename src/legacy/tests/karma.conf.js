// Karma configuration
// Generated on Mon Oct 20 2014 23:40:47 GMT+0200 (CEST)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'jasmine',
            'requirejs'
        ],



         // list of files / patterns to load in the browser
        files: [
            //'../node_modules/requirejs/require.js',
            //'../node_modules/karma-requirejs/adapter.js',

          //  '../node_modules/karma-jasmine/lib/jasmine.js',
            //'../node_modules/karma-jasmine/lib/adapter.js',

            'test-main.js',
            {pattern: '../www/lib/angular/angular.js', included: true},
            {pattern: '../www/lib/angular-animate/angular-animate.js', included: true},
            {pattern: '../www/lib/angular-ui-router/release/angular-ui-router.js', included: true},
            {pattern: '../www/lib/angular-sanitize/angular-sanitize.js', included: true},

            {pattern: '../www/lib/ionic/js/ionic.js', included: true},
            {pattern: '../www/lib/ionic/js/ionic-angular.js', included: true},

            {pattern: 'angular/angular-mocks.js', included: true},

            {pattern: '../www/js/**.js', included: true},
            {pattern: '../www/js/**/*.js', included: true},
            {pattern: '../www/js/**/**/*.js', included: true},


            {pattern: '../www/components/**.js', included: true},
            {pattern: '../www/components/**/*.js', included: true},
            {pattern: '../www/components/**/**/*.js', included: true},

            {pattern: '../tests/unit/*.js', included: true},
            {pattern: '../tests/unit/**/*.js', included: true},
            {pattern: '../tests/unit/**/**/*.js', included: true},

            {pattern: '../www/shared/utils/*.js', included: true},


            {pattern: 'angular/angular-resource.js', included: true},

            {pattern: '../www/lib/parse/parse.js', included: true},

            {pattern: '../www/lib/ngCordova/dist/ng-cordova.js', included: true},
            {pattern: '../www/lib/ngCordova/dist/ng-cordova-mocks.js', included: true}

        ],


        // list of files to exclude
        exclude: [
            // 'test-main.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        '../www/components/*.js': ['coverage'],
        '../www/components/**/*.js': ['coverage']
            //'../js/*.js': ['coverage']
    },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress','coverage'],


        // web server port
        port: 9876,

        runnerPort : 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        captureTimeout: 60000,


        //  plugins: ['karma-coverage'],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [

             //'Chrome'
            ,'PhantomJS'
        ],

        // optionally, configure the reporter
         coverageReporter: {
          type : 'html',
          dir : 'coverage/'
      },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
