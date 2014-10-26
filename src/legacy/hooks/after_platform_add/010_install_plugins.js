#!/usr/bin/env node

//this hook installs all your plugins

// add your plugins to this list--either the identifier, the filesystem location or the URL
var pluginlist = [
    "org.apache.cordova.device",
    "org.apache.cordova.keyboard",
    "org.apache.cordova.camera",
    "org.apache.cordova.console",
    "org.apache.cordova.device",
    "org.apache.cordova.file",
    "org.apache.cordova.geolocation",
    "org.apache.cordova.splashscreen"
    //"https://github.com/chrisekelley/AppPreferences/"
];

// no need to configure below

var fs = require('fs');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout)
}

pluginlist.forEach(function(plug) {
    exec("ionic plugin add " + plug, puts);
});
