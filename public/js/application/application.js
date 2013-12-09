/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map",
    "gmwars/google/maps/region",
    "gmwars/google/maps/marker"], function(map, Region, Marker) {
    setTimeout(function() {
        var marker = new Marker({
            map: map,
            position: {
                lat: 51.498841,
                lng: -0.087767
            },
            name: "sazzer"
        });
        var region = new Region({
            map: map,
            position: {
                lat: 51.498841,
                lng: -0.087767
            },
            radius: 500
        });
        map.zoomTo({
            lat: 51.498841,
            lng: -0.087767
        }, 16);
    }, 1000);
});

