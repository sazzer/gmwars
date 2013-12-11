/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map",
    "gmwars/google/maps/region",
    "gmwars/google/maps/marker"], function(map, Region, Marker) {

    map.showHelp("This is the help I want to display");
    map.on("click", function(event) {
        var position = event.position,
            lat = position.lat,
            lng = position.lng;

        map.showHelp("You clicked on (" + lat + ", " + lng + ")");
    });
});

