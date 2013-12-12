/**
 * The main application. 
 */
define([
    "gmwars/google/maps/map",
    "gmwars/google/maps/geocoder",
    "gmwars/game/player",
    "gmwars/view/help",
    "gmwars/google/maps/marker"], function(map, geocoder, player, helpWindow, Marker) {

    helpWindow.showHelp("This is the help I want to display");
    player.then(function(p) {
        helpWindow.showHelp("Player name: " + p.getName());
    });
    map.on("click", function(event) {
        var position = event.position,
            lat = position.lat,
            lng = position.lng;

        geocoder.lookup(position).then(function(value) {
            var helpText = "You clicked on (" + lat + ", " + lng + ").";
            helpText += "The address here is: " + value[0].address.formatted;
            helpWindow.showHelp(helpText);
        }, function(error) {
            helpWindow.showHelp("An error occurred: " + error);
        });
    });
});

