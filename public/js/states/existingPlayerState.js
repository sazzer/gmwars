/**
 * State that is active when the player has played before
 */
define([
    "dojo/_base/declare",
    "dojo/i18n",
    "gmwars/google/maps/map",
    "gmwars/google/maps/marker",
    "gmwars/game/player",
    "dojo/i18n!./nls/newPlayerState"
    ], function(declare, i18n, map, Marker, player) {
    return declare("GMWars.states.ExistingPlayerState", null, {
        /**
         * Construct the state
         */
        constructor: function() {
            this.strings = i18n.getLocalization("gmwars.states", "newPlayerState", "");

            player.then(function(player) {
                // Zoom to the first HQ
                var HQs = player.getBuildingsOfType("HQ");
                if (HQs.length > 0) {
                    var HQ = HQs[0];
                    map.goTo(HQ, 18);
                }

                // Place markers for all buildings
                var allBuildings = player.getBuildings();
                for (var i = 0; i < allBuildings.length; ++i) {
                    new Marker({
                        map: map,
                        position: allBuildings[i],
                        name: allBuildings[i].name
                    });
                }
            });
        },

        /**
         * Handle when the user has clicked on the map somewhere
         */
        onClickMap: function(position) {
        }
    });
});

