/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map"], function(map) {
    setTimeout(function() {
        map.zoomTo({
            lat: 51.498841,
            lng: -0.087767
        }, 16);
    }, 1000);
});

