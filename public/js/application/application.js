/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map",
    "gmwars/google/maps/geocoder",
    "gmwars/google/maps/marker"], function(map, geocoder, Marker) {

    map.showHelp("This is the help I want to display");
    map.on("click", function(event) {
        var position = event.position,
            lat = position.lat,
            lng = position.lng;

        geocoder.lookup(position).then(function(value) {
            var helpText = "You clicked on (" + lat + ", " + lng + ").";
            helpText += "The address here is: " + value[0].address.formatted;
            map.showHelp(helpText);
        }, function(error) {
            map.showHelp("An error occurred: " + error);
        });
    });
});

