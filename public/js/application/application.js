/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map",
    "gmwars/google/maps/marker"], function(map, Marker) {
    setTimeout(function() {
        var marker = new Marker({
            map: map,
            position: {
                lat: 51.498841,
                lng: -0.087767
            },
            name: "sazzer"
        });
        map.zoomTo({
            lat: 51.498841,
            lng: -0.087767
        }, 16);
    }, 1000);
});

