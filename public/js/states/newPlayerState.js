/**
 * State that is active when the player is brand new and hasn't done anything yet
 */
define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/i18n",
    "gmwars/game/player",
    "gmwars/view/help",
    "gmwars/google/maps/geocoder",
    "dojo/i18n!./nls/newPlayerState"
    ], function(declare, array, i18n, player, helpWindow, geocoder) {
    return declare("GMWars.states.NewPlayerState", null, {
        /**
         * Construct the state
         */
        constructor: function() {
            this.strings = i18n.getLocalization("gmwars.states", "newPlayerState", "");
            helpWindow.showHelp(this.strings.welcome);
        },

        /**
         * Handle when the user has clicked on the map somewhere
         */
        onClickMap: function(position) {
            var lat = position.lat,
                lng = position.lng;

            geocoder.lookup(position).then(function(value) {
                var buildingAddresses = array.filter(value, function(v) {
                    return v.position.type == "ROOFTOP";
                });
                if (buildingAddresses.length > 0) {
                    var helpText = "You clicked on (" + lat + ", " + lng + ").";
                    helpText += "The address here is: " + value[0].address.formatted;
                    helpWindow.showHelp(helpText);
                } else {
                    alert("That's not a building");
                }
            
            }, function(error) {
                helpWindow.showHelp("An error occurred: " + error);
            });
        }
    });
});
